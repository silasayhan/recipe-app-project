import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './App.css'
import Home from './pages/Home'
import MyRecipes from './pages/MyRecipes'
import FavoriteRecipes from './pages/FavoriteRecipes'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import AdminPanel from './pages/AdminPanel'
import RecipeDetail from './pages/RecipeDetail'
import { recipesLoader, myRecipesLoader, recipeDetailLoader } from './loaders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home />, loader: recipesLoader },
      { path: 'myRecipe', element: <MyRecipes />, loader: myRecipesLoader },
      { path: 'favRecipe', element: <FavoriteRecipes /> },
      { path: 'addRecipe', element: <AddRecipe /> },
      { path: 'editRecipe/:id', element: <EditRecipe /> },
      { path: 'admin', element: <AdminPanel /> },
      { path: 'recipe/:id', element: <RecipeDetail />, loader: recipeDetailLoader },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)