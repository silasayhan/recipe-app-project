import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function RecipeDetail() {
  const recipe = useLoaderData()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ content: '', rating: 5 })
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/comments/recipe/${recipe.id}`)
      setComments(response.data)
    } catch (error) {
      console.error('Yorumlar Yüklenemedi:', error)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Yorum Yapmak İçin Giriş Yapmalısınız!')
      return
    }

    try {
      await axios.post(`${API_URL}/comments`, {
        recipeId: recipe.id,
        content: newComment.content,
        rating: parseInt(newComment.rating)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Yorum Eklendi!')
      setNewComment({ content: '', rating: 5 })
      fetchComments()
    } catch (error) {
      alert('Hata: ' + (error.response?.data?.message || error.message))
    }
  }

  const deleteComment = async (commentId) => {
    if (!window.confirm('Bu Yorumu Silmek İstediğinize Emin Misiniz?')) return

    const token = localStorage.getItem('token')
    try {
      await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Yorum Silindi!')
      fetchComments()
    } catch (error) {
      alert('Hata: ' + (error.response?.data?.message || error.message))
    }
  }

  const imageUrl = recipe.coverImage 
  ? `${API_URL}/uploads/${recipe.coverImage}`
  : '/foodRecipe.png'

  return (
    <div className="recipe-detail-container">
      <img 
        src={imageUrl} 
        alt={recipe.title} 
        onError={(e) => e.target.src = '/foodRecipe.png'} 
      />
      
      <h1>{recipe.title}</h1>
      <p><strong>Süre:</strong> {recipe.time || '30'} Dakika</p>
      <p><strong>Kategoriler:</strong> {recipe.categories?.map(c => c.name).join(', ') || 'Yok'}</p>
      
      <h3>Malzemeler:</h3>
      <p>{recipe.ingredients}</p>
      
      <h3>Yapılış:</h3>
      <p>{recipe.instructions}</p>

      <div className="comments-section">
        <h3>Yorumlar ({comments.length})</h3>
        
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>
            Henüz Yorum Yapılmamış. İlk Yorumu Sen Yap!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <p>
                <strong>{comment.user?.email || 'Anonim'}</strong> - {comment.rating} ⭐
              </p>
              <p>{comment.content}</p>
              <small>
                {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </small>
              {user && user.id === comment.user?.id && (
                <button 
                  onClick={() => deleteComment(comment.id)} 
                  className="delete-comment-btn"
                >
                  Sil
                </button>
              )}
            </div>
          ))
        )}

        {user ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <h4>Yorum Yap</h4>
            <textarea
              placeholder="Yorumunuz..."
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              required
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ color: '#ff6b35', fontWeight: '500' }}>
                Puan:
                <select 
                  value={newComment.rating} 
                  onChange={(e) => setNewComment({ ...newComment, rating: e.target.value })}
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                </select>
              </label>
              <button type="submit">Gönder</button>
            </div>
          </form>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            backgroundColor: '#fff9f5', 
            borderRadius: '10px',
            border: '2px solid #ffe8cc',
            marginTop: '2rem'
          }}>
            <p style={{ color: '#ff6b35', fontWeight: '500', marginBottom: '1rem' }}>
              Yorum Yapmak İçin Giriş Yapmalısınız
            </p>
            <button 
              onClick={() => window.location.href = '/'} 
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                color: 'white',
                border: 'none',
                padding: '0.7rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px'
              }}
            >
              Giriş Yap
            </button>
          </div>
        )}
      </div>
    </div>
  )
}