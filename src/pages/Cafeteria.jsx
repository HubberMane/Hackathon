import React, { useState } from 'react';

const KYK_MENU = [
  { day: 'Pazartesi', items: ['Mercimek Çorbası', 'Izgara Tavuk + Bulgur Pilavı', 'Mevsim Salata', 'Ayran'], calories: 820 },
  { day: 'Salı', items: ['Ezogelin Çorbası', 'Et Sote', 'Pirinç Pilavı', 'Yoğurt', 'Meyve'], calories: 910 },
  { day: 'Çarşamba', items: ['Domates Çorbası', 'Fırın Makarna', 'Patates Püresi', 'Cacık'], calories: 760 },
  { day: 'Perşembe', items: ['Tarhana Çorbası', 'Kuru Fasulye', 'Bulgur Pilavı', 'Salata', 'Ayran'], calories: 840 },
  { day: 'Cuma', items: ['Sebze Çorbası', 'Balık Izgara', 'Yeşil Salata', 'Limonata'], calories: 690 },
];

const GSB_MENU = [
  { day: 'Pazartesi', items: ['Ezogelin Çorbası', 'Tavuklu Sebze Sote', 'Pirinç Pilavı', 'Cacık'], calories: 780 },
  { day: 'Salı', items: ['Mercimek Çorbası', 'İzmir Köfte', 'Patates Püresi', 'Ayran'], calories: 860 },
  { day: 'Çarşamba', items: ['Tarhana Çorbası', 'Tavuk Fajita', 'Tortilla', 'Salata'], calories: 830 },
  { day: 'Perşembe', items: ['Sebze Çorbası', 'Etli Nohut', 'Bulgur Pilavı', 'Yoğurt'], calories: 800 },
  { day: 'Cuma', items: ['Domates Çorbası', 'Balık Tava', 'Roka Salata', 'Limonata'], calories: 720 },
];

const Cafeteria = () => {
  const [active, setActive] = useState('kyk');

  const menus = {
    kyk: KYK_MENU,
    gsb: GSB_MENU,
  };

  const activeMenu = menus[active] || KYK_MENU;

  return (
    <section className="cafeteria">
      <header className="cafeteria__header">
        <div >
          <p className="eyebrow">Yemekhane</p>
          <h1 >Haftalık Menüler</h1>
          <p  className="muted">
            Dengeli, doyurucu ve kampüs temposuna uyumlu menüler. Günlük kalori bilgileriyle birlikte
            sunulur.
          </p>
        </div>
        <div className="cafeteria__note">Servis 12:00 - 14:30 • Akşam 17:30 - 19:30</div>
      </header>

      <div style={{ display: 'flex', gap: '12px', margin: '10px 0 6px' }}>
        <button
          type="button"
          className={`tab-btn ${active === 'kyk' ? 'is-active' : ''}`}
          onClick={() => setActive('kyk')}
        >
          KYK Menüsü
        </button>
        <button
          type="button"
          className={`tab-btn ${active === 'gsb' ? 'is-active' : ''}`}
          onClick={() => setActive('gsb')}
        >
          GSB Menüsü
        </button>
      </div>

      <section style={{ display: 'grid', gap: '14px' }}>
        <div  className="cafeteria__grid">
          {activeMenu.map((menu) => (
            <article key={menu.day} className="cafeteria__card">
              <div className="cafeteria__card-top">
                <h3>{menu.day}</h3>
                <span className="cafeteria__calories">{menu.calories} kcal</span>
              </div>
              <ul className="cafeteria__list">
                {menu.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="cafeteria__footer">Afiyet olsun!</div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Cafeteria;
