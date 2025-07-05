<template>
  <b-form @submit.prevent="emitSearch" class="form-card p-4 rounded shadow-sm">

    <b-form-group label="Recipe name:" label-for="query">
      <b-form-input
        id="query"
        v-model="localQuery"
        placeholder="Search by recipe name..."
        class="pastel-input"
      />
    </b-form-group>

  
    <b-row class="mb-3">
      <b-col md="3">
        <b-form-group label="Cuisine:" label-for="cuisine">
          <b-form-select
            id="cuisine"
            v-model="localSelectedCuisine"
            :options="cuisineOptions"
            class="pastel-select"
          />
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Diet:" label-for="diet">
          <b-form-select
            id="diet"
            v-model="localSelectedDiet"
            :options="dietOptions"
            class="pastel-select"
          />
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Intolerance:" label-for="intolerance">
          <b-form-select
            id="intolerance"
            v-model="localSelectedIntolerance"
            :options="intoleranceOptions"
            class="pastel-select"
          />
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Number of results:" label-for="limit">
          <b-form-select
            id="limit"
            v-model="localLimit"
            :options="limitOptions"
            class="pastel-select"
          />
        </b-form-group>
      </b-col>
    </b-row>

    
    <b-button type="submit" variant="light" class="pastel-button w-100 mb-4">
      🔍 Search Recipes
    </b-button>

    <!-- 🔀 מיון -->
    <b-row>
      <b-col md="6">
        <b-form-group label="Sort by:" label-for="sortBy">
          <b-form-select
            id="sortBy"
            :value="sortBy"
            :options="sortByOptions"
            class="pastel-select"
            @change="$emit('updateSortBy', $event)"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Sort direction:" label-for="sortDirection">
          <b-form-select
            id="sortDirection"
            :value="sortDirection"
            :options="sortDirectionOptions"
            class="pastel-select"
            @change="$emit('updateSortDirection', $event)"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>


<script>
export default {
  name: "SearchForm",
  props: {
    query: String,
    selectedCuisine: String,
    selectedDiet: String,
    selectedIntolerance: String,
    limit: Number,
    sortBy: String,
    sortDirection: String,
    cuisineOptions: Array,
    dietOptions: Array,
    intoleranceOptions: Array,
    limitOptions: Array,
    sortByOptions: Array,
    sortDirectionOptions: Array,
  },
  data() {
    return {
      localQuery: this.query,
      localSelectedCuisine: this.selectedCuisine,
      localSelectedDiet: this.selectedDiet,
      localSelectedIntolerance: this.selectedIntolerance,
      localLimit: this.limit
    };
  },
  methods: {
    emitSearch() {
      this.$emit("submitSearch", {
        query: this.localQuery,
        selectedCuisine: this.localSelectedCuisine,
        selectedDiet: this.localSelectedDiet,
        selectedIntolerance: this.localSelectedIntolerance,
        limit: this.localLimit,
        sortBy: this.sortBy,
        sortDirection: this.sortDirection,
      });
    }
  }
};
</script>

<style scoped>
.form-card {
  font-size: 1.1rem;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.pastel-input,
.pastel-select {
  border-radius: 12px;
  border: 1px solid #ddd;
  background-color: #fdfdfd;
  transition: all 0.3s ease;
}

.pastel-input:focus,
.pastel-select:focus {
  border: 2px solid rgb(167, 134, 152);
  box-shadow: 0 0 0 0.15rem rgba(162, 194, 208, 0.25);
}

.pastel-button {
  background-color: #d7b0c6;
  color: black;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  transition: 0.3s ease;
}

.pastel-button:hover {
  background-color: #d8a2c1;
  border-color: #d8a2c1;
}
</style>
