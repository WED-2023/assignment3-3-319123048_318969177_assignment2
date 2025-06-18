<template>
  <div class="container mt-4">
    <h2 class="mb-3">👨‍👩‍👧‍👦 Family Recipes</h2>

    <!-- Static Family Recipes -->
    <div class="mb-5">
      <h4 class="mb-3">✨ Our Family Classics:</h4>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="recipe in staticFamilyRecipes" :key="recipe.id">
          <RecipePreview :recipe="recipe" />
        </div>
      </div>
    </div>

    <!-- User's Family Recipes -->
    <div>
      <h4 class="mb-3">📖 Your Family Recipes:</h4>

      <p v-if="loading">Loading your family recipes...</p>
      <p v-else-if="userFamilyRecipes.length === 0">You don't have family recipes.</p>

      <div class="row" v-else>
        <div class="col-md-4 mb-4" v-for="recipe in userFamilyRecipes" :key="recipe.id">
          <RecipePreview :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "@/components/RecipePreview.vue";
import staticRecipes from "@/data/familyRecipes";
import axios from "axios";
import store from "@/store";

export default {
  name: "FamilyRecipesPage",
  components: {
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
.container {
  max-width: 960px;
}
</style>
