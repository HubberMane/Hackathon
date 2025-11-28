import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = blogs.slice(0, 3);
  
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
              <Link key={slide.id} className="slide" to={`/blogs/${slide.id}`} state={{ blog: slide }}>
                <img src={slide.cover} alt={slide.title} />
                <div className="slide-caption"><h2>{slide.title}</h2></div>
              </Link>
            ))}
          </div>
        </div>

        <h2 style={{maxWidth: '1200px', margin: '30px auto 10px', padding: '0 20px', color: '#444'}}>Diğer Gelişmeler</h2>
        
        <div className="news-grid">
          {blogs.map((blog) => (
             <Link key={blog.id} className="news-card" to={`/blogs/${blog.id}`} state={{ blog }}>
              <div style={{height: '150px', background: '#ddd'}}>
                <img src={blog.cover} style={{width:'100%', height:'100%', objectFit:'cover'}} alt={blog.title} />
              </div>
              <div className="news-content">
                <h3>{blog.title}</h3>
                <p style={{color: '#666', fontSize: '0.9rem'}}>{blog.summary}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default Home;
