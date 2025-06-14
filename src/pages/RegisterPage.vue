<template>
  <div class="register-page">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Username:</label>
        <input v-model="state.username" type="text" class="form-control" />
        <div v-if="v$.username.$error" class="text-danger">
          Username must be 3–8 letters only.
        </div>
      </div>

      <div class="form-group">
        <label>First Name:</label>
        <input v-model="state.firstName" type="text" class="form-control" />
        <div v-if="v$.firstName.$error" class="text-danger">
          First name is required.
        </div>
      </div>

      <div class="form-group">
        <label>Last Name:</label>
        <input v-model="state.lastName" type="text" class="form-control" />
        <div v-if="v$.lastName.$error" class="text-danger">
          Last name is required.
        </div>
      </div>

      <div class="form-group">
        <label>Country:</label>
        <select v-model="state.country" class="form-control">
          <option disabled value="">Select a country</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
        <div v-if="v$.country.$error" class="text-danger">
          Country is required.
        </div>
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="state.email" type="email" class="form-control" />
        <div v-if="v$.email.$error" class="text-danger">
          Valid email is required.
        </div>
      </div>

      <div class="form-group">
        <label>Password:</label>
        <div class="input-group">
          <input
            :type="state.showPassword ? 'text' : 'password'"
            v-model="state.password"
            class="form-control"
          />
          <button type="button" class="btn btn-outline-secondary" @click="state.showPassword = !state.showPassword">
            {{ state.showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <div v-if="v$.password.$error" class="text-danger">
          Password must be 5–10 characters, include a number and special char.
        </div>
      </div>

      <div class="form-group">
        <label>Confirm Password:</label>
        <div class="input-group">
          <input
            :type="state.showConfirmPassword ? 'text' : 'password'"
            v-model="state.confirmPassword"
            class="form-control"
          />
          <button type="button" class="btn btn-outline-secondary" @click="state.showConfirmPassword = !state.showConfirmPassword">
            {{ state.showConfirmPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <div v-if="v$.confirmPassword.$error" class="text-danger">
          Passwords must match.
        </div>
      </div>
     <button
        type="submit"
        class="btn btn-success mt-3"
        :disabled="!isFormComplete"
      >
        Register
      </button>
    </form>
  </div>
</template>


<script>
import { reactive, ref, onMounted } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  minLength,
  maxLength,
  helpers,
  email,
  sameAs,
} from '@vuelidate/validators';

export default {
  name: "RegisterPage",
  setup(_, { expose }) {
    const state = reactive({
      username: '',
      firstName: '',
      lastName: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    });

    const router = useRouter();
    const countries = ref([]);

    const isLettersOnly = helpers.regex(/^[A-Za-z]{3,8}$/);
    const isStrongPassword = helpers.regex(/^(?=.*[0-9])(?=.*[\W_]).{5,10}$/);

    const rules = {
      username: { required, isLettersOnly, minLength: minLength(3), maxLength: maxLength(8) },
      firstName: { required },
      lastName: { required },
      country: { required },
      email: { required, email },
      password: { required, isStrongPassword, minLength: minLength(5), maxLength: maxLength(10) },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(() => state.password),
      },
    };

    const v$ = useVuelidate(rules, state);
    const isFormComplete = computed(() => {
      return (
        state.username &&
        state.firstName &&
        state.lastName &&
        state.country &&
        state.email &&
        state.password &&
        state.confirmPassword
      );
    });
    const register = async () => {
      if (await v$.value.$validate()) {
        try {
          await window.axios.post('/api/auth/register', {
            username: state.username,
            firstName: state.firstName,
            lastName: state.lastName,
            country: state.country,
            email: state.email,
            password: state.password
          });
          window.toast("Registration Successful", "You can now login", "success");
          router.push('/login');
        } catch (err) {
          window.toast("Registration failed", err.response.data.message || "Try a different username", "danger");
        }
      }
    };

    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await res.json();

        if (Array.isArray(data)) {
          countries.value = data.map(c => c.name.common).sort();
        } else {
          console.error('Country API did not return an array:', data);
        }
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    };

    onMounted(fetchCountries);

    expose({ register });
    return { state, v$, register, countries, isFormComplete };
  }
};
</script>

<style scoped>
.register-page {
  max-width: 500px;
  margin: auto;
}
</style>