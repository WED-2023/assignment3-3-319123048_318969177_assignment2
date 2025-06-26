<template>
  <div class="login-page d-flex">
    <!-- Image Section (Left) -->
    <div class="image-section w-50 d-none d-md-block">
      <div class="image-wrapper">
        <div class="welcome-text text-black text-center px-3 py-2">
          <h1 class="fw-bold">Welcome Back</h1>
          <p class="lead">It's a pleasure to see you again!</p>
        </div>
      </div>
    </div>


    <!-- Form Section (Right) -->
    <div class="form-section w-50 p-5 d-flex justify-content-center">
      <div class="card w-100 login-card shadow p-4 rounded-4" style="max-width: 500px;">
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="login">
          <!-- Username -->
          <div class="form-group mb-3">
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
          <div class="form-group mb-3">
            <label for="password">Password</label>
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              @input="v$.form.password.$touch()"
              :class="['form-control', validationState('password')]"
            />
            <div class="form-check small">
              <input type="checkbox" v-model="showPassword" class="form-check-input" id="showPass" />
              <label for="showPass" class="form-check-label">Show Password</label>
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

          <!-- Login Button -->
          <div class="d-grid">
            <button type="submit" class="btn login-btn mt-2" :disabled="v$.form.$invalid">
              Login
            </button>
          </div>
        </form>

        <!-- Register Prompt -->
        <div class="mt-4 text-center">
          <p>Don't have an account yet?</p>
          <router-link to="/register" class="btn login-btn">
            Register
          </router-link>
        </div>
      </div>
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
  height: 100vh;
  overflow: hidden;
}
.image-section {
  position: relative;
  height: 100vh;
  background-image: url('@/assets/login_cover.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain; 
  background-color: #fff; 
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.welcome-text {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.7); 
  border-radius: 12px;
}
.login-btn {
  background-color: #d7b0c6;
  color: black;
  border: 2px solid #d7b0c6;;
  transition: background-color 0.3s, border-color 0.3s;
}
.login-btn:hover {
  background-color: #d8a2c1;
  border-color: #d8a2c1;
}
.login-btn:disabled {
  opacity: 0.6;
  border: 2px solid #d7b0c6;
  cursor: not-allowed;
}
.login-card {
  margin-top: 5px;; 
}
</style>
