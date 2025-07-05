<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg pastel-navbar shadow-sm">
      <div class="container-fluid d-flex justify-content-between align-items-center w-100 px-3">

        <!-- Left side: navigation links -->
        <div class="d-flex align-items-center gap-3">
          <router-link class="navbar-link pastel-link" :to="{ name: 'main' }">Home</router-link>
          <router-link class="nav-link pastel-link" :to="{ name: 'search' }">Search</router-link>
          <router-link class="nav-link pastel-link" :to="{ name: 'about' }">About</router-link>

          <!-- Guest -->
          <template v-if="!store.username">
            <router-link class="nav-link pastel-link" :to="{ name: 'login' }">Login</router-link>
            <router-link class="nav-link pastel-link" :to="{ name: 'register' }">Register</router-link>
          </template>

          <!-- Logged in -->
          <template v-else>
            <div class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle pastel-link"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Personal
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'favorites' }">My Favorites</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'myRecipes' }">My Recipes</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'familyRecipes' }">Family Recipes</router-link></li>
              </ul>
            </div>

            <button class="btn pastel-btn ms-2" @click="showCreateModal = true">
              Create Recipe
            </button>
          </template>
        </div>

        <!-- Center: Logo -->
        <div class="logo-center position-absolute start-50 translate-middle-x">
          <img src="@/assets/logo.png" alt="Logo" class="nav-logo" />
        </div>

        <!-- Right: Hello + Logout -->
        <div class="d-flex align-items-center gap-2">
          <span class="text-hello">Hello, {{ store.username || 'Guest' }}</span>
          <button
            v-if="store.username"
            class="btn pastel-btn"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <router-view />

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

<style scoped>
.pastel-navbar {
  background-color: #fffaf4;
  height: 80px;
}

.navbar-nav .nav-link,
.pastel-link {
  font-size: 1.2rem;
}

.nav-logo {
  height: 80px;
  max-height: 80px;
}

.pastel-btn {
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  border: #a2758a 2px solid;
}
.pastel-btn:hover {
  background-color: #d7b0c6;
  color: black;
}

.logo-center {
  z-index: 1;
}

@media (max-width: 991.98px) {
  .pastel-navbar {
    height: auto;
  }
  .nav-logo {
    height: 50px;
  }
}

.text-hello{
  font-size: 1.1rem;
  font-weight: 500;
  color: #5e4b56 !important;
}
.navbar-link,
.pastel-link {
  font-weight: 600;
  letter-spacing: 0.5px;
}
.pastel-link {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #5e4b56 !important;
  text-decoration: none;
  transition: color 0.3s, border-bottom 0.3s;
}


.pastel-link:hover {
  color: #a2758a !important;
  text-decoration: none;
  border-bottom: 2px solid #d7b0c6;
}

.router-link-exact-active.pastel-link {
  color: #a2758a !important;
  font-weight: 700;
  border-bottom: 2px solid #d7b0c6;
}
</style>
