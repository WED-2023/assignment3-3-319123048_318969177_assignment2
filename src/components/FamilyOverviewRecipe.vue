<template>
  <div class="scroll-wrapper overflow-auto pb-2">
    <div class=" mb-4 d-flex flex-row flex-nowrap gap-3 ">
      <div
        class="card mb-4 h-100 rounded-4 shadow-sm pastel-card"
        v-for="recipe in recipes"
        :key="recipe.title"
        style="min-width: 270px; max-width: 270px;"
      >
        <img
          :src="recipe.image"
          class="card-img-top mb-4 rounded-top-4"
          :alt="recipe.title"
          style="height: 160px; object-fit: cover;"
        />

        <div class="card-body mb-4 p-3">
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

          <h6 class="mt-2">🛒 Ingredients:</h6>
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
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.pastel-card {
  background-color: #fff7fa;
  transition: transform 0.3s ease;
}
.pastel-card:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.dietary-icons span {
  font-size: 1.2rem;
  margin-right: 6px;
}
.card-body ul,
.card-body ol {
  padding-left: 1rem;
}

.scroll-wrapper {
  scrollbar-width: thin;
  scrollbar-color: #d7b0c6 transparent;
}

.scroll-wrapper::-webkit-scrollbar {
  height: 8px;
}
.scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: #d7b0c6;
  border-radius: 10px;
}
.pastel-card {
  background-color: #fff7fa;
  transition: transform 0.3s ease;
}
.pastel-card:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
</style>
