import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from './Modal'
import InputForm from './InputForm'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleAuth = () => {
    if (user) {
      localStorage.clear()
      window.location.href = '/'
    } else {
      setIsOpen(true)
    }
  }

  const handleProtectedClick = (e) => {
    if (!user) {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <>
      <header>
        <h2>Yemek Tarifleri</h2>
        <ul>
          <li><NavLink to="/">Ana Menü</NavLink></li>
          <li onClick={handleProtectedClick}>
            <NavLink to="/myRecipe">Tariflerim</NavLink>
          </li>
          <li onClick={handleProtectedClick}>
            <NavLink to="/favRecipe">Favorilerim</NavLink>
          </li>
          {user?.role === 'admin' && (
            <li><NavLink to="/admin">Admin Panel</NavLink></li>
          )}
          <li onClick={handleAuth}>
            <p className='login'>
              {user ? `Çıkış (${user.email})` : 'Giriş'}
            </p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm onSuccess={() => window.location.reload()} />
        </Modal>
      )}
    </>
  )
}