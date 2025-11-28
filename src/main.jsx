import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import App, { SportsRoute } from './App.jsx';
import Home from './pages/Home.jsx';
import Forum from './pages/Forum.jsx';
import ForumPost from './pages/ForumPost.jsx';
import Cafeteria from './pages/Cafeteria.jsx';
import Profile from './pages/Profile.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import AdminApp from '../Admin-Panel/components/layout/AdminApp.jsx';
import LoginPage from '../Admin-Panel/pages/Auth/LoginPage.jsx';
import '../Admin-Panel/styles/admin.css';
import '../Admin-Panel/styles/auth.css';
import '../Admin-Panel/styles/toast.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminApp />} />

        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Home />} />
          <Route path="blogs/:id" element={<BlogDetail />} />
          <Route path="yemekhane" element={<Cafeteria />} />
          <Route path="spor" element={<SportsRoute />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum/:id" element={<ForumPost />} />
          <Route path="profil" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
