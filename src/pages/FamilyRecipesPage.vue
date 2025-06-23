<template>
  <b-container class="mt-5">
    <h3 class="fw-bold mb-4 text-center">👵 Family Recipes</h3>

    <div v-if="familyRecipes.length === 0" class="text-center text-muted">
      <p>No family recipes available.</p>
    </div>

    <b-row v-else>
      <b-col
        v-for="recipe in familyRecipes"
        :key="recipe.title"
        cols="12"
        md="6"
        class="mb-4"
      >
        <div class="card h-100 shadow-sm border-0">
          <img
            :src="recipe.image"
            @error="handleImageError"
            class="card-img-top"
            :alt="recipe.title"
            style="object-fit: cover; height: 200px;"
          />
          <div class="card-body">
            <h5 class="fw-bold">{{ recipe.title }}</h5>
            <p class="mb-1"><strong>👤 By:</strong> {{ recipe.familyMember }}</p>
            <p class="mb-3"><strong>🕯️ Occasions:</strong> {{ recipe.occusion }}</p>

            <h6 class="fw-semibold">🛒 Ingredients:</h6>
            <ul class="ps-3">
              <li v-for="(ing, index) in recipe.ingredients" :key="index">
                {{ ing.amount }} {{ ing.unit }} {{ ing.name }}
              </li>
            </ul>

            <h6 class="fw-semibold mt-3">👨‍🍳 Instructions:</h6>
            <ol class="ps-3">
              <li v-for="(step, idx) in recipe.instructions" :key="idx">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';

// the original logic from your file (I DID NOT add any recipes)
const familyRecipes = ref([]);

function handleImageError(event) {
  event.target.src = require('@/assets/default_food.jpg');
}
</script>
