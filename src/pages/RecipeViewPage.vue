<template>
  <div class="container py-4">
    <div v-if="recipe">
      <!-- הודעת שגיאה במקרה שאין הוראות -->
      <div v-if="recipe._instructions.length === 0" class="alert alert-warning text-center mb-5">
        <h4 class="text-danger">This recipe has no instructions 😢</h4>
        <p class="mb-3">Would you like to see something similar?</p>
        <button class="btn btn-outline-primary mb-4" @click="fetchSimilarRecipes">
          🔍 Show similar recipes
        </button>
        <!-- מתכונים דומים -->
        <div v-if="similarRecipes.length" class="row justify-content-center">
          <div v-for="r in recipes" :key="r.id">
            <RecipePreview class="similarRecipes" :recipe="r" />
          </div>
        </div>
      </div>
      <!-- תצוגת מתכון רגילה -->
      <div v-else>
        <div class="text-center mb-4">
          <h1>{{ recipe.title }}</h1>
          <img
            :src="currentImage"
            @error="onImageError"
            class="img-fluid rounded shadow-sm"
            style="max-height: 400px; object-fit: cover;"
          />
          <div class="mt-2 text-muted">
            ⏱ {{ recipe.readyInMinutes }} minutes • 👍 {{ recipe.popularity }} likes
          </div>
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
import defaultImage from "@/assets/cooking.jpeg";
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

      if (response.status !== 200 || !response.data) {
        this.$router.replace("/NotFound");
        return;
      }

      const data = response.data;
      const _instructions = (data.instructions?.[0] || []).map((step, index) => ({
        number: index + 1,
        step: step,
      }));

      this.recipe = {
        title: data.title,
        image: data.image,
        readyInMinutes: data.readyInMinutes,
        popularity: data.popularity,
        ingredients: data.ingredients || [],
        _instructions,
      };

      this.currentImage = data.image || defaultImage;

      // אם אין הוראות – נטען מתכונים דומים אוטומטית
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
        const mainIngredient =
          this.recipe.ingredients?.[0]?.name || "recipe";
        const params = {
          query: mainIngredient,
        };
        const res = await this.axios.get(`${this.store.server_domain}/api/recipes`, {
          params,
          withCredentials: true,
        });

        this.similarRecipes = res.data.results || [];
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
</style>
