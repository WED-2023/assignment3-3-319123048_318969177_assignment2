<template>
  <div class="register-page container">
    <h1 class="mb-4">Register</h1>
    <form @submit.prevent="register">
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

      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          id="firstName"
          v-model="form.firstName"
          @input="v$.form.firstName.$touch()"
          :class="['form-control', validationState('firstName')]"
        />
        <template v-if="v$.form.firstName.$dirty && v$.form.firstName.$errors.length">
          <small v-for="err in v$.form.firstName.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          id="lastName"
          v-model="form.lastName"
          @input="v$.form.lastName.$touch()"
          :class="['form-control', validationState('lastName')]"
        />
        <template v-if="v$.form.lastName.$dirty && v$.form.lastName.$errors.length">
          <small v-for="err in v$.form.lastName.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <!-- Country -->
      <div class="form-group">
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

      <!-- Email -->
      <div class="form-group">
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
          <input type="checkbox" v-model="showPassword" /> Show password
        </div>
        <template v-if="v$.form.password.$dirty && v$.form.password.$errors.length">
          <small v-for="err in v$.form.password.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="form.confirmPassword"
          @input="v$.form.confirmPassword.$touch()"
          :class="['form-control', validationState('confirmPassword')]"
        />
        <div>
          <input type="checkbox" v-model="showConfirmPassword" /> Show confirm password
        </div>
        <template v-if="v$.form.confirmPassword.$dirty && v$.form.confirmPassword.$errors.length">
          <small v-for="err in v$.form.confirmPassword.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <button type="submit" class="btn btn-primary mt-3" :disabled="v$.form.$invalid">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed  } from 'vue';
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
        firstname: {
          required: helpers.withMessage("First name is required", required)
        },
        lastname: {
          required: helpers.withMessage("Last name is required", required)
        },
        country: {
          required: helpers.withMessage("Country is required", required)
        },
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
  max-width: 600px;
  margin: auto;
}
</style>
