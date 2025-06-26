<template>
  <div class="container py-4">
    <div v-if="recipe">
      <div v-if="recipe._instructions.length === 0" class="alert alert-warning text-center mb-5">
        <h4 class="text-danger">In spoonacular the instructions are empty so</h4>
        <h4 class="text-danger">This recipe has no instructions 😢</h4>
        <p class="mb-3">Would you like to see something similar?</p>
        <button class="btn btn-outline-primary mb-4" @click="fetchSimilarRecipes">
          🔍 Show similar recipes
        </button>
        <div v-if="similarRecipes.length" class="row justify-content-center">
          <div v-for="r in recipes" :key="r.id">
            <RecipePreview class="similarRecipes" :recipe="r" />
          </div>
        </div>
      </div>

      <div v-else>
        <h1 class="text-center mb-4">{{ recipe.title }}</h1>
        <div class="text-center">
          <img
            :src="currentImage"
            class="img-fluid rounded mb-4"
            alt="Recipe Image"
            @error="onImageError"
          />
        </div>
        <div class="text-center mb-4">
          ⏱ {{ recipe.readyInMinutes }} minutes • 👍 {{ recipe.popularity }} likes
        </div>
        <div class="text-center mb-4">
          🧑‍🍳 Servings: {{ recipe.servings }}
        </div>
        <div class="d-flex justify-content-center mb-4 dietary-icons">
          <span v-if="recipe.vegetarian" title="Vegetarian">🥬 Vegetarian</span>
          <span v-if="recipe.vegan" title="Vegan" class="ms-3">🌱 Vegan</span>
          <span v-if="recipe.glutenFree" title="Gluten Free" class="ms-3">🚫🌾 Gluten Free</span>
        </div>

        <div class="row">
          <div class="col-md-6">
            <h4>🧾 Ingredients</h4>
            <ul class="list-group">
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index"
                class="list-group-item"
              >
                {{ r.amount }} {{ r.unit }} {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="col-md-6">
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
</template>


<script>
import defaultImage from "@/assets/cooking.jpg";
import RecipePreview from "@/components/RecipePreview.vue";

export default {
      components:{
    RecipePreview
    },
  data() {

    return {
      recipe: null,
      currentImage: null,
      similarRecipes: [],
    };
  },
  async created() {
    try {
      const response = await this.axios.get(
        this.store.server_domain + "/api/recipes/" + this.$route.params.recipeid
      );
      console.log("Response received:", response);
      if (response.status !== 200 || !response.data) {
        this.$router.replace("/NotFound");
        return;
      }

      const data = response.data;
      const _instructions = (data.instructions || []).map((step, index) => ({
        number: index + 1,
        step: step,
      }));

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
img.img-fluid {
  max-width: 100%;
  border-radius: 12px;
}
.dietary-icons span {
  font-weight: 500;
  font-size: 1rem;
}
</style>
