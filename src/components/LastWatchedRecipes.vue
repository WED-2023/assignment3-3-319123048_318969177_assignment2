<template>
  <div>
    <div v-if="recipes.length === 0" class="text-center text-muted">
      <p>You haven’t watched any recipes yet.</p>
    </div>

    <b-row v-else>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RecipePreview from './RecipePreview.vue';
import axios from 'axios';
import store from '@/store';

const recipes = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${store.server_domain}/api/users/last-watched`);
    recipes.value = response.data || [];
  } catch (error) {
    console.error('Error fetching last watched recipes:', error);
  }
});
</script>
