<template>
  <b-container class="px-0">
    <b-row>
      <b-col
        v-for="recipe in recipes"
        :key="recipe.id"
        cols="12"
        md="6"
        lg="4"
        class="mb-4"
      >
        <RecipePreview :recipe="recipe" />
      </b-col>
    </b-row>

    <div v-if="recipes.length === 0" class="text-center text-muted mt-4">
      <p>No recipes to show.</p>
    </div>
  </b-container>
</template>

<script setup>
import RecipePreview from './RecipePreview.vue';

defineProps({
  recipes: {
    type: Array,
    required: true,
  },
});
</script>
