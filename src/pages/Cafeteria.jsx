import React, { useState } from 'react';

const KYK_MENU = [
  {
    day: 'Pazartesi',
    breakfast: ['Zeytin - Peynir', 'Haşlanmış Yumurta', 'Domates - Salatalık', 'Çay', 'Ekmek'],
    items: ['Mercimek Çorbası', 'Izgara Tavuk + Bulgur Pilavı', 'Mevsim Salata', 'Ayran'],
    dinner: ['Yoğurt Çorbası', 'Fırın Köfte', 'Pirinç Pilavı', 'Mevsim Salata'],
    calories: 820,
  },
  {
    day: 'Salı',
    breakfast: ['Reçel', 'Beyaz Peynir', 'Siyah Zeytin', 'Çay', 'Ekmek'],
    items: ['Ezogelin Çorbası', 'Et Sote', 'Pirinç Pilavı', 'Yoğurt', 'Meyve'],
    dinner: ['Sebze Çorbası', 'Tavuk Sote', 'Bulgur Pilavı', 'Ayran'],
    calories: 910,
  },
  {
    day: 'Çarşamba',
    breakfast: ['Bal - Tereyağı', 'Kaşar Peynir', 'Domates - Salatalık', 'Çay', 'Ekmek'],
    items: ['Domates Çorbası', 'Fırın Makarna', 'Patates Püresi', 'Cacık'],
    dinner: ['Mercimek Çorbası', 'Etli Nohut', 'Pirinç Pilavı', 'Salata'],
    calories: 760,
  },
  {
    day: 'Perşembe',
    breakfast: ['Zeytin - Peynir', 'Menemen', 'Domates - Salatalık', 'Çay', 'Ekmek'],
    items: ['Tarhana Çorbası', 'Kuru Fasulye', 'Bulgur Pilavı', 'Salata', 'Ayran'],
    dinner: ['Yoğurt Çorbası', 'Izgara Köfte', 'Patates Püresi', 'Mevsim Salata'],
    calories: 840,
  },
  {
    day: 'Cuma',
    breakfast: ['Reçel', 'Yumurta', 'Zeytin - Peynir', 'Çay', 'Ekmek'],
    items: ['Sebze Çorbası', 'Balık Izgara', 'Yeşil Salata', 'Limonata'],
    dinner: ['Domates Çorbası', 'Tavuk Schnitzel', 'Pirinç Pilavı', 'Ayran'],
    calories: 690,
  },
];

const GSB_MENUS = {
  antalya: [
    { day: 'Pazartesi', items: ['Ezogelin Çorbası', 'Tavuklu Sebze Sote', 'Pirinç Pilavı', 'Cacık'], calories: 780 },
    { day: 'Salı', items: ['Mercimek Çorbası', 'İzmir Köfte', 'Patates Püresi', 'Ayran'], calories: 860 },
    { day: 'Çarşamba', items: ['Tarhana Çorbası', 'Tavuk Fajita', 'Tortilla', 'Salata'], calories: 830 },
    { day: 'Perşembe', items: ['Sebze Çorbası', 'Etli Nohut', 'Bulgur Pilavı', 'Yoğurt'], calories: 800 },
    { day: 'Cuma', items: ['Domates Çorbası', 'Balık Tava', 'Roka Salata', 'Limonata'], calories: 720 },
  ],
  izmir: [
    { day: 'Pazartesi', items: ['Mercimek Çorbası', 'Fırın Tavuk', 'Bulgur Pilavı', 'Ayran'], calories: 790 },
    { day: 'Salı', items: ['Domates Çorbası', 'Etli Taze Fasulye', 'Pirinç Pilavı', 'Cacık'], calories: 850 },
    { day: 'Çarşamba', items: ['Sebze Çorbası', 'Karnıyarık', 'Şehriyeli Pilav', 'Ayran'], calories: 840 },
    { day: 'Perşembe', items: ['Tarhana Çorbası', 'Izgara Köfte', 'Patates Püresi', 'Salata'], calories: 860 },
    { day: 'Cuma', items: ['Ezogelin Çorbası', 'Balık Izgara', 'Mevsim Salata', 'Limonata'], calories: 710 },
  ],
  ankara: [
    { day: 'Pazartesi', items: ['Ezogelin Çorbası', 'Tavuk Sote', 'Pirinç Pilavı', 'Yoğurt'], calories: 780 },
    { day: 'Salı', items: ['Mercimek Çorbası', 'Kuru Fasulye', 'Bulgur Pilavı', 'Salata'], calories: 820 },
    { day: 'Çarşamba', items: ['Tarhana Çorbası', 'Etli Nohut', 'Pirinç Pilavı', 'Ayran'], calories: 830 },
    { day: 'Perşembe', items: ['Sebze Çorbası', 'Tavuk Şinitzel', 'Patates Püresi', 'Mevsim Salata'], calories: 850 },
    { day: 'Cuma', items: ['Domates Çorbası', 'Izgara Köfte', 'Şehriyeli Pilav', 'Cacık'], calories: 840 },
  ],
};

const mealLabel = {
  breakfast: 'Kahvaltı',
  dinner: 'Akşam',
};

const Cafeteria = () => {
  const [active, setActive] = useState('kyk');
  const [meal, setMeal] = useState('breakfast');
  const [gsbCampus, setGsbCampus] = useState('antalya');
  const [kykDorm, setKykDorm] = useState('');

  const handleProviderChange = (provider) => {
    setActive(provider);
    if (provider === 'gsb') {
      setMeal('lunch'); // GSB tek öğün
    } else {
      setMeal('breakfast'); // KYK başlangıç
    }
  };

  const menus = { kyk: KYK_MENU, gsb: GSB_MENUS[gsbCampus] || GSB_MENUS.antalya };
  const activeMenu = menus[active] || KYK_MENU;

  return (
    <section className="cafeteria">
      <header className="cafeteria__header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px', margin: '6px 0 8px' }}>Haftalık Menüler</h1>
        <p className="muted" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '16px' }}>
          Dengeli, doyurucu ve kampüs temposuna uyumlu menüler. Günlük kalori bilgileriyle birlikte sunulur.
        </p>
        <p className="muted" style={{ marginTop: '8px', fontSize: '15px' }}>
          Servis 12:00 - 14:30 • Akşam 17:30 - 19:30
        </p>
      </header>

      <div style={{ display: 'flex', gap: '12px', margin: '10px 0 6px', justifyContent: 'center' }}>
        <button
          type="button"
          className={`tab-btn ${active === 'kyk' ? 'is-active' : ''}`}
          onClick={() => handleProviderChange('kyk')}
        >
          KYK Menüsü
        </button>
        <button
          type="button"
          className={`tab-btn ${active === 'gsb' ? 'is-active' : ''}`}
          onClick={() => handleProviderChange('gsb')}
        >
          GSB Menüsü
        </button>
      </div>

      {active === 'gsb' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <select
            value={gsbCampus}
            onChange={(e) => setGsbCampus(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              minWidth: '240px',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            <option value="antalya">GSB Antalya</option>
            <option value="izmir">GSB İzmir</option>
            <option value="ankara">GSB Ankara</option>
          </select>
        </div>
      )}

      {active === 'kyk' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <select
              value={kykDorm}
              onChange={(e) => setKykDorm(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                minWidth: '240px',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              <option value="">KYK Yurdunu seçiniz</option>
              <option value="yurt-1">KYK Yurt 1</option>
              <option value="yurt-2">KYK Yurt 2</option>
              <option value="yurt-3">KYK Yurt 3</option>
            </select>
          </div>

          {kykDorm && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '12px' }}>
              <button
                type="button"
                className={`tab-btn ${meal === 'breakfast' ? 'is-active' : ''}`}
                onClick={() => setMeal('breakfast')}
              >
                Kahvaltı
              </button>
              <button
                type="button"
                className={`tab-btn ${meal === 'dinner' ? 'is-active' : ''}`}
                onClick={() => setMeal('dinner')}
              >
                Akşam
              </button>
            </div>
          )}
        </>
      )}

      <section style={{ display: 'grid', gap: '14px' }}>
        <div className="cafeteria__grid">
          {activeMenu.map((menu) => {
            const selected =
              active === 'gsb'
                ? menu.items
                : !kykDorm
                ? []
                : meal === 'breakfast'
                ? menu.breakfast
                : meal === 'dinner'
                ? menu.dinner
                : menu.items;

            const label = active === mealLabel[meal];

            return (
              <article key={menu.day} className="cafeteria__card">
                <div className="cafeteria__card-top">
                  <h3>{menu.day}</h3>
                  <span className="cafeteria__calories">{menu.calories} kcal</span>
                </div>

                {(!selected || selected.length === 0) ? (
                  <p className="muted" style={{ margin: '6px 0 4px' }}>{label} menüsü mevcut değil.</p>
                ) : (
                  <>
                    <p className="muted" style={{ margin: '6px 0 4px', fontWeight: 700 }}>{label}</p>
                    <ul className="cafeteria__list">
                      {selected.map((item, idx) => (
                        <li key={`${active}-${meal}-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="cafeteria__footer">Afiyet olsun!</div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Cafeteria;
