# Grandma's Recipes – Frontend (Vue.js)

Client-side implementation for the full-stack project **"Grandma's Recipes and More"**, developed as part of the Web Development Environments course.

## 👥 Developers

- **Noa Patchornik** – 319123048  
- **Yaki Naftali** – 318969177

## 📋 Overview

This Vue.js 3 + BootstrapVue application serves as the frontend of a recipe management platform.  
It allows users to **search**, **view**, **save**, and **create** recipes – including personal and family recipes – while communicating with an Express.js + MySQL backend.

The UI is designed with a pastel aesthetic using images to match the colors.

## 🎯 Key Features

- 🔐 User authentication: register, login, logout
- 🔎 Recipe search (with cuisine, diet, and intolerance filters)
- 📊 Sort search results by preparation time or popularity
- 💡 Live indicators: viewed and favorited
- 🧾 Detailed recipe view including ingredients & instructions
- 🧡 Favorite any recipe (API or user-generated)
- ✍️ Create personal and family recipes with a clean modal form
- 📜 Family recipe section with our family recipes and user-submitted
- 📂 Personal area with saved, created, and family recipes
- 🎥 Polished and responsive design with BootstrapVue & transitions
- 🍪 Session-based login using HTTP-only cookies

## 🔗 Backend Integration

The frontend uses `axios` to send HTTP requests to the backend server.  
You can run the app against:

- **Local backend**: `http://localhost:3000/api`
- **Production server**: `https://noa-yaki.cs.bgu.ac.il`

> Ensure the backend is up and running before launching the frontend.

## 🧪 Pages & Navigation

### Main Pages

- **Recipes** – Random recipes & recently viewed (home page)
- **Search** – Filtered search with sorting
- **Favorites** – Your favorite recipes
- **My Recipes** – Your custom added recipes
- **Family Recipes** – Includes our recipes & personal family recipes
- **About** – Team & project overview
- **Recipe View** – Full details for each recipe

### Navigation Bar

- Adapts dynamically based on login status
- User dropdown with:
  - ⭐ My Favorites
  - 🧾 My Recipes
  - 👨‍👩‍👧‍👦 My Family Recipes
- 📝 Create Recipe button opens modal form


## 🛠️ Project Setup
```
Install dependencies:
    `npm install`
Run development server:
    `npm run serve`
Build for production:
    `npm run build`
Lint and fix files:
    `npm run lint`
```

## 📦 Project structure
```
.
├── src/
│   ├── assets/                     # Static assets (images, background covers)
│   ├── components/                 # Reusable Vue components
│   │   └── CreateRecipeForm        
│   │   └── FamilyOverviewRecipe    # To show Our family recipe from data directory
│   │   └── LastWatchedRecipes      
│   │   └── RecipePreview           # To show preview of a recipe
│   │   └── RecipePreviewList       # To show 3 random recipes
│   │   └── SearchForm              
│   ├── data/                       # Local data files (JS)
│   ├── pages/                      # Page-level components
│   │   └── AboutPage               # About the project 
│   │   └── FamilyRecipesPage       
│   │   └── FavoriteRecipesPage      
│   │   └── LoginPage
│   │   └── MainPage                # The main page of the app
│   │   └── MyRecipePage        
│   │   └── NotFoundPage            # For error in the routing/ URL
│   │   └── PecipeViewPage          # Recipe page
│   │   └── RegisterPage
│   │   └── SearchPage
│   ├── router/             # Vue Router setup and routes
│   ├── scss/
│   ├── store.js            # store global state
│   ├── App.vue             # Main app shell component
│   └── main.js             # App initialization (Vue, router, store)
├── public/
├── package.json            # Project metadata & dependencies
└── README.md               # Project documentation 
```

