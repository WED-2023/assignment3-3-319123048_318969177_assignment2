<template>
  <div class="container mt-4">
    <h2 class="mb-4">My Favorite Recipes</h2>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p v-else-if="recipes.length === 0">You have no favorite recipes yet.</p>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store.js';
import RecipePreview from '../components/RecipePreview.vue';

export default {
  name: "FavoriteRecipes",
  components: {
    RecipePreview,
  },
  data() {
    return {
      recipes: [],
      error: "",
    };
  },
  mounted() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      try {
        const response = await axios.get(`${store.server_domain}/api/users/my_favorites`, {
          withCredentials: true,
        });
        this.recipes = response.data;
      } catch (err) {
        console.error(err);
        this.error = "Failed to load favorites.";
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>
