<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-link" :to="{ name: 'main' }">Recipes</router-link>
        <!-- collapse button for mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!--navbar -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'search' }">Search</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
            </li>

            <!-- Guest -->
            <template v-if="!store.username">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
              </li>
            </template>

            <!-- logged in user -->
            <template v-else>
              <!-- Personal -->
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Personal
                </a>
                <ul class="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <router-link class="dropdown-item" :to="{ name: 'favorites' }">My Favorite Recipes</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ name: 'myRecipes' }">My Recipes</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{ name: 'familyRecipes' }">My Family Recipes</router-link>
                  </li>
                </ul>
              </li>

              <!-- Create Recipe -->
              <li class="nav-item d-flex align-items-center">
                <button
                  class="btn btn-outline-primary ms-2"
                  @click="showCreateModal = true"
                >
                  Create Recipe
                </button>
              </li>
            </template>
          </ul>

          <div class="d-flex align-items-center gap-2">
            <span class="navbar-text">
              Hello, {{ store.username || "Guest" }}
            </span>

            <template v-if="store.username">
              <button class="btn btn-primary" @click="logout">Logout</button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main navbar content -->
    <router-view class="container mt-4" />

    <!-- Create Recipe Modal -->
    <b-modal
      id="createRecipeModal"
      title="Create New Recipe"
      v-model="showCreateModal"
      size="lg"
      centered
      hide-footer
    >
      <CreateRecipeForm @saved="showCreateModal = false" />
    </b-modal>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import store from './store';
import CreateRecipeForm from './components/CreateRecipeForm.vue';
import { ref } from 'vue';

export default {
  name: "App",
  components: { CreateRecipeForm },
  setup() {
    const router = useRouter();
    const logout = () => {
      store.logout();
      router.push("/").catch(() => {});
    };
    const showCreateModal = ref(false);
    return { showCreateModal, store, logout };
  }
}
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.router-link-exact-active {
  font-weight: bold;
  color: #0d6efd !important;
  text-decoration: underline;
}
</style>
