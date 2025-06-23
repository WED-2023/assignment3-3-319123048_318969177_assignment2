<template>
  <b-form @submit.prevent="emitSearch">
    <!-- שורת חיפוש -->
    <b-form-group label="Recipe name:" label-for="query">
      <b-form-input
        id="query"
        v-model="localQuery"
        placeholder="Search by recipe name..."
      />
    </b-form-group>

    <!-- פילטרים -->
    <b-row class="mb-3">
      <b-col md="4">
        <b-form-group label="Cuisine:" label-for="cuisine">
          <b-form-select
            id="cuisine"
            v-model="localSelectedCuisine"
            :options="cuisineOptions"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group label="Diet:" label-for="diet">
          <b-form-select
            id="diet"
            v-model="localSelectedDiet"
            :options="dietOptions"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group label="Intolerance:" label-for="intolerance">
          <b-form-select
            id="intolerance"
            v-model="localSelectedIntolerance"
            :options="intoleranceOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- מיון -->
    <b-row class="mb-3">
      <b-col md="4">
        <b-form-group label="Number of results:" label-for="limit">
          <b-form-select
            id="limit"
            v-model="localLimit"
            :options="limitOptions"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group label="Sort by:" label-for="sortBy">
          <b-form-select
            id="sortBy"
            v-model="localSortBy"
            :options="sortByOptions"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group label="Sort direction:" label-for="sortDirection">
          <b-form-select
            id="sortDirection"
            v-model="localSortDirection"
            :options="sortDirectionOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- כפתור -->
    <b-button type="submit" variant="primary" block>
      🔍 Search Recipes
    </b-button>
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
      localLimit: this.limit,
      localSortBy: this.sortBy,
      localSortDirection: this.sortDirection,
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
        sortBy: this.localSortBy,
        sortDirection: this.localSortDirection,
      });
    },
  },
};
</script>
