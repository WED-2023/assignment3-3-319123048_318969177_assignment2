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

    <!-- תוצאות חיפוש -->
    <div class="mt-5" v-if="searched">
      <h4 v-if="recipes.length">Search Results</h4>
      <p v-else>No results found.</p>
      <div class="row">
      <div class="col" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
    </div>

    <!-- חיפושים אחרונים או מתכונים רנדומליים -->
    <div class="mt-5" v-else>
      <div v-if="store.username">
        <div v-if="lastSearches.length">
          <h4>Last Searched Recipes</h4>
          <recipe-preview-list :recipes="lastSearches" />
        </div>
      </div>
      <div v-else>
        <!-- משתמש לא מחובר → מתכונים רנדומליים -->
        <RecipePreviewList title="Recommended Recipes" />
      </div>
    </div>
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import RecipePreview from "../components/RecipePreview.vue";
import store from "../store";
import cuisineOptions from '../data/cuisineOptions.js';
import dietOptions from '../data/dietOptions.js';
import intoleranceOptions from '../data/intoleranceOptions.js';

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
    RecipePreview
  },
  data() {
    return {
      store,
      query: "",
      selectedCuisine: "",
      selectedDiet: "",
      selectedIntolerance: "",
      limit: 5,
      recipes: [],
      searched: false,
      lastSearches: [],
      cuisineOptions: cuisineOptions,
      dietOptions: dietOptions,
      intoleranceOptions: intoleranceOptions,
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
        limit: this.limit
      };
      try {
        const res = await this.axios.get(`${store.server_domain}/api/recipes`, { params });
        this.recipes = res.data;
      } catch (err) {
        console.error("Search failed", err);
        this.recipes = [];
      } finally {
        this.searched = true;
      }
    },

    async loadLastSearches() {
      try {
        const res = await this.axios.get(`${store.server_domain}/api/users/my-last-searches`);
        if (res.data && res.data.length) {
          this.lastSearches = res.data;
        }
      } catch (err) {
        console.log("No last searches or failed to fetch.", err);
      }
    }
  },
  mounted() {
    if (store.username) {
      this.loadLastSearches();
    }
  }
};
</script>