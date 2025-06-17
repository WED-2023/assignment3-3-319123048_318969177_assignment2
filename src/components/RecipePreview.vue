<template>
  <div class="card h-100">
    <img
      :src="currentImage"
      @error="onImageError"
      class="card-img-top recipe-image"
      alt="Recipe image"
    />
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">{{ recipe.readyInMinutes }} minutes</p>
      <p class="card-text">{{ recipe.popularity }} likes</p>
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/cooking.jpeg";

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
    };
  },
  methods: {
    onImageError() {
      this.currentImage = defaultImage;
    },
  },
};
</script>

<style scoped>
.recipe-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
}

.card {
  max-height: 250px;
  overflow: hidden;
  font-size: 0.9rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 10px;
}

.card-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-text {
  margin: 0;
  color: #666;
}
</style>
