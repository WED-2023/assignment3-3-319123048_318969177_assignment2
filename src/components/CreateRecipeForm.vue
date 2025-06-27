<template>
  <form @submit.prevent="submitRecipe">
    <div class="form-group mb-3">
      <label>Title *</label>
      <input v-model="form.title" @input="v$.form.title.$touch()" :class="['form-control', validationState('title')]" />
    </div>

    <div class="form-group mb-3">
      <label>Image URL *</label>
      <input v-model="form.image" @input="v$.form.image.$touch()" type="url" :class="['form-control', validationState('image')]" />
    </div>

    <div class="form-group mb-3">
      <label>Preparation Time (minutes) *</label>
      <input v-model.number="form.readyInMinutes" @input="v$.form.readyInMinutes.$touch()" type="number" min="1" :class="['form-control', validationState('readyInMinutes')]" />
    </div>

    <div class="form-group mb-3">
      <label>Servings *</label>
      <input v-model.number="form.servings" @input="v$.form.servings.$touch()" type="number" min="1" :class="['form-control', validationState('servings')]" />
    </div>

    <div class="mb-3">
      <label>Ingredients *</label>
      <div v-for="(ingredient, index) in form.ingredients" :key="'ing' + index" class="row g-2 mb-2 align-items-center">
        <div class="col-md-5">
          <input v-model="ingredient.name" class="form-control" placeholder="Name" required />
        </div>
        <div class="col-md-3">
          <input type="number" v-model.number="ingredient.amount" class="form-control" placeholder="Amount" step="any" required />
        </div>
        <div class="col-md-3">
          <input v-model="ingredient.unit" class="form-control" placeholder="Unit" required />
        </div>
        <div class="col-md-1">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="removeIngredient(index)">×</button>
        </div>
      </div>
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="addIngredient" :disabled="!canAddIngredient">+ Add Ingredient</button>
    </div>

    <div class="mb-3">
      <label>Instructions *</label>
      <div v-for="(step, index) in instructionsList" :key="'step' + index" class="row g-2 mb-2 align-items-center">
        <div class="col-md-11">
          <input v-model="instructionsList[index]" class="form-control" placeholder="Step" required />
        </div>
        <div class="col-md-1">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="removeInstruction(index)">×</button>
        </div>
      </div>
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="addInstruction" :disabled="!canAddInstruction">+ Add Step</button>
    </div>

    <div class="form-check form-switch mb-2">
      <input class="form-check-input" type="checkbox" v-model="form.isvegetarian" id="vegetarian" />
      <label class="form-check-label" for="vegetarian">Vegetarian</label>
    </div>

    <div class="form-check form-switch mb-2">
      <input class="form-check-input" type="checkbox" v-model="form.isvegan" id="vegan" />
      <label class="form-check-label" for="vegan">Vegan</label>
    </div>

    <div class="form-check form-switch mb-4">
      <input class="form-check-input" type="checkbox" v-model="form.isglutenFree" id="glutenFree" />
      <label class="form-check-label" for="glutenFree">Gluten-Free</label>
    </div>

    <div class="form-check form-switch mb-2">
      <input class="form-check-input" type="checkbox" v-model="form.isFamily" id="isFamily" />
      <label class="form-check-label" for="isFamily">Family Recipe</label>
    </div>

    <div v-if="form.isFamily" class="mb-2">
      <label>Family Member</label>
      <input v-model="form.familyMember" type="text" class="form-control" />
    </div>

    <div v-if="form.isFamily" class="mb-3">
      <label>Occasion</label>
      <input v-model="form.occusion" type="text" class="form-control" />
    </div>

    <button type="submit" class="btn btn-primary w-100 mt-3" :disabled="v$.$invalid">
      Save Recipe
    </button>
  </form>
</template>


<script setup>
import { reactive, computed } from 'vue';
import { required, helpers, minValue, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import store from '../store';
import axios from 'axios';

const emit = defineEmits(['saved']);

const form = reactive({
  title: '',
  image: '',
  readyInMinutes: 1,
  servings: 1,
  isvegan: false,
  isvegetarian: false,
  isglutenFree: false,
  isFamily: false,
  familyMember: '',
  occusion: '',
  popularity: 0,
  ingredients: [{ name: '', amount: null, unit: '' }]
});

const instructionsList = reactive(['']);

const rules = {
  form: {
    title: { required: helpers.withMessage('Title is required', required) },
    image: {
      required: helpers.withMessage('Image URL is required', required),
      url: helpers.withMessage('Must be a valid URL', url)
    },
    readyInMinutes: { required, minValue: minValue(1) },
    servings: { required, minValue: minValue(1) }
  }
};

const v$ = useVuelidate(rules, { form });

const validationState = (field) => {
  const control = v$.value.form[field];
  if (control?.$dirty) {
    return control.$errors.length > 0 ? 'is-invalid' : 'is-valid';
  }
  return '';
};

const addIngredient = () => {
  form.ingredients.push({ name: '', amount: null, unit: '' });
};

const removeIngredient = (index) => {
  form.ingredients.splice(index, 1);
};

const canAddIngredient = computed(() => {
  const last = form.ingredients.at(-1);
  return last?.name?.trim() && !isNaN(last.amount) && last.unit?.trim();
});

const addInstruction = () => {
  instructionsList.push('');
};

const removeInstruction = (index) => {
  instructionsList.splice(index, 1);
};

const canAddInstruction = computed(() => {
  return instructionsList.at(-1)?.trim();
});

const submitRecipe = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  const instructions = instructionsList.filter(i => i.trim());

  const body = {
    title: form.title,
    image: form.image,
    readyInMinutes: form.readyInMinutes,
    servings: form.servings,
    popularity: form.popularity,
    isvegan: form.isvegan ? 1 : 0,
    isvegetarian: form.isvegetarian ? 1 : 0,
    isglutenFree: form.isglutenFree ? 1 : 0,
    isFamily: form.isFamily ? 1 : 0,
    familyMember: form.isFamily ? form.familyMember : null,
    occusion: form.isFamily ? form.occusion : null,
    ingredients: form.ingredients.filter(i => i.name && !isNaN(i.amount) && i.unit),
    instructions
  };

  try {
    await axios.post(`${store.server_domain}/api/users/my_recipes`, body);
    alert("Recipe saved successfully!");
    emit('saved');

    // איפוס הטופס
    Object.assign(form, {
      title: '',
      image: '',
      readyInMinutes: 1,
      servings: 1,
      isvegan: false,
      isvegetarian: false,
      isglutenFree: false,
      isFamily: false,
      familyMember: '',
      occusion: '',
      popularity: 0,
      ingredients: [{ name: '', amount: null, unit: '' }]
    });
    instructionsList.splice(0, instructionsList.length, '');

    v$.value.$reset();

  } catch (err) {
    const serverMessage = err.response?.data?.message || "Try again";
    if (err.response?.status === 400) {
      alert("Submission failed: Invalid recipe format");
    } else if (err.response?.status === 401) {
      alert("Please login to create a recipe.");
    } else {
      alert("Submission failed: " + serverMessage);
    }
  }
};
</script>

<style scoped>

form {
  background-color: #fff7fa;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* שדות טופס */
.form-control {
  border-radius: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid #deb8c4;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  border-color: #d48ea9;
  box-shadow: 0 0 0 0.2rem rgba(212, 142, 169, 0.2);
}

/* שדות שגויים */
.is-invalid {
  border-color: #dc3545 !important;
}

.is-valid {
  border-color: #198754 !important;
}

/* תוויות */
label {
  font-weight: 500;
  color: #333;
}

/* כפתורים */
button.btn {
  border-radius: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

/* כפתורי הוספה */
button.btn-outline-secondary {
  color: #d48ea9;
  border-color: #d48ea9;
}
button.btn-outline-secondary:hover {
  background-color: #f8e6ec;
  border-color: #d48ea9;
}

/* כפתור שמירה */
button.btn-primary {
  background-color: #d48ea9;
  border-color: #d48ea9;
}
button.btn-primary:hover {
  background-color: #c77495;
  border-color: #c77495;
}

/* כפתור מחיקה */
button.btn-outline-danger {
  border-radius: 50%;
  padding: 0.25rem 0.55rem;
}
</style>