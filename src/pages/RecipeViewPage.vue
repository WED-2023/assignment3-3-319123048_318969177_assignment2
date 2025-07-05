<template>
  <div class="recipe-page-wrapper position-relative py-5" :style="backgroundStyle">
    <div class="overlay position-absolute w-100 h-100"></div>

    <div class="container position-relative z-1">
      <div v-if="recipe">
        <div v-if="recipe._instructions.length === 0" class="alert alert-warning text-center mb-5">
          <h4 class="text-danger">In spoonacular the instructions are empty so</h4>
          <h4 class="text-danger">This recipe has no instructions 😢</h4>
          <p class="mb-3">Would you like to see something similar?</p>
          <router-link to="/" class="btn btn-outline-primary mb-4">
            🏠 Go back to home
          </router-link>
          <div v-if="similarRecipes.length" class="row justify-content-center">
            <div v-for="r in recipes" :key="r.id">
              <RecipePreview class="similarRecipes" :recipe="r" />
            </div>
          </div>
        </div>

        <div v-else>
          <h1 class="text-center mb-5 pastel-title">{{ recipe.title }}</h1>
          <div class="row align-items-start">
            <div class="col-md-5 text-center mb-4">
              <img
                :src="currentImage"
                class="img-fluid rounded shadow mb-4"
                alt="Recipe Image"
                @error="onImageError"
              />
              <p class="text-muted">
                ⏱ {{ recipe.readyInMinutes }} minutes • 👍 {{ recipe.popularity }} likes
              </p>
              <p class="text-muted">
                🧑‍🍳 Servings: {{ recipe.servings }}
              </p>
              <div class="dietary-icons mb-3">
                <span v-if="recipe.vegetarian" title="Vegetarian">🥬 Vegetarian</span>
                <span v-if="recipe.vegan" title="Vegan" class="ms-3">🌱 Vegan</span>
                <span v-if="recipe.glutenFree" title="Gluten Free" class="ms-3">🚫🌾 Gluten Free</span>
              </div>
            </div>

            <div class="col-md-7">
              <h4>🧾 Ingredients</h4>
              <ul class="list-group mb-4">
                <li
                  v-for="(r, index) in recipe.ingredients"
                  :key="index"
                  class="list-group-item"
                >
                  {{ r.amount }} {{ r.unit }} {{ r.name }}
                </li>
              </ul>

              <h4>📋 Instructions</h4>
              <ol class="list-group list-group-numbered">
                <li
                  v-for="s in recipe._instructions"
                  :key="s.number"
                  class="list-group-item"
                >
                  {{ s.step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import defaultImage from "@/assets/cooking.jpg";
import RecipePreview from "@/components/RecipePreview.vue";

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipe: null,
      currentImage: null,
      similarRecipes: [],
    };
  },
  computed: {
    backgroundStyle() {
      if (this.recipe && this.recipe.image) {
        return {
          backgroundImage: `url('${this.recipe.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      }
      return {};
    }
  },
    async created() {
      try {
        const response = await this.axios.get(
          this.store.server_domain + "/api/recipes/" + this.$route.params.recipeid
        );
        if (response.status !== 200 || !response.data) {
          this.$router.replace("/NotFound");
          return;
        }

        const data = response.data;

        let _instructions = [];

        if (data.id && typeof data.id === "string" && data.id.endsWith("ID")) {
          console.log("recipe from local database");
          try {
            const parsed = typeof data.instructions === "string"
              ? JSON.parse(data.instructions)
              : data.instructions;
            console.log("Parsed instructions:", parsed);

            if (Array.isArray(parsed)) {
              // flatten if it's array of arrays
              const flatSteps = Array.isArray(parsed[0]) ? parsed[0] : parsed;

              _instructions = flatSteps.map((step, index) => ({
                number: index + 1,
                step: step,
              }));
            } else {
              _instructions = [];
            }
          } catch (e) {
            _instructions = [];
          }
        } else {
          // Recipe from spoonacular API
          _instructions = (data.instructions || []).map((step, index) => ({
            number: index + 1,
            step: step,
          }));
        }

        this.recipe = {
          title: data.title,
          image: data.image,
          readyInMinutes: data.readyInMinutes,
          popularity: data.popularity,
          servings: data.servings,
          vegetarian: data.vegetarian,
          vegan: data.vegan,
          glutenFree: data.glutenFree,
          ingredients: data.ingredients || [],
          _instructions,
        };

        this.currentImage = data.image || defaultImage;

        if (_instructions.length === 0) {
          this.fetchSimilarRecipes();
        }
      } catch (error) {
        console.error("Error loading recipe:", error);
        this.$router.replace("/NotFound");
    }
    },
  methods: {
    onImageError() {
      this.currentImage = defaultImage;
    },
    async fetchSimilarRecipes() {
      try {
        const res = await this.axios.get(
          `${this.store.server_domain}/api/recipes/${this.recipe.id}/similar`,
          { withCredentials: true }
        );
        this.similarRecipes = res.data || [];
      } catch (err) {
        console.error("Failed to fetch similar recipes", err);
      }
    },
  },
};
</script>

<style scoped>
.recipe-page-wrapper {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

img.img-fluid {
  max-height: 350px;
  object-fit: cover;
  border-radius: 12px;
}

.dietary-icons span {
  font-weight: 500;
  font-size: 1rem;
}

.pastel-title {
  color: #aa7b9b;
  font-weight: bold;
}

</style>
