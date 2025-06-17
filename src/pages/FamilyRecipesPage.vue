<template>
  <div class="container mt-4">
    <h2 class="mb-4">My Family Recipes</h2>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p v-else-if="recipes.length === 0">You have no family recipes saved.</p>

    <div class="row">
      <div class="col-md-6 mb-4" v-for="recipe in recipes" :key="recipe.id">
        <div class="card h-100 shadow-sm">
          <img :src="recipe.image || defaultImage" class="card-img-top" :alt="recipe.title" />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text"><strong>From:</strong> {{ recipe.familyMember || 'Family' }}</p>
            <p class="card-text"><strong>Occasion:</strong> {{ recipe.occasion || '—' }}</p>
            <p class="card-text"><strong>Servings:</strong> {{ recipe.servings }}</p>
            <p class="card-text"><strong>Ingredients:</strong></p>
            <ul>
              <li v-for="ing in recipe.ingredients" :key="ing.name">
                {{ ing.amount }} {{ ing.unit }} {{ ing.name }}
              </li>
            </ul>
            <p class="card-text"><strong>Instructions:</strong></p>
            <ol>
              <li v-for="(step, i) in recipe.instructions" :key="i">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import store from '../store';

const recipes = ref([]);
const error = ref("");

onMounted(async () => {
  try {
    const res = await axios.get(`${store.server_domain}/api/users/my_family`, {
      withCredentials: true,
    });
    recipes.value = res.data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load family recipes.";
  }
});
</script>

<style scoped>
.card-img-top {
  height: 250px;
  object-fit: cover;
}
</style>