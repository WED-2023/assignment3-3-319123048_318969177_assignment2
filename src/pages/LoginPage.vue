<template>
  <b-container class="mt-5 d-flex justify-content-center">
    <b-card class="p-4 shadow-sm" style="max-width: 400px; width: 100%;">
      <h3 class="mb-4 text-center fw-bold">Login</h3>

      <form @submit.prevent="login">
        <!-- Username Field -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && !username }"
            placeholder="Enter your username"
          />
          <div class="invalid-feedback">Username is required.</div>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
            placeholder="Enter your password"
          />
          <div class="invalid-feedback">Password is required.</div>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn btn-outline-primary w-100 fw-semibold">
          Log In
        </button>

        <!-- Optional: Register Link -->
        <div class="mt-3 text-center">
          <small class="text-muted">
            Don’t have an account?
            <router-link to="/register">Register</router-link>
          </small>
        </div>
      </form>
    </b-card>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import store from '@/store';

const username = ref('');
const password = ref('');
const submitted = ref(false);

async function login() {
  submitted.value = true;
  if (!username.value || !password.value) return;

  try {
    const response = await axios.post(`${store.server_domain}/api/auth/login`, {
      username: username.value,
      password: password.value,
    });

    if (response.status === 200) {
      store.login(username.value);
      window.location.href = '/';
    }
  } catch (error) {
    alert('Login failed. Please check your credentials.');
    console.error(error);
  }
}
</script>
