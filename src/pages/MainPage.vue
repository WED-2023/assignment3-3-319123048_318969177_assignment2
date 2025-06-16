
<template>
  <div class="container mt-4">
    <div class="row">
      
      <!-- Random Recipes -->
      <div class="col-md-6 mb-4">
        <h3>Explore these recipes:</h3>
        <RecipePreviewList title="" ref="randomList" />
        <button @click="refreshRandomRecipes" class="btn btn-primary mt-3">Get more recipes</button>
      </div>

      <!-- For logged in Users - Laste Watched Recipes -->
      <div class="col-md-6 mb-4">
        <template v-if="store.username">
          <div class="card shadow-sm p-3">
            <h3 class="card-title">Last Watched Recipes</h3>
            <RecipePreviewList title="" :recipes="watchedRecipes" />
          </div>
        </template>

        <!-- For other Users - login page -->
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
import { ref, onMounted  } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginPage from "../pages/LoginPage.vue";
import store from "../store";
export default {
  components: {
    LoginPage,
    RecipePreviewList
  },
  setup() {
     
    const randomList = ref(null);

        const refreshRandomRecipes = () => {
      randomList.value?.updateRecipes();
    };

    onMounted(() => {
      
      randomList.value?.updateRecipes();
    });

    return { store, randomList, refreshRandomRecipes };
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>



<!--Script to Use When I will have the server-->

<!-- import { getCurrentInstance, ref, onMounted } from 'vue';
import axios from 'axios';
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;

    const watchedRecipes = ref([]);
    const randomList = ref(null);

    const refreshRandomRecipes = () => {
      randomList.value?.updateRecipes();
    };

    // שלב 1 – נטען את המתכונים האחרונים מהשרת כשנכנסים לדף
    const loadWatchedRecipes = async () => {
      try {
        const response = await axios.get(`${store.server_domain}/users/lastWatched`);
        watchedRecipes.value = response.data; // הנח שאת מחזירה מערך של מתכונים
      } catch (error) {
        console.error("Failed to load watched recipes:", error);
      }
    };

    onMounted(() => {
      if (store.username) {
        loadWatchedRecipes();
      }
    });

    return {
      store,
      watchedRecipes,
      randomList,
      refreshRandomRecipes
    };
  }
}; -->