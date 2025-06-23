<template>
  <div class="login-page container">
    <h1 class="mb-4">Login</h1>
    <form @submit.prevent="login">
      <!-- Username -->
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="form.username"
          @input="v$.form.username.$touch()"
          :class="['form-control', validationState('username')]"
        />
        <template v-if="v$.form.username.$dirty && v$.form.username.$errors.length">
          <small v-for="err in v$.form.username.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          @input="v$.form.password.$touch()"
          :class="['form-control', validationState('password')]"
        />
        <div>
          <input type="checkbox" v-model="showPassword" /> Show Password
        </div>
        <template v-if="v$.form.password.$dirty && v$.form.password.$errors.length">
          <small v-for="err in v$.form.password.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <!-- Error Message -->
      <div v-if="loginError" class="alert alert-danger mt-2">
        One or more fields are incorrect. Please try again.
      </div>

      <button type="submit" class="btn btn-primary mt-3" :disabled="v$.form.$invalid">
        Login
      </button>
    </form>

    <!-- Register Prompt -->
    <div class="mt-4 text-start">
      <p> Don't have an account yet ?</p>
      <router-link to="/register" class="btn btn-primary mt-3">
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive, ref  } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import store from '../store';
import { required, minLength, helpers } from '@vuelidate/validators';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const loginError = ref(false);
    const showPassword = ref(false);
    const form = reactive({
      username: '',
      password: ''
    });

    const rules = {
      form: {
        username: {
          required: helpers.withMessage("Username is required", required),
          minLength: helpers.withMessage("Minimum 3 characters", minLength(3))
        },
        password: {
          required: helpers.withMessage("Password is required", required),
          minLength: helpers.withMessage("Minimum 5 characters", minLength(5))
        }
      }
    };

    const v$ = useVuelidate(rules, { form });

    const validationState = (field) => {
      const control = v$.value.form[field];
      if (control.$dirty) {
        return control.$errors.length > 0 ? 'is-invalid' : 'is-valid';
      }
      return '';
    };

    const login = async () => {
      v$.value.form.$touch();
      if (!v$.value.form.$invalid) {
        try {
          await axios.post(`${store.server_domain}/api/auth/login`, {
            username: form.username,
            password: form.password
          });
          store.login(form.username);
          
        router.push('/');
        } catch (err) {
          loginError.value = true;
          const message = err.response?.data?.message || "Login failed";
          alert("Login failed: One or more fields are incorrect", message, "danger");
          form.password = "";
          v$.value.form.password.$reset();
        }
      }
    };

    return {
      form,
      v$,
      validationState,
      login,
      showPassword,
      loginError,
    };
  }
};
</script>

<style scoped>
.login-page {
  max-width: 500px;
  margin: auto;
}
</style>
