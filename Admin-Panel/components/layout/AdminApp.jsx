import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Toast from '../ui/Toast';

// Pages
import Dashboard from '../../pages/DashBoard';
import ListBlogsPage from '../../pages/Blogs/ListBlogsPage';
import UserListPage from '../../pages/Users/UserListPage';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children }) => {
  const bypassAuth = true; // Ön izleme için auth'u atla
  const isAuthenticated = !!localStorage.getItem('admin_token');

  if (bypassAuth || isAuthenticated) {
    return children;
  }

  return <Navigate to="/admin-login" replace />;
};

/**
 * Admin Panel App (without BrowserRouter - used as sub-route)
 */
const AdminApp = () => {
  return (
    <>
      <Toast />
      <ProtectedRoute>
        <div className="admin-shell">
          <AdminSidebar />
          <main className="admin-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blogs" element={<ListBlogsPage />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default AdminApp;
