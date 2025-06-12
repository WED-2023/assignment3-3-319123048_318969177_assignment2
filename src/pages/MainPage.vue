
<template>
  <div class="container mt-4">
    <div class="row">
      
      <!-- Random Recipes -->
      <div class="col-md-6 mb-4">
        <h3>Explore these recipes:</h3>
        <RecipePreviewList title="" ref="randomList" />
        <button @click="refreshRandomRecipes" class="btn btn-primary mt-3">Show More Recipes</button>
      </div>

      <!-- For logged in Users - Laste Watched Recipes -->
      <div class="col-md-6 mb-4">
        <template v-if="store.username">
          <h3>Last Watched Recipes</h3>
          <RecipePreviewList title="" :recipes="watchedRecipes" />
        </template>
        <!-- For other Users - login page -->
        <template v-else>
          <h3>Welcome!</h3>
          <p>You must log in to view your recent recipes.</p>
          <div class="card p-3">
            <LoginPage />
            <div class="text-center mt-3">
              <p>Don't have an account?</p>
              <router-link :to="{ name: 'register' }">
                <button class="btn btn-outline-primary">Register</button>
              </router-link>
            </div>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>


<script>
import { getCurrentInstance, ref, onMounted  } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginPage from "../pages/LoginPage.vue";
export default {
  components: {
    LoginPage,
    RecipePreviewList
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;

    // Static data for now
    const watchedRecipes = ref([
      {
        id: 1,
        title: "Shakshuka",
        image: "https://example.com/shakshuka.jpg",
        readyInMinutes: 30,
        aggregateLikes: 20
      },
      {
        id: 2,
        title: "Pasta",
        image: "https://example.com/pasta.jpg",
        readyInMinutes: 25,
        aggregateLikes: 10
      },
      {
        id: 3,
        title: "Pizza",
        image: "https://example.com/pizza.jpg",
        readyInMinutes: 15,
        aggregateLikes: 40
      }
    ]);

    
    const randomList = ref(null);

    
    const refreshRandomRecipes = () => {
      randomList.value?.updateRecipes();
    };

    onMounted(() => {
      
      randomList.value?.updateRecipes();
    });

    return { store, watchedRecipes, randomList, refreshRandomRecipes };
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