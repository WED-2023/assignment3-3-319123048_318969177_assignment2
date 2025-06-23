<template>
  <b-container class="mt-5">
    <!-- Welcome Title -->
    <div class="text-center mb-5">
      <h1 class="fw-bold">Welcome to Patch-Yak 🍽️</h1>
      <p class="text-muted">Search, save, and share your favorite recipes with ease</p>
    </div>

    <!-- Last Watched Recipes -->
    <div class="mb-5">
      <h4 class="mb-3 fw-semibold">👀 Recently Viewed</h4>
      <LastWatchedRecipes />
    </div>

    <!-- Family Recipes -->
    <div class="mb-4">
      <h4 class="mb-3 fw-semibold">👵 Our Family Recipes</h4>
      <b-row>
        <b-col
          v-for="recipe in staticFamilyRecipes"
          :key="recipe.title"
          cols="12"
          md="6"
          class="mb-4"
        >
          <div class="card h-100 shadow-sm border-0">
            <img
              :src="recipe.image"
              class="card-img-top"
              :alt="recipe.title"
              @error="handleImageError"
              style="object-fit: cover; height: 200px;"
            />
            <div class="card-body">
              <h5 class="fw-bold">{{ recipe.title }}</h5>
              <p class="mb-1"><strong>👤 By:</strong> {{ recipe.familyMember }}</p>
              <p class="mb-3"><strong>🕯️ Occasion:</strong> {{ recipe.occusion }}</p>

              <h6 class="fw-semibold">🛒 Ingredients</h6>
              <ul class="ps-3">
                <li v-for="(ing, i) in recipe.ingredients" :key="i">
                  {{ ing.amount }} {{ ing.unit }} {{ ing.name }}
                </li>
              </ul>

              <h6 class="fw-semibold mt-3">👨‍🍳 Instructions</h6>
              <ol class="ps-3">
                <li v-for="(step, i) in recipe.instructions" :key="i">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script setup>
import LastWatchedRecipes from '@/components/LastWatchedRecipes.vue';

// Props or data should already be coming from your logic
// This assumes staticFamilyRecipes is already defined in this file
// and not added here manually!

function handleImageError(event) {
  event.target.src = require('@/assets/default_food.jpg');
}
</script>
