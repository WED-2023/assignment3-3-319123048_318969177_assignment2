<template>
  <form @submit.prevent="onSearch" class="p-3 border rounded shadow-sm bg-white">
    <div class="row g-3">
      <!-- Query -->
      <div class="col-md-6">
        <label for="query" class="form-label">Search</label>
        <input
          id="query"
          v-model="query"
          type="text"
          class="form-control"
          placeholder="Search for recipes..."
        />
      </div>

      <!-- Cuisine -->
      <div class="col-md-3">
        <label for="cuisine" class="form-label">Cuisine</label>
        <input
          id="cuisine"
          v-model="cuisine"
          type="text"
          class="form-control"
          placeholder="e.g. Italian"
        />
      </div>

      <!-- Diet -->
      <div class="col-md-3">
        <label for="diet" class="form-label">Diet</label>
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
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const query = ref('');
const cuisine = ref('');
const diet = ref('');

function onSearch() {
  emit('search', {
    query: query.value,
    cuisine: cuisine.value,
    diet: diet.value,
  });
}
</script>
