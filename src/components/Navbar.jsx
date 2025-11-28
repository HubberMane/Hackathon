import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ activeTab, isLoggedIn, setIsLoggedIn, onOpenDrawer, darkMode, onToggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div
        className="nav-brand"
        style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', cursor: 'pointer' }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          KampüsPortal
        </Link>
      </div>

      <div className="nav-links">
        <Link className={`nav-item ${activeTab === 'haberler' ? 'active' : ''}`} to="/blogs">Haberler</Link>
        <Link className={`nav-item ${activeTab === 'yemekhane' ? 'active' : ''}`} to="/yemekhane">Yemekhane</Link>
        <Link className={`nav-item ${activeTab === 'spor' ? 'active' : ''}`} to="/spor">Spor Tesisleri</Link>
        <Link className={`nav-item ${activeTab === 'forum' ? 'active' : ''}`} to="/forum">Forum</Link>
        <Link className={`nav-item ${activeTab === 'profil' ? 'active' : ''}`} to="/profil">Profil</Link>
      </div>

      <div className="nav-auth" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button className="login-btn" style={{ padding: '8px 12px' }} onClick={onToggleDarkMode}>
          {darkMode ? '☀️ Aydınlık' : '🌙 Gece'}
        </button>
        {isLoggedIn ? (
          <button className="profile-pic-btn" onClick={onOpenDrawer}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profil" />
          </button>
        ) : (
          <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
            Giriş Yap
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
