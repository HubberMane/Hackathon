import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    { id: 1, title: "Günün Menüsü: Hünkar Beğendi", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" },
    { id: 2, title: "Spor Salonu Rezervasyonları Açıldı", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" },
    { id: 3, title: "Bahar Şenliği Tarihleri", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderData.length]);

  return (
    <div>
       <div className="hero-container">
          <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {sliderData.map((slide) => (
              <div key={slide.id} className="slide">
                <img src={slide.img} alt={slide.title} />
                <div className="slide-caption"><h2>{slide.title}</h2></div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{maxWidth: '1200px', margin: '30px auto 10px', padding: '0 20px', color: '#444'}}>Diğer Gelişmeler</h2>
        
        <div className="news-grid">
          {[1, 2, 3, 4].map((i) => (
             <div key={i} className="news-card">
              <div style={{height: '150px', background: '#ddd'}}>
                <img src={`https://picsum.photos/300/200?random=${i}`} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="" />
              </div>
              <div className="news-content">
                <h3>Kampüs Haber Başlığı {i}</h3>
                <p style={{color: '#666', fontSize: '0.9rem'}}>Antalya kampüsündeki gelişmelerden haberdar olun...</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Home;