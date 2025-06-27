<template>
  <div class="family-page-wrapper position-relative">
    <!-- 🌄 Background Image -->
    <img
      src="@/assets/myFamily_cover.jpg"
      alt="Family Cover"
      class="bg-img position-absolute w-100 h-100"
    />
    <!-- 🧊 Overlay -->
    <div class="overlay position-absolute w-100 h-100"></div>

    <!-- 🌟 תוכן -->
    <div class="content-container position-relative py-5 px-3">

        <h2 class="mb-4 text-center">👨‍👩‍👧‍👦 Family Recipes</h2>

        <!-- Static Family Recipes -->
        <div class="mb-5">
          <h4 class="mb-3 text-center">✨ Our Family Classics:</h4>
          <FamilyOverviewRecipe :recipes="staticFamilyRecipes" />
        </div>

        <!-- User Family Recipes -->
        <div>
          <h4 class="mb-3 text-center">📖 Your Family Recipes:</h4>
          <p v-if="loading">Loading your family recipes...</p>
          <p v-else-if="userFamilyRecipes.length === 0" class="text-muted">
            You don't have family recipes.
          </p>

          <div class="row gx-2 gy-3" v-else>
            <div class="col-md-4" v-for="recipe in userFamilyRecipes" :key="recipe.id">
              <RecipePreview :recipe="recipe" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import RecipePreview from "@/components/RecipePreview.vue";
import FamilyOverviewRecipe from "@/components/FamilyOverviewRecipe.vue";
import staticRecipes from "@/data/familyRecipes";
import axios from "axios";
import store from "@/store";

export default {
  name: "FamilyRecipesPage",
  components: {
    FamilyOverviewRecipe,
    RecipePreview
  },
  data() {
    return {
      staticFamilyRecipes: staticRecipes,
      userFamilyRecipes: [],
      loading: true
    };
  },
  async created() {
    try {
      const response = await axios.get(`${store.server_domain}/api/users/my_family`, {
        withCredentials: true
      });
      this.userFamilyRecipes = response.data || [];
    } catch (err) {
      console.error("Failed to load user's family recipes:", err);
      this.userFamilyRecipes = [];
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.family-page-wrapper {
  min-height: 100vh;
  overflow: hidden;
}

.bg-img {
  object-fit: cover;
  z-index: 0;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 1;
}

.content-container {
  z-index: 2;
  position: relative;
}

.pastel-bg {
  background-color: #fef6f8;
}
</style>
