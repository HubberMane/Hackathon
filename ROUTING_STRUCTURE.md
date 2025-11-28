# Routing Yapısı

## Web Uygulaması (Vite)

### Ana Rota Yapısı
```
/ (Root)
├── /                 → Kullanıcı girişi (UserLogin)
├── /register         → Kullanıcı kayıt (UserRegister)
├── /admin-login      → Admin girişi (AdminLogin)
└── /admin/*          → Admin panel (korumalı)
    ├── /admin/       → Dashboard
    ├── /admin/blogs  → Blog yönetimi
    └── /admin/users  → Kullanıcı yönetimi
```

## Dosya Yapısı

### Kullanıcı Sayfaları
- `src/App.jsx` - Ana router
- `src/pages/UserLogin.jsx` - Kullanıcı girişi
- `src/pages/UserRegister.jsx` - Kullanıcı kayıt
- `src/styles/auth.css` - Paylaşılan auth stilleri

### Admin Panel
- `Admin-Panel/components/layout/AdminApp.jsx` - Admin router (alt-rota)
- `Admin-Panel/pages/Auth/LoginPage.jsx` - Admin girişi
- `Admin-Panel/pages/DashBoard.jsx` - Admin dashboard
- `Admin-Panel/pages/Blogs/ListBlogsPage.jsx` - Blog listesi
- `Admin-Panel/pages/Users/UserListPage.jsx` - Kullanıcı listesi

## Auth Token Yönetimi

### Kullanıcı Token
- Key: `user_token`
- Storage: localStorage
- API: `/api/users/*`

### Admin Token
- Key: `admin_token`
- Storage: localStorage
- API: `/api/admin/*`

## Protected Routes

### Admin Panel
- Tüm `/admin/*` rotaları korumalı
- Token yoksa → `/admin-login` yönlendirir
- 401 hatası → Toast gösterir + `/admin-login` yönlendirir

## Mobile Uygulama (Expo)

Mobile uygulama ayrı bir entry point kullanır:
- Entry: `App.js` (Expo)
- Router: `public/navigation/AppNavigator.js`
- Ekranlar: `public/screens/*`

## Development

### Web Uygulaması Çalıştırma
```bash
npm run dev
```
Port: http://localhost:5173

### Mobile Uygulama Çalıştırma
```bash
npm start
```

## URL Örnekleri

- Ana sayfa: `http://localhost:5173/`
- Kayıt ol: `http://localhost:5173/register`
- Admin giriş: `http://localhost:5173/admin-login`
- Admin panel: `http://localhost:5173/admin`
- Blog yönetimi: `http://localhost:5173/admin/blogs`
- Kullanıcı yönetimi: `http://localhost:5173/admin/users`
