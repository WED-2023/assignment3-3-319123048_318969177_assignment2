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
          type="password"
          v-model="form.password"
          @input="v$.form.password.$touch()"
          :class="['form-control', validationState('password')]"
        />
        <template v-if="v$.form.password.$dirty && v$.form.password.$errors.length">
          <small v-for="err in v$.form.password.$errors" :key="err.$uid" class="text-danger">
            {{ err.$message }}
          </small>
        </template>
      </div>

      <button type="submit" class="btn btn-primary mt-3" :disabled="v$.form.$invalid">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();

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
          await axios.post(import.meta.env.server_domain + '/api/auth/login', {
            username: form.username,
            password: form.password
          });

          window.toast("Welcome!", "Login successful", "success");

          router.push('/main');
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          window.toast("Login failed", message, "danger");
          form.password = "";
          v$.value.form.password.$reset();
        }
      }
    };

    return {
      form,
      v$,
      validationState,
      login
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
