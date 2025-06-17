<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="currentImage" @error="onImageError" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li v-for="(r, index) in recipe.ingredients" :key="index">
                {{ r.amount }} {{ r.unit }} {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/cooking.jpeg"; // ← תמונה דיפולטית

export default {
  data() {
    return {
      recipe: null,
      currentImage: null,
    };
  },
  async created() {
    try {
      const response = await this.axios.get(
        this.store.server_domain + "/api/recipes/" + this.$route.params.recipeid
      );

      if (response.status !== 200 || !response.data) {
        this.$router.replace("/NotFound");
        return;
      }

      const data = response.data;

      const _instructions = (data.instructions?.[0] || []).map((step, index) => ({
        number: index + 1,
        step: step,
      }));

      this.recipe = {
        title: data.title,
        image: data.image,
        readyInMinutes: data.readyInMinutes,
        popularity: data.popularity,
        ingredients: data.ingredients || [],
        _instructions: _instructions,
      };

      this.currentImage = data.image || defaultImage;
    } catch (error) {
      console.error("Error loading recipe:", error);
      this.$router.replace("/NotFound");
    }
  },
  methods: {
    onImageError() {
      this.currentImage = defaultImage;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>