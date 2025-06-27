<template>
  <div class="container">
    <h3>{{ title }}</h3>
    
    <div class="row">
      <div class="col" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import store from '../store';
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // Fetch random recipes from the server
        console.log("Fetching random recipes from server...");
        const response = await this.axios.get(
          store.server_domain + "/api/recipes/random"
        );
        console.log("Response data:", response.data);
        this.recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
  background-color: transparent;
}

.row {
  margin-top: 20px;
}

.col {
  padding: 10px;
}
</style>
