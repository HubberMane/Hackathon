import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/dashboard.css';

const navItems = [
  { path: '/dashboard', label: 'Ana Sayfa' },
  { path: '/dashboard/places', label: 'Spor Tesisleri' },
  { path: '/dashboard/events', label: 'Etkinlikler' },
  { path: '/dashboard/forum', label: 'Forum' },
  { path: '/dashboard/profile', label: 'Profil' },
];

const UserTopBar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header__content">
          <div className="dashboard-logo">
            <span className="logo-icon">HB</span>
            <span className="logo-text">Hubber</span>
          </div>
          <nav className="dashboard-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="avatar-button" onClick={() => setDrawerOpen(true)}>
            <span role="img" aria-label="profile">👤</span>
          </button>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <aside className="drawer">
            <div className="drawer__header">
              <div className="avatar-circle" style={{ width: 60, height: 60 }}>
                👤
              </div>
              <div>
                <p className="drawer__title">Profil</p>
                <p className="drawer__subtitle">Hubber</p>
              </div>
            </div>
            <div className="drawer__links">
              <Link to="/dashboard/profile" onClick={() => setDrawerOpen(false)}>Profil</Link>
              <button className="drawer__link" disabled>Ayalar (yakında)</button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default UserTopBar;
