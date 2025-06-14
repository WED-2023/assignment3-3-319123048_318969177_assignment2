<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'main' }">Recipes</router-link>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <!-- Tabs for all users -->
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'search' }">Search</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
            </li>

            <!-- Tabs for guests -->
            <template v-if="!store.username">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
              </li>
            </template>

            <!-- Tabs for logged-in users -->
            <template v-else>
              <li class="nav-item">
                <span class="nav-link">Hello, {{ store.username }}</span>
              </li>

              <!-- Dropdown Menu for pesonal tabs -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Personal
                </a>
                <ul class="dropdown-menu" aria-labelledby="userDropdown">
                  <li><router-link class="dropdown-item" :to="{ name: 'favorites' }">My Favorite Recipes</router-link></li>
                  <li><router-link class="dropdown-item" :to="{ name: 'myRecipes' }">My Recipes</router-link></li>
                  <li><router-link class="dropdown-item" :to="{ name: 'familyRecipes' }">My Family Recipes</router-link></li>
                </ul>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'createRecipe' }">Create Recipe</router-link>
              </li>

              <li class="nav-item">
                <button @click="logout" class="btn btn-outline-danger btn-sm ms-2">Logout</button>
              </li>
            </template>

          </ul>
          <!-- moving the text to the right -->
          <div class="d-flex">
            <template v-if="!store.username">
              <span class="navbar-text me-3">Hello Guest</span>
            </template>
            <template v-else>
              <span class="navbar-text me-3">Hello, {{ store.username }}</span>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <router-view class="container mt-4" />

  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: "App",
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;
    const toast = internalInstance.appContext.config.globalProperties.toast;
    const router = internalInstance.appContext.config.globalProperties.$router;

    const logout = () => {
      store.logout();
      toast("Logout", "User logged out successfully", "success");
      router.push("/").catch(() => {});
    };

    return { store, logout };
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-link-exact-active {
  font-weight: bold;
  color: #0d6efd !important; 
  text-decoration: underline;
}
</style>
