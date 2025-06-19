<template>
  <div class="card h-100 position-relative">
    <!-- Recipe Image -->
    <div class="image-wrapper" @click="handleImageClick">
      <img
        :src="currentImage"
        @error="onImageError"
        class="card-img-top recipe-image"
        alt="Recipe image"
      />
      <!-- Watched Tag -->
      <div v-if="hasBeenWatched" class="watched-tag">
        👁️ Watched
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">{{ recipe.readyInMinutes }} minutes</p>
      <p class="card-text">👍 {{ likes }} likes</p>

      <!-- Dietary Info -->
      <div class="dietary-info">
        <span v-if="recipe.vegetarian" title="Vegetarian">🥬</span>
        <span v-if="recipe.vegan" title="Vegan">🌱</span>
        <span v-if="recipe.glutenFree" title="Gluten Free">🚫🌾</span>
      </div>

      <!-- Buttons -->
      <button class="btn btn-outline-primary btn-sm mt-1" @click="likeRecipe">
        👍 Like
      </button>
      <button
        v-if="store.username"
        :class="['btn btn-sm mt-1 ms-2', isFavorite ? 'btn-danger' : 'btn-outline-danger']"
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
      validator: (r) =>
        typeof r.title === "string" &&
        "image" in r &&
        "id" in r &&
        "readyInMinutes" in r &&
        "vegan" in r &&
        "vegetarian" in r &&
        "glutenFree" in r,
    },
  },
  data() {
    return {
      currentImage: this.recipe.image || defaultImage,
      likes: 0,
      store: store,
      hasBeenWatched: false,
      isFavorite: false,
    };
  },
  methods: {
    onImageError() {
      this.currentImage = defaultImage;
    },
    async handleImageClick() {
      if (this.store.username) {
        try {
          await axios.post(
            `${store.server_domain}/api/users/${this.recipe.id}/viewed`,
            {},
            { withCredentials: true }
          );
          this.hasBeenWatched = true;
        } catch (err) {
          console.error("Failed to mark recipe as viewed:", err);
        }
      }
      this.$router.push({
        name: "recipe",
        params: { recipeid: this.recipe.id },
      });
    },
    async likeRecipe() {
      try {
        await axios.post(
          `${store.server_domain}/api/recipes/${this.recipe.id}/like`,
          {},
          { withCredentials: true }
        );
        this.likes += 1;
      } catch (err) {
        console.error("Like failed:", err);
        alert("Failed to like recipe.");
      }
    },
    async markAsFavorite() {
      try {
        await axios.post(
          `${store.server_domain}/api/users/my_favorites`,
          { recipeId: this.recipe.id },
          { withCredentials: true }
        );
        alert("Recipe added to favorites!");
        this.isFavorite = true;
      } catch (err) {
        console.error("Failed to favorite recipe:", err);
        alert("Failed to add to favorites.");
      }
    },
    async fetchLikes() {
      try {
        const res = await axios.get(
          `${store.server_domain}/api/recipes/${this.recipe.id}/likes`
        );
        this.likes = res.data.likes ?? 0;
      } catch (err) {
        console.error("Failed to fetch likes:", err);
        this.likes = this.recipe.popularity || 0;
      }
    },
    async checkIfWatched() {
      if (!this.store.username) return;

      try {
        const res = await axios.get(
          `${store.server_domain}/api/users/watched`,
          { withCredentials: true }
        );
        const watchedIds = Array.isArray(res.data) ? res.data : res.data.recipeIds ?? [];
        const watched = watchedIds.some(
          (id) => String(id) === String(this.recipe.id)
        );
        this.hasBeenWatched = watched;
        console.log("Watched?", this.recipe.id, "->", watched);
      } catch (err) {
        console.error("Failed to check watched status:", err);
      }
    },
    async checkIfFavorite() {
      if (!this.store.username) return;

      try {
        const res = await axios.get(
          `${store.server_domain}/api/users/my_favorites`,
          { withCredentials: true }
        );

        const favorites = Array.isArray(res.data) ? res.data : (res.data.recipes ?? []);

        this.isFavorite = favorites.some(
          (recipe) => String(recipe.id) === String(this.recipe.id)
        );

      } catch (err) {
        console.error("Failed to check favorite status:", err);
      }
    }

  },
  mounted() {
    this.fetchLikes();
    this.checkIfWatched();
    this.checkIfFavorite();
  },
};

</script>

<style scoped>
.recipe-image {
  object-fit: cover;
  height: 250px;
  width: 100%;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
}

.image-wrapper:hover .recipe-image {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Watched label – now black, clean, without background */
.watched-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  color: black;
  border: 1px solid black;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 2;
  background-color: transparent;
  pointer-events: none;
}

/* Dietary info styling */
.dietary-info {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 1.2rem;
}

</style>
