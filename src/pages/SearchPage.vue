<template>
  <b-container class="mt-4">
    <h2>Search Recipes</h2>

    <b-form @submit.prevent="searchRecipes">
      <b-row class="mb-3">
        <b-col cols="12" md="6">
          <label for="query">Recipe name:</label>
          <b-form-input
            id="query"
            v-model="query"
            placeholder="Search by recipe name..."
          />
        </b-col>

        <b-col cols="6" md="2">
          <label for="cuisine">Cuisine:</label>
          <b-form-select
            id="cuisine"
            v-model="selectedCuisine"
            :options="cuisineOptions"
          />
        </b-col>

        <b-col cols="6" md="2">
          <label for="diet">Diet:</label>
          <b-form-select
            id="diet"
            v-model="selectedDiet"
            :options="dietOptions"
          />
        </b-col>

        <b-col cols="6" md="2">
          <label for="intolerance">Intolerance:</label>
          <b-form-select
            id="intolerance"
            v-model="selectedIntolerance"
            :options="intoleranceOptions"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="6" md="3">
          <label for="limit">Number of results:</label>
          <b-form-select
            id="limit"
            v-model="limit"
            :options="limitOptions"
          />
        </b-col>
      </b-row>

      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>

    <div class="mt-4">
      <h4 v-if="recipes.length">Search Results</h4>
      <p v-else-if="searched">No results found.</p>
      <recipe-preview-list :recipes="recipes" />
    </div>
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import store from "../store";

export default {
  name: "SearchPage",
  components: { RecipePreviewList },
  data() {
    return {
      query: "",
      selectedCuisine: "",
      selectedDiet: "",
      selectedIntolerance: "",
      limit: 5,
      recipes: [],
      searched: false,
      cuisineOptions: [
        { value: "", text: "Select cuisine" },
        { value: "Israeli", text: "Israeli" },
        { value: "Italian", text: "Italian" },
        { value: "Chinese", text: "Chinese" }
      ],
      dietOptions: [
        { value: "", text: "Select diet" },
        { value: "vegetarian", text: "Vegetarian" },
        { value: "vegan", text: "Vegan" },
        { value: "gluten free", text: "Gluten Free" }
      ],
      intoleranceOptions: [
        { value: "", text: "Select intolerance" },
        { value: "dairy", text: "Dairy" },
        { value: "gluten", text: "Gluten" },
        { value: "peanut", text: "Peanut" }
      ],
      limitOptions: [
        { value: 5, text: "5 results" },
        { value: 10, text: "10 results" },
        { value: 15, text: "15 results" }
      ]
    };
  },
  methods: {
    async searchRecipes() {
      const params = {
        query: this.query,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerance: this.selectedIntolerance,
        number: this.limit
      };
      try {
        const res = await this.axios.get(`${store.server_domain}/api/search`, { params });
        this.recipes = res.data;
        if (store.username) {
          localStorage.setItem("lastSearch", JSON.stringify(this.recipes));
        }
      } catch (err) {
        console.error("Search failed", err);
        this.recipes = [];
      } finally {
        this.searched = true;
      }
    }
  },
  mounted() {
    if (store.username) {
      const saved = localStorage.getItem("lastSearch");
      if (saved) {
        this.recipes = JSON.parse(saved);
        this.searched = true;
      }
    }
  }
};
</script>
