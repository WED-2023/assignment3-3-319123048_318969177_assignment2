<template>
  <div class="container mt-4">
    <h2 class="mb-4">Recipe Details</h2>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <div v-else-if="recipe">
   
      <RecipePreview :recipe="recipe" />

      <div class="mt-4">
        <h4>🍽️ Servings: {{ recipe.servings }}</h4>

        <h4 class="mt-3">🧂 Ingredients:</h4>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>

        <h4 class="mt-3">📝 Instructions:</h4>
        <ol>
          <li v-for="(step, index) in recipe.instructions" :key="index">
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
    <p v-else>Loading recipe...</p>
  </div>
</template>

<script>
import axios from "axios";
import RecipePreview from "@/components/RecipePreview.vue";
import store from "@/store";

export default {
  name: "RecipePage",
  components: { RecipePreview },
  props: ["recipeid"],
  data() {
    return {
      recipe: null,
      error: "",
    };
  },
  async created() {
    try {
      console.log("Fetching recipe with ID:", this.recipeid);
      const response = await axios.get(
        `${store.server_domain}/api/recipes/${this.recipeid}`
      );
      this.recipe = this.transformRecipe(response.data);
    } catch (err) {
      console.error(err);
      this.error = "Failed to load recipe.";
    }
  },
  methods: {
    transformRecipe(data) {
      return {
        id: data.id,
        title: data.title,
        image: data.image,
        readyInMinutes: data.readyInMinutes,
        popularity: data.popularity,
        servings: data.servings,
        ingredients: data.ingredients || [],
        instructions: data.instructions || [],
      };
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>
