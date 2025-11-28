import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Toast from '../ui/Toast';

// Pages
import Dashboard from '../../pages/DashBoard';
import ListBlogsPage from '../../pages/Blogs/ListBlogsPage';
import UserListPage from '../../pages/Users/UserListPage';
import LoginPage from '../../pages/Auth/LoginPage';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children }) => {
  const bypassAuth = true; // Ön izleme için auth'u atla
  const isAuthenticated = !!localStorage.getItem('admin_token');

  if (bypassAuth || isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

/**
 * Admin Panel Main App
 * Router ve layout yapısı
 */
const App = () => {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes - Admin Panel */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <div className="admin-shell">
                <AdminSidebar />
                <main className="admin-main">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/blogs" element={<ListBlogsPage />} />
                    <Route path="/users" element={<UserListPage />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to admin dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
