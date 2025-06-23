<template>
  <div class="card h-100 shadow-sm">
    <img
      :src="recipe.image"
      @error="handleImageError"
      class="card-img-top"
      :alt="recipe.title"
      style="object-fit: cover; height: 200px;"
    />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-2">{{ recipe.title }}</h5>

      <!-- Metadata -->
      <div class="mb-2 text-muted small">
        <p class="mb-1">⏱️ {{ recipe.readyInMinutes }} mins</p>
        <p class="mb-0">🧍 Servings: {{ recipe.servings }}</p>
      </div>

      <!-- Tags -->
      <div class="mb-3">
        <span v-if="recipe.vegan" class="badge bg-success me-1">Vegan</span>
        <span v-if="recipe.vegetarian" class="badge bg-info text-dark me-1">Vegetarian</span>
        <span v-if="recipe.glutenFree" class="badge bg-warning text-dark">Gluten Free</span>
      </div>

      <!-- Action -->
      <router-link
        class="btn btn-outline-primary mt-auto fw-semibold"
        :to="`/recipe/${recipe.id}`"
      >
        View Recipe
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object,
});

function handleImageError(event) {
  event.target.src = require('@/assets/default_food.jpg');
}
</script>
