<template>
  <b-container class="mt-5 d-flex justify-content-center">
    <b-card class="p-4 shadow-sm" style="max-width: 500px; width: 100%;">
      <h3 class="mb-4 text-center fw-bold">Register</h3>

      <form @submit.prevent="register">
        <!-- Username -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            class="form-control"
            :class="{ 'is-invalid': $v.username.$error }"
            placeholder="Choose a username"
          />
          <div class="invalid-feedback" v-if="!$v.username.required">
            Username is required.
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': $v.password.$error }"
            placeholder="Choose a password"
          />
          <div class="invalid-feedback" v-if="!$v.password.required">
            Password is required.
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="mb-4">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="form-control"
            :class="{ 'is-invalid': $v.confirmPassword.$error }"
            placeholder="Repeat your password"
          />
          <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAsPassword">
            Passwords do not match.
          </div>
        </div>

        <!-- Register Button -->
        <button type="submit" class="btn btn-outline-success w-100 fw-semibold">
          Create Account
        </button>

        <!-- Optional: Login Link -->
        <div class="mt-3 text-center">
          <small class="text-muted">
            Already have an account?
            <router-link to="/login">Login</router-link>
          </small>
        </div>
      </form>
    </b-card>
  </b-container>
</template>

<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import axios from 'axios';
import store from '@/store';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const rules = {
  username: { required },
  password: { required },
  confirmPassword: { sameAsPassword: sameAs(password) },
};

const $v = useVuelidate(rules, { username, password, confirmPassword });

async function register() {
  $v.value.$touch();
  if (!$v.value.$invalid) {
    try {
      await axios.post(`${store.server_domain}/api/auth/register`, {
        username: username.value,
        password: password.value,
      });
      store.login(username.value);
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed. Username might already exist.');
    }
  }
}
</script>
