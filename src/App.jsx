import React, { useState } from 'react';
import './App.css';

// Bileşenleri İçe Aktarıyoruz (Import)
import Navbar from './components/Navbar';
import ProfileDrawer from './components/ProfileDrawer';
import Modal from './components/Modal';

// Sayfaları İçe Aktarıyoruz
import Home from './pages/Home';
import Sports from './pages/Sports';

function App() {
  // --- STATE YÖNETİMİ ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('haberler');
  
  // Modal State'leri
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // --- FONKSİYONLAR ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
  };

  const handleReservationClick = (facility, time) => {
    if (!isLoggedIn) {
      alert("Rezervasyon yapmak için lütfen önce giriş yapınız!");
      return;
    }
    setSelectedReservation({ facilityName: facility.name, time: time });
    setModalOpen(true);
  };

  const confirmReservation = () => {
    alert(`Başarılı! ${selectedReservation.facilityName} için saat ${selectedReservation.time} rezervasyonunuz oluşturuldu.`);
    setModalOpen(false);
    setSelectedReservation(null);
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
        
        {(activeTab === 'yemekhane' || activeTab === 'forum') && (
          <div style={{textAlign:'center', padding:'50px'}}>
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
          <strong>{selectedReservation?.facilityName}</strong> tesisi için 
          saat <strong>{selectedReservation?.time}</strong> dilimine rezervasyon yapmak üzeresiniz.
        </p>
      </Modal>

    </div>
  );
}

export default App;