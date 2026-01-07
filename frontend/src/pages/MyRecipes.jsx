import React, { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { BsFillStopwatchFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

export default function MyRecipes() {
  const loadedRecipes = useLoaderData()
  const [recipes, setRecipes] = useState(loadedRecipes)

  const deleteRecipe = async (id) => {
    if (!window.confirm('Bu tarifi silmek istediğinize emin misiniz?')) return

    try {
      const token = localStorage.getItem('token')
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

await axios.delete(`${API_URL}/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRecipes(recipes.filter(r => r.id !== id))
      alert('Tarif silindi!')
    } catch (error) {
      alert('Silme hatası: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className='recipe'>
      <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#ff6b35' }}>Tariflerim</h2>
      <div className="card-container">
        {recipes?.length === 0 ? (
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>📝</div>
            <h3 style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>Henüz tarifiniz yok.</h3>
            <p>Kendi tariflerinizi ekleyerek başkalarıyla paylaşabilirsiniz.</p>
          </div>
        ) : (
          recipes?.map((recipe) => {
            const imageUrl = recipe.coverImage 
              ? `http://localhost:5000/uploads/${recipe.coverImage}`
              : '/foodRecipe.png'

            return (
              <div key={recipe.id} className="card">
                <img src={imageUrl} width="120" height="100" alt={recipe.title} onError={(e) => e.target.src = '/foodRecipe.png'} />
                <div className="card-body">
                  <div className="title">{recipe.title}</div>
                  <div className="icons">
                    <div className="timer">
                      <BsFillStopwatchFill /> {recipe.time || '30'} Dakika
                    </div>
                    <div className='action'>
                      <Link to={`/editRecipe/${recipe.id}`} className="editIcon">
                        <FaEdit />
                      </Link>
                      <MdDelete className="deleteIcon" onClick={() => deleteRecipe(recipe.id)} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}