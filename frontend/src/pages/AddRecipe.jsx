import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    ingredients: '',
    instructions: '',
    file: null,
    categoryIds: []
  })
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await axios.get(`${API_URL}/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error('Kategoriler Yüklenemedi:', error)
    }
  }

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] })
    } else if (e.target.name === 'categoryIds') {
      const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value))
      setFormData({ ...formData, categoryIds: selected })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Lütfen Giriş Yapın!')
      navigate('/')
      return
    }

    const data = new FormData()
    data.append('title', formData.title)
    data.append('time', formData.time)
    data.append('ingredients', formData.ingredients)
    data.append('instructions', formData.instructions)
    data.append('categoryIds', JSON.stringify(formData.categoryIds))
    if (formData.file) data.append('file', formData.file)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

await axios.post(`${API_URL}/recipe`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      alert('Tarif Eklendi!')
      navigate('/myRecipe')
    } catch (error) {
      alert('Hata: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className='add-recipe'>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Tarif Ekle</h2>
          <div className='form-header'></div>

          <div className='form-control'>
            <label>Başlık</label>
            <input type="text" name="title" className='input' value={formData.title} onChange={handleChange} required />
          </div>

          <div className='form-control'>
            <label>Zaman (Dakika)</label>
            <input type="text" name="time" className='input' placeholder="Örnek: 30" value={formData.time} onChange={handleChange} required />
          </div>

          <div className='form-control'>
            <label>Kategoriler (Birden fazla seçebilirsiniz.)</label>
            <select name="categoryIds" className='input' multiple value={formData.categoryIds} onChange={handleChange}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className='form-control'>
            <label>Malzemeler</label>
            <textarea name="ingredients" className='input-textarea' rows="5" placeholder="Her malzemeyi yeni satıra yazınız." value={formData.ingredients} onChange={handleChange} required />
          </div>

          <div className='form-control'>
            <label>Yapılış</label>
            <textarea name="instructions" className='input-textarea' rows="5" placeholder="Tarifin yapılışını yazınız." value={formData.instructions} onChange={handleChange} required />
          </div>

          <div className='form-control'>
            <label>Görsel</label>
            <input type="file" name="file" className='input' onChange={handleChange} accept="image/*" required />
          </div>

          <button type="submit">Tarif Ekle</button>
        </form>
      </div>
    </div>
  )
}