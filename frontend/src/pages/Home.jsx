import React, { useState } from 'react'
import { useLoaderData, useNavigate, Link } from 'react-router-dom'
import { BsFillStopwatchFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
  const recipes = useLoaderData()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [favItems, setFavItems] = useState(() => {
    return JSON.parse(localStorage.getItem('fav')) || []
  })

  const addRecipe = () => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/addRecipe')
    } else {
      setIsOpen(true)
    }
  }

  const toggleFavorite = (recipe) => {
    const isFav = favItems.some(item => item.id === recipe.id)
    let newFavs
    
    if (isFav) {
      newFavs = favItems.filter(item => item.id !== recipe.id)
      alert('❌ Favorilerden çıkarıldı!')
    } else {
      newFavs = [...favItems, recipe]
      alert('❤️ Favorilere eklendi!')
    }
    
    setFavItems(newFavs)
    localStorage.setItem('fav', JSON.stringify(newFavs))
  }

  return (
    <>
      <section className="home">
        <div className='left'>
          <h1>Yemek Tarifleri</h1>
          <h5>MUTFAĞINIZI KEŞFEDİN, LEZZETLERİ PAYLAŞIN!</h5>
          <button onClick={addRecipe}>Tarifini Paylaş!</button>
        </div>
        <div className='right'>
          <img src="/foodRecipe.png" width="320px" height="300px" alt="Food" />
        </div>
      </section>

      <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffd5b8" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>

      {isOpen && <Modal onClose={() => setIsOpen(false)}><InputForm onSuccess={() => window.location.reload()} /></Modal>}

      <div className='recipe'>
        <div className="card-container">
          {recipes?.map((recipe) => {
            
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

            const imageUrl = recipe.coverImage 
              ? `${API_URL}/uploads/${recipe.coverImage}`
              : '/foodRecipe.png'
            
            const isFavorite = favItems.some(item => item.id === recipe.id)

            return (
              <div key={recipe.id} className="card">
                <Link to={`/recipe/${recipe.id}`}>
                  <img 
                    src={imageUrl} 
                    width="120" 
                    height="100" 
                    alt={recipe.title} 
                    onError={(e) => {
                      e.target.src = '/foodRecipe.png'
                    }} 
                  />
                </Link>
                <div className="card-body">
                  <div className="title">{recipe.title}</div>
                  <div className="icons">
                    <div className="timer">
                      <BsFillStopwatchFill /> {recipe.time || '30'} Dakika
                    </div>
                    <FaHeart 
                        className="favorite-heart"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(recipe);
                        }}
                        style={{ 
                            color: isFavorite ? '#ff0000' : '#ff6b35',
                            cursor: 'pointer',
                            transform: isFavorite ? 'scale(1.2)' : 'scale(1)',
                            zIndex: 10,
                            position: 'relative',
                        }} 
                        title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                        />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}