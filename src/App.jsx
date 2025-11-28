import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import ProfileDrawer from './components/ProfileDrawer';
import Modal from './components/Modal';

import Home from './pages/Home';
import Sports from './pages/Sports';
import Forum from './pages/Forum';

function App({ initialTab = 'haberler' }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
  };

  const handleReservationClick = (facility, time) => {
    if (!isLoggedIn) {
      alert('Rezervasyon yapmak için lütfen önce giriş yapınız!');
      return;
    }
    setSelectedReservation({ facilityName: facility.name, time });
    setModalOpen(true);
  };

  const confirmReservation = () => {
    alert(`Başarılı! ${selectedReservation.facilityName} için saat ${selectedReservation.time} rezervasyonunuz oluşturuldu.`);
    setModalOpen(false);
    setSelectedReservation(null);
  };

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
    alert(`Post #${postId} detayları yakında eklenecek.`);
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <main>
        {activeTab === 'haberler' && <Home />}

        {activeTab === 'spor' && <Sports onReserveClick={handleReservationClick} />}

        {activeTab === 'forum' && (
          <Forum onPostClick={handlePostClick} />
        )}

        {activeTab === 'yemekhane' && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Bu sayfa yapım aşamasında...</h2>
            <p>Çok yakında hizmetinizde.</p>
          </div>
        )}
      </main>

      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={handleLogout}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmReservation}
        title="Rezervasyon Onayı"
      >
        <p>
          <strong>{selectedReservation?.facilityName}</strong> tesisi için saat{' '}
          <strong>{selectedReservation?.time}</strong> dilimine rezervasyon yapmak üzeresiniz.
        </p>
      </Modal>
    </div>
  );
}

export default App;
