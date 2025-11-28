import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
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
        <Route path="/" element={<App />} />
        <Route path="/forum" element={<App initialTab="forum" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
