<template>
  <div class="d-flex justify-content-center flex-wrap gap-4 my-4">
    <div
      class="card pastel-card shadow-sm rounded-4 d-flex flex-column"
      v-for="recipe in recipes"
      :key="recipe.title"
      style="width: 270px; min-height: 550px;"
    >
      <img
        :src="recipe.image"
        class="card-img-top rounded-top-4"
        :alt="recipe.title"
        style="height: 160px; object-fit: cover;"
      />

      <div class="card-body d-flex flex-column justify-content-between p-3">
        <div>
          <h5 class="card-title">{{ recipe.title }}</h5>
          <p class="mb-1"><strong>👤 By:</strong> {{ recipe.familyMember }}</p>
          <p class="mb-1"><strong>🕯 Occasions:</strong> {{ recipe.occusion }}</p>
          <p class="text-muted small mb-2">
            ⏱ {{ recipe.readyInMinutes }} min | 🍽 {{ recipe.servings }} servings
          </p>

          <div class="mb-2 dietary-icons">
            <span v-if="recipe.isvegetarian" title="Vegetarian">🥦</span>
            <span v-if="recipe.isvegan" title="Vegan">🍃</span>
            <span v-if="recipe.isglutenFree" title="Gluten Free">🌾❌</span>
          </div>
        </div>

        <div>
          <h6>🛒 Ingredients:</h6>
          <ul class="small mb-3">
            <li v-for="(ing, index) in recipe.ingredients" :key="index">
              {{ ing.amount }} {{ ing.unit }} {{ ing.name }}
            </li>
          </ul>

          <h6>👨‍🍳 Instructions:</h6>
          <ol class="small mb-0">
            <li v-for="(step, index) in recipe.instructions" :key="index">
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FamilyOverviewRecipe",
  props: {
    recipes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.pastel-card {
  background-color: #fff7fa;
  transition: transform 0.3s ease;
}
.pastel-card:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
.card-body ul,
.card-body ol {
  padding-left: 1rem;
}
.dietary-icons span {
  font-size: 1.2rem;
  margin-right: 6px;
}
</style>
