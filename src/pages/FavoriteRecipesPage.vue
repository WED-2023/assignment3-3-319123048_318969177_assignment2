<template>
  <div class="container mt-4">
    <h2 class="mb-4">My Favorite Recipes</h2>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p v-else-if="favorites.length === 0">You have no favorite recipes yet.</p>
    
    <div class="row">
      <div class="col-md-4 mb-4" v-for="recipe in favorites" :key="recipe.id">
        <RecipePreview :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import store from '../store.js';
import RecipePreview from '../components/RecipePreview.vue';

const favorites = ref([]);
const error = ref("");

onMounted(async () => {
  try {
    const response = await axios.get(`${store.server_domain}/api/users/my_favorites`, {
      withCredentials: true
    });
    favorites.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load favorites.";
  }
});
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>
