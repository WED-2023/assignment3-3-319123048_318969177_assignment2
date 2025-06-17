<template>
  <div class="container">
    <h3>Last Watched Recipes</h3>

    <div v-if="recipes.length === 0">
      <p>No recently watched recipes yet.</p>
    </div>

    <div class="row" v-else>
      <div class="col" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import store from "../store";

export default {
  name: "LastWatchedRecipes",
  components: {
    RecipePreview,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.loadLastWatchedRecipes();
  },
  methods: {
    async loadLastWatchedRecipes() {
      try {
        const response = await this.axios.get(
          store.server_domain + "/api/users/my-last-watched",
          { withCredentials: true }
        );
        this.recipes = response.data;
      } catch (error) {
        console.error("Error loading last watched recipes:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
