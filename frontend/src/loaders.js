import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const recipesLoader = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipe`)
    return response.data
  } catch (error) {
    console.error('Tarifler yüklenemedi:', error)
    return []
  }
}

export const myRecipesLoader = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return []
    
    const response = await axios.get(`${API_URL}/recipe/my-recipes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    console.error('Tariflerim yüklenemedi:', error)
    return []
  }
}

export const recipeDetailLoader = async ({ params }) => {
  try {
    const response = await axios.get(`${API_URL}/recipe/${params.id}`)
    return response.data
  } catch (error) {
    console.error('Tarif detayı yüklenemedi:', error)
    return null
  }
}