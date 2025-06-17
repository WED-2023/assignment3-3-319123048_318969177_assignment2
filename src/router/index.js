import Main from "../pages/MainPage.vue";
import NotFound from "../pages/NotFoundPage.vue";
import AboutPage from "../pages/AboutPage.vue";
import FavoriteRecipesPage from "../pages/FavoriteRecipesPage.vue";
import MyRecipesPage from "../pages/MyRecipePage.vue";
import FamilyRecipesPage from "../pages/FamilyRecipesPage.vue";

import Register from "../pages/RegisterPage.vue"
import login from "../pages/LoginPage.vue";
import search from "../pages/SearchPage.vue";
import recipe from "../pages/RecipeViewPage.vue";



const routes = [
  { path: "/", name: "main", component: Main, },
  { path: "/register", name: "register", component: Register,},
  { path: "/login", name: "login", component: login, },
  { path: "/search", name: "search", component: search, },
  { path: "/recipe/:recipeId", name: "recipe", component: recipe, },
  { path: "/:catchAll(.*)", name: "notFound", component: NotFound, },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/favorites', name: 'favorites', component: FavoriteRecipesPage },
  { path: '/my-recipes', name: 'myRecipes', component: MyRecipesPage },
  { path: '/family', name: 'familyRecipes', component: FamilyRecipesPage },
];

export default routes;
