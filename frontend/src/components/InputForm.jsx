import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  try {
    const url = isSignUp 
      ? `${API_URL}/signUp`
      : `${API_URL}/login`

      const response = await axios.post(url, { email, password })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Bir hata oluştu!')
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2>{isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
      <div className='form-header'></div>

      {error && <p className='error'>{error}</p>}

      <div className='form-control'>
        <label>E-Posta</label>
        <input
          type='email'
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className='form-control'>
        <label>Şifre</label>
        <input
          type='password'
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type='submit'>{isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}</button>
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Zaten hesabın var mı? Giriş yap.' : 'Hesap Oluştur'}
      </p>
    </form>
  )
}