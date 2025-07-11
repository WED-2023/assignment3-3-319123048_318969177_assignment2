<template>
  <div class="search-page-wrapper position-relative">
    
    <img
      src="@/assets/search_cover.jpg"
      alt="Search Background"
      class="bg-img position-absolute w-100 h-100"
    />

    
    <div class="overlay position-absolute w-100 h-100"></div>

    
    <div class="content-container position-relative py-5">
      <b-container>
        <div class="search-card p-4 mb-5 rounded shadow">
          <h2 class="mb-4">Search Recipes</h2>

          
          <SearchForm
            :query="query"
            :selectedCuisine="selectedCuisine"
            :selectedDiet="selectedDiet"
            :selectedIntolerance="selectedIntolerance"
            :limit="limit"
            :sortBy="sortBy"
            :sortDirection="sortDirection"
            :cuisineOptions="cuisineOptions"
            :dietOptions="dietOptions"
            :intoleranceOptions="intoleranceOptions"
            :limitOptions="limitOptions"
            :sortByOptions="sortByOptions"
            :sortDirectionOptions="sortDirectionOptions"
            @submitSearch="searchRecipes"
            @updateSortBy="sortBy = $event"
            @updateSortDirection="sortDirection = $event"
          />
        </div>

        
        <div v-if="searched">
          <div v-if="recipes.length">
            <b-row>
              <b-col
                v-for="r in sortedRecipes"
                :key="r.id"
                cols="12"
                md="6"
                lg="4"
                class="mb-4 d-flex align-items-stretch"
              >
                <RecipePreview class="recipePreview" :recipe="r" @like-updated="updatePopularity" />
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <p class="text-danger">No results found for your search criteria.</p>
          </div>
        </div>

        
        <div v-else>
          <div v-if="store.username">
            <div v-if="lastSearches.length">
              <h4 class="mb-3">Last Searched Recipes</h4>

              <div class="mb-3 p-3 bg-light border rounded opacity-box" v-if="lastSearchMeta">
                <p class="mb-0">
                  <strong>Last search:</strong>
                  "{{ lastSearchMeta.query || 'N/A' }}"
                  <span v-if="lastSearchMeta.cuisine"> | Cuisine: {{ lastSearchMeta.cuisine }}</span>
                  <span v-if="lastSearchMeta.diet"> | Diet: {{ lastSearchMeta.diet }}</span>
                  <span v-if="lastSearchMeta.intolerance"> | Intolerance: {{ lastSearchMeta.intolerance }}</span>
                  <span v-if="lastSearchMeta.limit"> | Limit: {{ lastSearchMeta.limit }}</span>
                  <span v-if="lastSearchMeta.sortBy">
                    | Sorted by: {{ lastSearchMeta.sortBy }} ({{ lastSearchMeta.sortDirection }})
                  </span>
                </p>
              </div>

              <b-row>
                <b-col
                  v-for="recipe in lastSearches"
                  :key="recipe.id"
                  cols="12"
                  md="6"
                  lg="4"
                  class="mb-4 d-flex align-items-stretch"
                >
                  <RecipePreview :recipe="recipe"/>
                </b-col>
              </b-row>
            </div>
            <div v-else>
              <p class="text-muted">You have no recent searches yet.</p>
            </div>
          </div>
          <div v-else>
            <RecipePreviewList title="Recommended Recipes" />
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>



<script>
import RecipePreview from "../components/RecipePreview.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import SearchForm from "@/components/SearchForm.vue";
import store from "../store";
import cuisineOptions from "../data/cuisineOptions.js";
import dietOptions from "../data/dietOptions.js";
import intoleranceOptions from "../data/intoleranceOptions.js";
export default {
  name: "SearchPage",
  components: {
    SearchForm,
    RecipePreview,
    RecipePreviewList
  },
  data() {
    return {
      store,
      query: "",
      selectedCuisine: "",
      selectedDiet: "",
      selectedIntolerance: "",
      limit: 5,
      sortBy: "popularity",
      sortDirection: "desc",
      recipes: [],
      searched: false,
      lastSearches: [],
      lastSearchMeta: null,
      cuisineOptions,
      dietOptions,
      intoleranceOptions,
      limitOptions: [
        { value: 5, text: "5 results" },
        { value: 10, text: "10 results" },
        { value: 15, text: "15 results" }
      ],
      sortByOptions: [
        { value: "popularity", text: "Popularity" },
        { value: "readyInMinutes", text: "Preparation Time" }
      ],
      sortDirectionOptions: [
        { value: "desc", text: "Descending" },
        { value: "asc", text: "Ascending" }
      ]
    };
  },
  computed: {
    sortedRecipes() {
      const key = this.sortBy;
      const dir = this.sortDirection;
      return [...this.recipes].sort((a, b) => {
        const valA = a[key] || 0;
        const valB = b[key] || 0;
        return dir === "asc" ? valA - valB : valB - valA;
      });
    }
  },
  methods: {
    async searchRecipes(searchData) {
        if (searchData) {
        this.query = searchData.query;
        this.selectedCuisine = searchData.selectedCuisine;
        this.selectedDiet = searchData.selectedDiet;
        this.selectedIntolerance = searchData.selectedIntolerance;
        this.limit = searchData.limit;
        this.sortBy = searchData.sortBy;
        this.sortDirection = searchData.sortDirection;
      }

      if (!this.query) {
        alert("Please enter a recipe name to search.");
        return;
      }

      const params = {
        query: this.query,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerances: this.selectedIntolerance,
        limit: this.limit
      };

      try {
        const res = await this.axios.get(`${store.server_domain}/api/recipes`, {
          params,
          withCredentials: true,
        });
        this.recipes = res.data;

        if (store.username) {
          await this.axios.post(`${store.server_domain}/api/users/my-last-searches`, {
            query: this.query,
            selectedCuisine: this.selectedCuisine,
            selectedDiet: this.selectedDiet,
            selectedIntolerance: this.selectedIntolerance,
            limit_results: this.limit,
            sortBy: this.sortBy,
            sortDirection: this.sortDirection,
            recipeIds: this.recipes.map(r => r.id),
          }, {
            withCredentials: true,
          });
        }
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
        if (res.data && res.data.recipes) {
          this.lastSearches = res.data.recipes;
          this.lastSearchMeta = res.data.searchMeta;
        }
      } catch (err) {
        console.log("No last searches or failed to fetch.", err);
      }
    },
      updatePopularity({ id, newPopularity }) {
      const recipe = this.recipes.find(r => r.id === id);
      if (recipe) {
        recipe.popularity = newPopularity;
        console.log(`🔁 Updated recipe ${id} popularity to:`, newPopularity);
        console.log("📋 Full recipes list after update:", this.recipes);
      }
    },
  },
  mounted() {
    if (store.username) {
      this.loadLastSearches();
    }
  }
};
</script>

<style scoped>
.search-page-wrapper {
  min-height: 100vh;
  overflow: hidden;
}

.bg-img {
  object-fit: cover;
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;
  z-index: 0;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.85);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
}

.content-container {
  position: relative;
  z-index: 2;
}

.search-card {
  background-color: #ffffff;
}

</style>
