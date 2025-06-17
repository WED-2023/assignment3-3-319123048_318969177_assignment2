<template>
  <div class="card h-100">
    <img
      :src="currentImage"
      @error="onImageError"
      class="card-img-top recipe-image"
      alt="Recipe image"
      @click="goToRecipe"
    />
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">{{ recipe.readyInMinutes }} minutes</p>
      <p class="card-text">👍 {{ likes }} likes</p>

      <!-- כפתור לייק (לכל אחד) -->
      <button class="btn btn-outline-primary btn-sm mt-1" @click="likeRecipe">
        👍 Like
      </button>

      <!-- כפתור מועדף (רק למשתמשים מחוברים) -->
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
      likes: this.recipe.popularity || 0,
      store: store,
    };
  },
  methods: {
    onImageError() {
      this.currentImage = defaultImage;
    },
    likeRecipe() {
      const key = `liked_${this.recipe.id}`;

      axios
        .post(`${store.server_domain}/api/recipes/${this.recipe.id}/like`)
        .then(() => {
          this.likes += 1;
          localStorage.setItem(key, "true");
        })
        .catch((err) => {
          console.error("Like failed:", err);
        });
    },
    markAsFavorite() {
      axios
        .post(`${store.server_domain}/api/users/my_favorites`, {
          recipeID: this.recipe.id,
        })
        .then(() => {
          alert("Recipe added to favorites!");
        })
        .catch((err) => {
          console.error("Failed to favorite recipe:", err);
        });
    },
    goToRecipe() {
      this.$router.push({ name: "recipe", params: { recipeid: this.recipe.id } });
    },
  },
};
</script>