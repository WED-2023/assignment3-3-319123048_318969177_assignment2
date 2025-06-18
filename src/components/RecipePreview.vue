<template>
  <div class="card h-100">
    <!-- Recipe Image -->
    <img
      :src="currentImage"
      @error="onImageError"
      class="card-img-top recipe-image"
      alt="Recipe image"
      @click="goToRecipe"
    />

    <!-- Card Body -->
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">{{ recipe.readyInMinutes }} minutes</p>

      <!-- Likes count -->
      <p class="card-text">👍 {{ likes }} likes</p>

      <!-- Like button (available to all users) -->
      <button class="btn btn-outline-primary btn-sm mt-1" @click="likeRecipe">
        👍 Like
      </button>

      <!-- Favorite button (only for logged-in users) -->
      <button
        v-if="store.username"
        class="btn btn-outline-danger btn-sm mt-1 ms-2"
        @click="markAsFavorite"
      >
        ♥ Favorite
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import defaultImage from "@/assets/cooking.jpeg";
import store from "@/store";

export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentImage: this.recipe.image || defaultImage,
      likes: 0, 
      store: store,
    };
  },
  methods: {
    onImageError() {
      this.currentImage = defaultImage;
    },

    // Navigate to full recipe page
    goToRecipe() {
      this.$router.push({ name: "recipe", params: { recipeid: this.recipe.id } });
    },

    // Like the recipe and increment UI and DB count
    async likeRecipe() {
      try {
        await axios.post(`${store.server_domain}/api/recipes/${this.recipe.id}/like`, {}, { withCredentials: true });
        this.likes += 1;
      } catch (err) {
        console.error("Like failed:", err);
        alert("Failed to like recipe.");
      }
    },

    // Save recipe to user's favorites
    async markAsFavorite() {
      try {
        await axios.post(`${store.server_domain}/api/users/my_favorites`, {
          recipeId: this.recipe.id,
        }, {
          withCredentials: true,
        });
        alert("Recipe added to favorites!");
      } catch (err) {
        console.error("Failed to favorite recipe:", err);
        alert("Failed to add to favorites.");
      }
    },

    // Fetch likes count from the server
    async fetchLikes() {
      try {
        const res = await axios.get(`${store.server_domain}/api/recipes/${this.recipe.id}/likes`);
        this.likes = res.data.likes ?? 0;
      } catch (err) {
        console.error("Failed to fetch likes:", err);
        this.likes = this.recipe.popularity || 0; 
      }
    },
  },

  mounted() {
    this.fetchLikes(); // Load likes count when component is mounted
  },
};
</script>

<style scoped>
.recipe-image {
  cursor: pointer;
  object-fit: cover;
  height: 250px;
}
</style>
