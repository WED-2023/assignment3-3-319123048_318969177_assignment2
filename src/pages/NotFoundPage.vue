<template>
  <div class="not-found-page d-flex flex-column justify-content-center align-items-center text-center">
    <h1 class="display-1 fw-bold pastel-title">404</h1>
    <p class="lead mb-3">Oops! This page doesn't exist... 👀</p>
    <p class="mb-4 text-muted">The recipe you're looking for might be in another oven 🍪</p>

    <router-link to="/" class="btn pastel-btn px-4 py-2">
      🏠 Back to Home
    </router-link>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background-color: #fff7fa;
  padding: 2rem;
}

.pastel-title {
  color: #aa7b9b;
}

.pastel-btn {
  background-color: #d7b0c6;
  border: none;
  color: black;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.pastel-btn:hover {
  background-color: #c999b3;
  color: white;
}
</style>
