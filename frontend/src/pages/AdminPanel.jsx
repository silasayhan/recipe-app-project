import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function AdminPanel() {
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [editMode, setEditMode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    fetchCategories()
    fetchUsers()
  }, [])

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`)
      setCategories(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Kategoriler Yüklenemedi:', error)
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Kullanıcılar Yüklenemedi:', error)
    }
  }

  const addCategory = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      await axios.post(`${API_URL}/categories`, newCategory, {
        headers: { Authorization: `Bearer ${token}` }
      })
      showMessage('Kategori Başarıyla Eklendi!', 'success')
      setNewCategory({ name: '', description: '' })
      fetchCategories()
    } catch (error) {
      showMessage('Hata: ' + (error.response?.data?.message || error.message), 'error')
    }
  }

  const updateCategory = async (id) => {
    const token = localStorage.getItem('token')
    const category = categories.find(c => c.id === id)

    try {
      await axios.put(`${API_URL}/categories/${id}`, {
        name: category.name,
        description: category.description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      showMessage('Kategori Başarıyla Güncellendi!', 'success')
      setEditMode(null)
      fetchCategories()
    } catch (error) {
      showMessage('Hata: ' + (error.response?.data?.message || error.message), 'error')
    }
  }

  const deleteCategory = async (id) => {
    if (!window.confirm('Bu Kategoriyi Silmek İstediğinize Emin Misiniz?')) return

    const token = localStorage.getItem('token')
    try {
      await axios.delete(`${API_URL}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      showMessage('Kategori Başarıyla Silindi!', 'success')
      fetchCategories()
    } catch (error) {
      showMessage('Hata: ' + (error.response?.data?.message || error.message), 'error')
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <h1>Admin Paneli</h1>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <section className="category-section">
          <h2>Kategori Ekle</h2>
          <form onSubmit={addCategory} className="category-form">
            <div className="category-input-group">
              <label>Kategori Adı</label>
              <input
                type="text"
                placeholder="Kategori Adı"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
              />
            </div>
            <div className="category-input-group">
              <label>Açıklama (Opsiyonel)</label>
              <input
                type="text"
                placeholder="Açıklama (Opsiyonel)"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <button type="submit" className="add-category-btn">Ekle</button>
          </form>
        </section>

        <section className="category-section">
          <h2>Kategoriler</h2>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="empty-state">
              <p>Henüz Kategori Eklenmemiş.</p>
            </div>
          ) : (
            <div className="categories-list">
              {categories.map(cat => (
                <div key={cat.id} className="category-card">
                  {editMode === cat.id ? (
                    <>
                      <div className="category-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Kategori Adı</label>
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => setCategories(categories.map(c => c.id === cat.id ? { ...c, name: e.target.value } : c))}
                        />
                      </div>
                      <div className="category-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Açıklama</label>
                        <input
                          type="text"
                          value={cat.description || ''}
                          onChange={(e) => setCategories(categories.map(c => c.id === cat.id ? { ...c, description: e.target.value } : c))}
                        />
                      </div>
                      <div className="category-actions">
                        <button onClick={() => updateCategory(cat.id)} className="edit-category-btn">Kaydet</button>
                        <button onClick={() => setEditMode(null)} className="delete-category-btn" style={{ background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' }}>İptal</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{cat.name}</h3>
                      <p>{cat.description || 'Açıklama Yok'}</p>
                      <div className="category-actions">
                        <button onClick={() => setEditMode(cat.id)} className="edit-category-btn">Düzenle</button>
                        <button onClick={() => deleteCategory(cat.id)} className="delete-category-btn">Sil</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="category-section">
          <h2>Kullanıcılar</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>E-Mail</th>
                  <th>Rol</th>
                  <th>Kayıt Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}