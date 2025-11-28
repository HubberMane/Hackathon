import React from 'react';

const ProfileDrawer = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Kullanıcı Paneli</h3>
          <button onClick={onClose} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer'}}>X</button>
        </div>
        
        <div className="drawer-menu">
          <a href="#"> Profilim</a>
          <a href="#"> Bloglarım</a>
          <a href="#"> Ayarlar</a>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Çıkış Yap
        </button>
      </div>
    </>
  );
};

export default ProfileDrawer;