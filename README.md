# Yemek Tarifleri Web Uygulaması

## Proje Açıklaması

Bu proje, kullanıcıların yemek tariflerini paylaşabildiği, kategorilere ayırabildiği ve yorum yapabildiği bir web uygulamasıdır.

## Teknolojiler

- **Frontend:** React + Vite
- **Backend:** NestJS
- **Veritabanı:** MySQL
- **Diğer:** Axios, React Router, Multer (Dosya Yükleme)

## Özellikler

- ✅ Kullanıcı Kayıt ve Giriş Sistemi (JWT)
- ✅ İki Rol: USER ve ADMIN
- ✅ Admin Panelİ: Sadece admin kullanıcılar erişebilir.
- ✅ Tarif Ekleme, Düzenleme, Silme (CRUD)
- ✅ Kategori Yönetimi (CRUD - Sadece Admin)
- ✅ Yorum Sistemi
- ✅ Favoriler Sistemi (localStorage)
- ✅ Görsel Yükleme

## Veritabanı İlişkileri

- **Bire-Çok:** User → Recipe, User → Comment, Recipe → Comment
- **Çoka-Çok:** Recipe ↔ Category

## Kurulum

### Backend Kurulumu

```bash
cd backend
npm install
# MySQL'de "recipe_db" veritabanını oluştur.
npm run start:dev
```

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

## Test Kullanıcıları

**Admin:**

- Email: admin@test.com
- Password: 12345

**Normal Kullanıcı:**

- Email: user@test.com
- Password: 12345

## Proje Görselleri

### 🏠 Ana Sayfa

<p align="center">
  <img src="images/homepage.png" width="400" />
  <img src="images/homepage-2.png" width="400" />
</p>

### 🔐 Giriş Ekranı

<p align="center">
  <img src="images/login.png" width="400" />
</p>

### 📝 Kayıt Olma Ekranı

<p align="center">
  <img src="images/sign-up.png" width="400" />
</p>

### ➕ Tarif Ekleme Sayfası

<p align="center">
  <img src="images/add-recipe.png" width="500" />
</p>

### ✏️ Tarifi Güncelleme Sayfası

<p align="center">
  <img src="images/edit-recipe.png" width="500" />
</p>

### 📋 Tariflerim Sayfası

<p align="center">
  <img src="images/my-recipe.png" width="500" />
</p>

### ⭐ Favoriler

<p align="center">
  <img src="images/favorites.png" width="500" />
</p>

### 🛠️ Admin Paneli

<p align="center">
  <img src="images/admin-panel.png" width="400" />
  <img src="images/admin-panel-2.png" width="400" />
</p>
