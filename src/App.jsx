import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ProfileDrawer from './components/ProfileDrawer';
import Modal from './components/Modal';
import Sports from './pages/Sports';

const tabFromPath = (pathname) => {
  if (pathname.startsWith('/spor')) return 'spor';
  if (pathname.startsWith('/yemekhane')) return 'yemekhane';
  if (pathname.startsWith('/forum')) return 'forum';
  if (pathname.startsWith('/profil')) return 'profil';
  if (pathname.startsWith('/blogs')) return 'haberler';
  return 'haberler';
};

function App() {
  const location = useLocation();
  const activeTab = tabFromPath(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

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

  useEffect(() => {
    const cls = 'dark-mode';
    if (darkMode) {
      document.body.classList.add(cls);
      document.documentElement.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
      document.documentElement.classList.remove(cls);
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <main>
        <Outlet context={{ onReserveClick: handleReservationClick }} />
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

export const SportsRoute = () => {
  const { onReserveClick } = useOutletContext();
  return <Sports onReserveClick={onReserveClick} />;
};

export default App;
