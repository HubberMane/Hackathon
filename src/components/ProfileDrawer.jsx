import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDrawer = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  const handleNavigate = () => {
    onClose();
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Kullanıcı Paneli</h3>
          <button onClick={onClose} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer'}}>X</button>
        </div>
        
        <div className="drawer-menu">
          <Link to="/profil" onClick={handleNavigate}>Profilim</Link>
          <Link to="/blogs" onClick={handleNavigate}>Postlarım</Link>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Çıkış Yap
        </button>
      </div>
    </>
  );
};

export default ProfileDrawer;
