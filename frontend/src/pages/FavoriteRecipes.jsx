import React, { useState } from 'react'
import { BsFillStopwatchFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

export default function FavoriteRecipes() {
  const [favItems, setFavItems] = useState(() => {
    return JSON.parse(localStorage.getItem('fav')) || []
  })

  const removeFavorite = (recipeId) => {
    const newFavs = favItems.filter(item => item.id !== recipeId)
    setFavItems(newFavs)
    localStorage.setItem('fav', JSON.stringify(newFavs))
    alert('❌ Favorilerden çıkarıldı!')
  }

  return (
    <div className='recipe'>
      <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#ff6b35' }}>Favorilerim</h2>
      <div className="card-container">
        {favItems.length === 0 ? (
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>💔</div>
            <h3 style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>Henüz favori tarifiniz yok</h3>
            <p>Beğendiğiniz tarifleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.</p>
          </div>
        ) : (
          favItems.map((recipe) => {
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
                    <FaHeart 
                      onClick={() => removeFavorite(recipe.id)}
                      style={{ color: '#ff0000', cursor: 'pointer' }} 
                    />
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