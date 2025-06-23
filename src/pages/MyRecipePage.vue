<template>
  <b-container class="mt-5">
    <h3 class="fw-bold mb-4 text-center">👨‍🍳 My Recipes</h3>

    <!-- No Recipes -->
    <div v-if="myRecipes.length === 0" class="text-center text-muted">
      <p>You haven't created any recipes yet.</p>
    </div>

    <!-- Recipes Grid -->
    <b-row v-else>
      <b-col
        v-for="recipe in myRecipes"
        :key="recipe.id"
        cols="12"
        md="6"
        lg="4"
        class="mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="recipe.image"
            @error="handleImageError($event)"
            class="card-img-top"
            :alt="recipe.title"
            style="object-fit: cover; height: 200px;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <router-link
              class="btn btn-outline-secondary w-100"
              :to="`/recipe/${recipe.id}`"
            >
              View Recipe
            </router-link>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import store from '@/store';

const myRecipes = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${store.server_domain}/api/users/my-recipes`);
    myRecipes.value = response.data || [];
  } catch (err) {
    console.error('Failed to fetch user recipes:', err);
  }
});

function handleImageError(event) {
  event.target.src = require('@/assets/default_food.jpg');
}
</script>
