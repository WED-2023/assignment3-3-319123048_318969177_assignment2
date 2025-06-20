<template>
  <div class="mb-5">
    <div class="row">
      <div
        class="col-md-6 mb-4"
        v-for="recipe in recipes"
        :key="recipe.title"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="recipe.image"
            class="card-img-top"
            :alt="recipe.title"
          />

          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p><strong>👤 By:</strong> {{ recipe.familyMember }}</p>
            <p><strong>🕯 Occasions:</strong> {{ recipe.occusion }}</p>

            <!-- NEW: Info row -->
            <p class="text-muted small">
              ⏱ {{ recipe.readyInMinutes }} minutes |
              🍽 {{ recipe.servings }} servings
            </p>

            <!-- NEW: Dietary icons -->
            <div class="mb-2 dietary-icons">
              <span v-if="recipe.isvegetarian" title="Vegetarian">🥬</span>
              <span v-if="recipe.isvegan" title="Vegan">🌱</span>
              <span v-if="recipe.isglutenFree" title="Gluten Free">🚫🌾</span>
            </div>

            <h6>🛒 Ingredients:</h6>
            <ul>
              <li
                v-for="(ing, index) in recipe.ingredients"
                :key="index"
              >
                {{ ing.amount }} {{ ing.unit }} {{ ing.name }}
              </li>
            </ul>

            <h6>👨‍🍳 Instructions:</h6>
            <ol>
              <li
                v-for="(step, index) in recipe.instructions"
                :key="index"
              >
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "FamilyClassics",
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
.card-body ul,
.card-body ol {
  padding-left: 1rem;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
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