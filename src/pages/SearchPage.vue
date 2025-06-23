<template>
  <b-container class="mt-5">
    <!-- Search Form -->
    <b-card class="p-4 shadow-sm mb-5">
      <h3 class="fw-bold mb-4 text-center">Search Recipes</h3>
      <form @submit.prevent="searchRecipes">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Search Term</label>
            <input
              v-model="query"
              type="text"
              class="form-control"
              placeholder="e.g., pasta, soup..."
            />
          </div>

          <div class="col-md-3">
            <label class="form-label">Cuisine</label>
            <input
              v-model="cuisine"
              type="text"
              class="form-control"
              placeholder="e.g., Italian"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label">Diet</label>
            <select v-model="diet" class="form-select">
              <option value="">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten free">Gluten Free</option>
            </select>
          </div>
        </div>

        <div class="d-grid mt-4">
          <button type="submit" class="btn btn-outline-primary fw-semibold">
            🔍 Search
          </button>
        </div>
      </form>
    </b-card>

    <!-- Search Results -->
    <div v-if="recipes.length > 0">
      <h4 class="mb-4 fw-semibold">Search Results:</h4>
      <b-row>
        <b-col
          v-for="recipe in recipes"
          :key="recipe.id"
          cols="12"
          md="6"
          lg="4"
          class="mb-4"
        >
          <div class="card h-100 shadow-sm">
            <img
              :src="recipe.image"
              class="card-img-top"
              :alt="recipe.title"
              @error="handleImageError($event)"
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
    </div>

    <!-- No Results Message -->
    <div v-else-if="searched" class="text-center text-muted mt-4">
      <p>No recipes found. Try a different search term.</p>
    </div>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import store from '@/store';

const query = ref('');
const cuisine = ref('');
const diet = ref('');
const recipes = ref([]);
const searched = ref(false);

async function searchRecipes() {
  searched.value = true;

  try {
    const res = await axios.get(`${store.server_domain}/api/recipes/search`, {
      params: {
        query: query.value,
        cuisine: cuisine.value,
        diet: diet.value,
      },
    });

    recipes.value = res.data || [];
  } catch (err) {
    console.error('Search error:', err);
    recipes.value = [];
  }
}

function handleImageError(event) {
  event.target.src = require('@/assets/default_food.jpg');
}
</script>
