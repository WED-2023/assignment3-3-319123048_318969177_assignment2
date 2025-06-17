<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Left Side: Random Recipes -->
      <div class="col-md-6 mb-4">
        <h3>Explore these recipes:</h3>
        <RecipePreviewList title="" ref="randomList" />
        <button @click="refreshRandomRecipes" class="btn btn-primary mt-3">Get more recipes</button>
      </div>

      <!-- Right Side: Last Watched or Login -->
      <div class="col-md-6 mb-4">
        <template v-if="store.username">
          <LastWatchedRecipes />
        </template>
        <template v-else>
          <h3>Welcome!</h3>
          <div class="card p-3">
            <LoginPage />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LastWatchedRecipes from "../components/LastWatchedRecipes.vue";
import LoginPage from "../pages/LoginPage.vue";
import store from "../store";

export default {
  components: {
    RecipePreviewList,
    LastWatchedRecipes,
    LoginPage
  },
  setup() {
    const randomList = ref(null);
    const refreshRandomRecipes = () => {
      randomList.value?.updateRecipes();
    };

    onMounted(() => {
      randomList.value?.updateRecipes();
    });

    return {
      store,
      randomList,
      refreshRandomRecipes
    };
  }
};
</script>
