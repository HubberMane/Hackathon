import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// User Pages
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import PlacesPage from './pages/PlacesPage';
import EventsPage from './pages/EventsPage';
import ForumPage from './pages/ForumPage';
import ProfilePage from './pages/ProfilePage';

// Admin Panel
import AdminApp from '../Admin-Panel/components/layout/AdminApp';
import AdminLogin from '../Admin-Panel/pages/Auth/LoginPage';

const BYPASS_USER_AUTH = true; // Ön izleme için kullanıcı auth'unu atla

/**
 * Protected Route for User Dashboard
 */
const UserProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user_token');

  if (BYPASS_USER_AUTH || isAuthenticated) {
    return children;
  }

  return <Navigate to="/" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public User Routes */}
        <Route
          path="/"
          element={BYPASS_USER_AUTH ? <Navigate to="/dashboard" replace /> : <UserLogin />}
        />
        <Route path="/register" element={<UserRegister />} />

        {/* Protected User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/dashboard/places"
          element={
            <UserProtectedRoute>
              <PlacesPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <UserProtectedRoute>
              <EventsPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/dashboard/forum"
          element={
            <UserProtectedRoute>
              <ForumPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <UserProtectedRoute>
              <ProfilePage />
            </UserProtectedRoute>
          }
        />

        {/* Admin Login (Separate from admin panel) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
