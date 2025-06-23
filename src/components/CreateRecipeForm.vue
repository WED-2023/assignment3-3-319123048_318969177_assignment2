<template>
  <b-container class="mt-5 d-flex justify-content-center">
    <b-card class="p-4 shadow-sm w-100" style="max-width: 600px;">
      <h3 class="text-center fw-bold mb-4">Create a Recipe</h3>

      <form @submit.prevent="submitRecipe">
        <!-- Title -->
        <div class="mb-3">
          <label class="form-label">Title *</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitted && !title }"
            placeholder="Enter recipe title"
          />
          <div class="invalid-feedback">Title is required.</div>
        </div>

        <!-- Servings -->
        <div class="mb-3">
          <label class="form-label">Servings *</label>
          <input
            v-model.number="servings"
            type="number"
            min="1"
            class="form-control"
            :class="{ 'is-invalid': submitted && !servings }"
          />
          <div class="invalid-feedback">Servings is required (min 1).</div>
        </div>

        <!-- Preparation Time -->
        <div class="mb-3">
          <label class="form-label">Preparation Time (mins) *</label>
          <input
            v-model.number="prepTime"
            type="number"
            min="1"
            class="form-control"
            :class="{ 'is-invalid': submitted && !prepTime }"
          />
          <div class="invalid-feedback">Preparation time is required (min 1).</div>
        </div>

        <!-- Dietary Switches -->
        <div class="mb-3">
          <label class="form-label">Tags</label>
          <div class="form-check form-switch">
            <input v-model="vegan" type="checkbox" class="form-check-input" id="vegan" />
            <label class="form-check-label" for="vegan">Vegan</label>
          </div>
          <div class="form-check form-switch">
            <input v-model="vegetarian" type="checkbox" class="form-check-input" id="vegetarian" />
            <label class="form-check-label" for="vegetarian">Vegetarian</label>
          </div>
          <div class="form-check form-switch">
            <input v-model="glutenFree" type="checkbox" class="form-check-input" id="glutenFree" />
            <label class="form-check-label" for="glutenFree">Gluten Free</label>
          </div>
        </div>

        <!-- Ingredients -->
        <div class="mb-3">
          <label class="form-label">Ingredients *</label>
          <textarea
            v-model="ingredients"
            rows="3"
            class="form-control"
            :class="{ 'is-invalid': submitted && !ingredients }"
            placeholder="List ingredients..."
          ></textarea>
          <div class="invalid-feedback">Ingredients are required.</div>
        </div>

        <!-- Instructions -->
        <div class="mb-4">
          <label class="form-label">Instructions *</label>
          <textarea
            v-model="instructions"
            rows="4"
            class="form-control"
            :class="{ 'is-invalid': submitted && !instructions }"
            placeholder="Describe how to prepare the dish..."
          ></textarea>
          <div class="invalid-feedback">Instructions are required.</div>
        </div>

        <!-- Submit -->
        <button type="submit" class="btn btn-outline-primary w-100 fw-semibold">
          Submit Recipe
        </button>
      </form>
    </b-card>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const servings = ref(1);
const prepTime = ref(1);
const vegan = ref(false);
const vegetarian = ref(false);
const glutenFree = ref(false);
const ingredients = ref('');
const instructions = ref('');
const submitted = ref(false);

function submitRecipe() {
  submitted.value = true;

  if (!title.value || !servings.value || !prepTime.value || !ingredients.value || !instructions.value) {
    return;
  }

  // Submit logic stays the same
  console.log("Recipe submitted:", {
    title: title.value,
    servings: servings.value,
    prepTime: prepTime.value,
    vegan: vegan.value,
    vegetarian: vegetarian.value,
    glutenFree: glutenFree.value,
    ingredients: ingredients.value,
    instructions: instructions.value,
  });

  // Reset form
  title.value = '';
  servings.value = 1;
  prepTime.value = 1;
  vegan.value = false;
  vegetarian.value = false;
  glutenFree.value = false;
  ingredients.value = '';
  instructions.value = '';
  submitted.value = false;

  alert("Recipe submitted!");
}
</script>
