<template>
  <b-container class="mt-5">
    <!-- Recipe Not Found -->
    <div v-if="!recipe">
      <b-alert variant="danger" show>
        Recipe not found or failed to load.
      </b-alert>
    </div>

    <!-- Recipe View -->
    <div v-else>
      <b-card class="shadow-sm border-0 p-4">
        <!-- Title & Image -->
        <h2 class="fw-bold mb-3 text-center">{{ recipe.title }}</h2>
        <img
          :src="recipe.image"
          @error="handleImageError"
          class="img-fluid rounded mb-4 d-block mx-auto"
          :alt="recipe.title"
          style="max-height: 300px; object-fit: cover;"
        />

        <!-- Tags -->
        <div class="mb-3 text-center">
          <span v-if="recipe.vegan" class="badge bg-success me-1">Vegan</span>
          <span v-if="recipe.vegetarian" class="badge bg-info text-dark me-1">Vegetarian</span>
          <span v-if="recipe.glutenFree" class="badge bg-warning text-dark">Gluten Free</span>
        </div>

        <!-- Metadata -->
        <div class="mb-4 text-center text-muted">
          <p class="mb-1">🧍 Servings: {{ recipe.servings }}</p>
          <p class="mb-0">⏱️ Ready in {{ recipe.readyInMinutes }} minutes</p>
        </div>

        <!-- Ingredients -->
        <div class="mb-4">
          <h5 class="fw-semibold">🛒 Ingredients</h5>
          <ul class="list-group">
            <li
              v-for="(ing, index) in recipe.ingredients"
              :key="index"
              class="list-group-item"
            >
              {{ ing.amount }} {{ ing.unit }} {{ ing.name }}
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div>
          <h5 class="fw-semibold">👨‍🍳 Instructions</h5>
          <ol class="ps-3">
            <li
              v-for="(step, idx) in recipe.instructions"
              :key="idx"
              class="mb-2"
            >
              {{ step }}
            </li>
          </ol>
        </div>
      </b-card>
    </div>
  </b-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import store from '@/store';

const route = useRoute();
const recipe = ref(null);

onMounted(async () => {
  const recipeId = route.params.recipeid;

  try {
    const res = await axios.get(`${store.server_domain}/api/recipes/${recipeId}`);
    recipe.value = res.data;
  } catch (err) {
    console.error('Failed to load recipe:', err);
    recipe.value = null;
  }
});

function handleImageError(event) {
  event.target.src = require('@/assets/default_food.jpg');
}
</script>
