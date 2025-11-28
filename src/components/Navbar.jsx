import React from 'react';

const Navbar = ({ activeTab, setActiveTab, isLoggedIn, setIsLoggedIn, onOpenDrawer }) => {
  return (
    <nav className="navbar">
      <div 
        className="nav-brand" 
        style={{fontSize: '24px', fontWeight: 'bold', color: '#333', cursor:'pointer'}}
        onClick={() => setActiveTab('haberler')}
      >
        KampüsPortal
      </div>
      
      <div className="nav-links">
        <a onClick={() => setActiveTab('haberler')} className={`nav-item ${activeTab === 'haberler' ? 'active' : ''}`} href="#">Haberler</a>
        <a onClick={() => setActiveTab('yemekhane')} className={`nav-item ${activeTab === 'yemekhane' ? 'active' : ''}`} href="#">Yemekhane</a>
        <a onClick={() => setActiveTab('spor')} className={`nav-item ${activeTab === 'spor' ? 'active' : ''}`} href="#">Spor Tesisleri</a>
        <a onClick={() => setActiveTab('forum')} className={`nav-item ${activeTab === 'forum' ? 'active' : ''}`} href="#">Forum</a>
      </div>

      <div className="nav-auth">
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
