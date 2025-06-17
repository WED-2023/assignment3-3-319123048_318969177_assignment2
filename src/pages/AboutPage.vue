<template>
  <b-container class="mt-4">
    <b-card>
      <h2 class="mb-3">About the Project</h2>
     <p>
      Patch-Yak is a recipe website we built as part of our Web Development Environments course at Ben-Gurion University. It lets you search for recipes, save your favorites, and even add your own including special family recipes.
      The site is built with Vue.js on the front, Node.js and Express on the back, and uses a MySQL database to store everything.
      It’s easy to use, works smoothly, and helps bring all your favorite recipes into one place.
    </p>

    <h3 class="mt-4">Core Functionalities</h3>
    <ul>
      <li> Recipe search with filtering (diet, cuisine, intolerance)</li>
      <li> Detailed recipe view with ingredients, instructions, and serving info</li>
      <li> Create your own recipes in a modal form</li>
      <li> Save favorite recipes and track recently viewed ones</li>
      <li> Family recipe collection with personal stories and images</li>
      <li> Meal planning board with progress tracking (bonus)</li>
    </ul>


      <h3 class="mt-4">Development Team</h3>
      <ul>
        <li>Noa Patchornik – 319123048 </li>
        <li>Yaki Naftali – 318969177 </li>
      </ul>

      <h4 class="mt-4">Links to Previous Exercises</h4>
      <ul>
        <li><a href="https://app.swaggerhub.com/apis-docs/bgurecipeweb/Recipe_API/1.0.0 " target="_blank">project 3.  – API Documentation</a></li>
        <li><a href="https://github.com/WED-2023/assignment3-2-319123048_318969177_assignment2" target="_blank">project 3.2 – Server Side</a></li>
      </ul>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}
</style>
