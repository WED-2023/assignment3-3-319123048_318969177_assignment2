<template>
  <div class="recipes-page-wrapper position-relative py-5">
    <div class="overlay position-absolute w-100 h-100"></div>

    <b-container class="position-relative z-1">
      <h2 class="text-center mb-4 pastel-title">{{ title }}</h2>

      <p v-if="error" class="text-danger text-center">{{ error }}</p>
      <p v-else-if="recipes.length === 0" class="text-center text-muted">
        {{ emptyMessage }}
      </p>

      <b-row>
        <b-col
          cols="12"
          md="6"
          lg="4"
          class="mb-2 d-flex align-items-stretch"
          v-for="r in recipes"
          :key="r.id"
        >
          <RecipePreview :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "MyRecipesPage", 
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      default: "My Recipes",
    },
    apiEndpoint: {
      type: String,
      required: true,
    },
    emptyMessage: {
      type: String,
      default: "You have no recipes yet.",
    },
  },
  data() {
    return {
      recipes: [],
      error: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${store.server_domain}/api/users/my_recipes`, {
          withCredentials: true,
        });
        this.recipes = response.data;
      } catch (err) {
        console.error(err);
        this.error = "Failed to load recipes.";
      }
    },
  },
};
</script>

<style scoped>
.recipes-page-wrapper {
  min-height: 100vh;
  background-image: url('@/assets/myRecipes_cover.jpg'); 
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 0;
}

.pastel-title {
  color: #aa7b9b;
  font-weight: bold;
}
</style>
