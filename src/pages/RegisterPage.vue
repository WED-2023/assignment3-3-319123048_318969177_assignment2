<template>
  <div class="register-page d-flex">
    
    <div class="form-section d-flex align-items-center justify-content-center w-50 p-5">
      <div class="card w-100 shadow p-4 rounded-4" style="max-width: 500px;">
        <h2 class="text-center mb-4">Register</h2>
        <form @submit.prevent="register">
          <!-- Name -->
          <div class="row">
            <div class="col">
              <div class="form-group mb-3">
                <label for="firstname">First Name</label>
                <input
                  id="firstname"
                  v-model="form.firstname"
                  @input="v$.form.firstname.$touch()"
                  :class="['form-control', validationState('firstname')]"
                />
                <template v-if="v$.form.firstname.$dirty && v$.form.firstname.$errors.length">
                  <small v-for="err in v$.form.firstname.$errors" :key="err.$uid" class="text-danger">
                    {{ err.$message }}
                  </small>
                </template>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-3">
                <label for="lastname">Last Name</label>
                <input
                  id="lastname"
                  v-model="form.lastname"
                  @input="v$.form.lastname.$touch()"
                  :class="['form-control', validationState('lastname')]"
                />
                <template v-if="v$.form.lastname.$dirty && v$.form.lastname.$errors.length">
                  <small v-for="err in v$.form.lastname.$errors" :key="err.$uid" class="text-danger">
                    {{ err.$message }}
                  </small>
                </template>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="form-group mb-3">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              @input="v$.form.email.$touch()"
              :class="['form-control', validationState('email')]"
            />
            <template v-if="v$.form.email.$dirty && v$.form.email.$errors.length">
              <small v-for="err in v$.form.email.$errors" :key="err.$uid" class="text-danger">
                {{ err.$message }}
              </small>
            </template>
          </div>

          <!-- Country -->
          <div class="form-group mb-3">
            <label for="country">Country</label>
            <select
              id="country"
              v-model="form.country"
              @change="v$.form.country.$touch()"
              :class="['form-control', validationState('country')]"
            >
              <option disabled value="">Select a country</option>
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
            <template v-if="v$.form.country.$dirty && v$.form.country.$errors.length">
              <small v-for="err in v$.form.country.$errors" :key="err.$uid" class="text-danger">
                {{ err.$message }}
              </small>
            </template>
          </div>

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

          <!-- Passwords -->
          <div class="row">
            <div class="col">
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
                  <label for="showPass" class="form-check-label">Show</label>
                </div>
                <template v-if="v$.form.password.$dirty && v$.form.password.$errors.length">
                  <small v-for="err in v$.form.password.$errors" :key="err.$uid" class="text-danger">
                    {{ err.$message }}
                  </small>
                </template>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-3">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  @input="v$.form.confirmPassword.$touch()"
                  :class="['form-control', validationState('confirmPassword')]"
                />
                <div class="form-check small">
                  <input type="checkbox" v-model="showConfirmPassword" class="form-check-input" id="showConfirm" />
                  <label for="showConfirm" class="form-check-label">Show</label>
                </div>
                <template v-if="v$.form.confirmPassword.$dirty && v$.form.confirmPassword.$errors.length">
                  <small v-for="err in v$.form.confirmPassword.$errors" :key="err.$uid" class="text-danger">
                    {{ err.$message }}
                  </small>
                </template>
              </div>
            </div>
          </div>

          <!-- Register button -->
          <div class="d-grid">
            <button type="submit" class="btn register-btn mt-2" :disabled="v$.form.$invalid">
              Register
            </button>
          </div>

        
        <div class="mt-4 text-center">
          <p> Have an account already?</p>
          <router-link to="/login" class="btn register-btn">
            Login
          </router-link>
        </div>
        </form>
      </div>
    </div>

    
    <div class="image-section w-50 position-relative d-none d-md-block">
      <img src="@/assets/register_cover.jpg" alt="Register Cover" class="w-100 h-100 object-fit-cover" />
      <div class="welcome-text position-absolute text-black text-center">
        <h1 class="display-4 fw-bold"> Welcome </h1>
        <p class="lead"> Recipes Website </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import store from '../store';
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
  helpers,
  alpha
} from '@vuelidate/validators';
import axios from 'axios';

export default {
  setup() {
    const form = reactive({
      username: '',
      firstname: '',
      lastname: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const countries = ref([]);
    const passwordValue = computed(() => form.password);
    const router = useRouter();
    const rules = {
      form: {
        username: {
          required: helpers.withMessage("Username is required", required),
          minLength: helpers.withMessage("Minimum 3 characters", minLength(3)),
          maxLength: helpers.withMessage("Maximum 8 characters", maxLength(8)),
          alpha: helpers.withMessage(" Letters only", alpha)
        },
        firstname: { required: helpers.withMessage("First name is required", required) },
        lastname: { required: helpers.withMessage("Last name is required", required) },
        country: { required: helpers.withMessage("Country is required", required) },
        email: {
          required: helpers.withMessage("Email is required", required),
          email: helpers.withMessage(" Must be a valid email", email)
        },
        password: {
          required: helpers.withMessage("Password is required", required),
          minLength: helpers.withMessage("Minimum 5 characters", minLength(5)),
          maxLength: helpers.withMessage("Maximum 10 characters", maxLength(10)),
          strong: helpers.withMessage(" Must contain number & special character", helpers.regex(/^(?=.*[0-9])(?=.*[\W_]).+$/))
        },
        confirmPassword: {
          required: helpers.withMessage("Confirmation is required", required),
          sameAsPassword: helpers.withMessage("Passwords do not match", sameAs(passwordValue))
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

    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await res.json();
        countries.value = data.map(c => c.name.common).sort();
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    const register = async () => {
      v$.value.form.$touch();
      if (!v$.value.form.$invalid) {
        try {
          await axios.post(`${store.server_domain}/api/auth/register`, {
            username: form.username,
            firstName: form.firstname,
            lastName: form.lastname,
            country: form.country,
            email: form.email,
            password: form.password
          });
          router.push('/login');
        } catch (err) {
          const serverMessage = err.response?.data?.message || "Try again";
          if (err.response?.status === 409 && serverMessage === "Username already exists") {
            alert("Registration failed: Username already exists");
            form.username = "";
            v$.value.form.username.$reset();
          } else {
            alert("Registration failed", serverMessage, "danger");
          }
        }
      }
    };

    onMounted(fetchCountries);

    return {
      form,
      countries,
      showPassword,
      showConfirmPassword,
      v$,
      register,
      validationState
    };
  }
};
</script>

<style scoped>
.register-page {
  height: 100vh;
  overflow: hidden;
}
.image-section {
  position: relative;
}
.image-section img {
  object-fit: cover;
}
.welcome-text {
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: black; 
}
.register-btn {
  background-color: #d7b0c6;
  color: black;
  border: 2px solid #d7b0c6;;
  transition: background-color 0.3s, border-color 0.3s;
}
.register-btn:hover {
  background-color: #d8a2c1;
  border-color: #d8a2c1;
}
.register-btn:disabled {
  opacity: 0.6;
  border: 2px solid rgb(167, 134, 152);
  cursor: not-allowed;
}
</style>
