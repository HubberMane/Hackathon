import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../services/api';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sliderData = useMemo(() => blogs.slice(0, 3), [blogs]);
  
  useEffect(() => {
    let ignore = false;

    const loadBlogs = async () => {
      setLoading(true);
      const { data, error: fetchError } = await fetchBlogs();
      if (ignore) return;

      if (fetchError) {
        setError('Haberler yÇüklenirken bir sorun oluYtu. LÇ¬tfen daha sonra tekrar deneyin.');
        setBlogs([]);
      } else {
        setBlogs(Array.isArray(data) ? data : data?.blogs || []);
        setError('');
      }
      setLoading(false);
    };

    loadBlogs();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (sliderData.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderData.length]);

  if (loading) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Haberler yÇükleniyor...</h2>
        <p className="muted">LÇ¬tfen bekleyin.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>Haberler getirilemedi</h2>
        <p className="muted">{error}</p>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="detail-card" style={{ textAlign: 'center' }}>
        <h2>HenÇ¬z haber bulunmuyor</h2>
        <p className="muted">Backend baYlantŽñ geldikten sonra burada gÇüncel haberleri gÇûreceksiniz.</p>
      </div>
    );
  }

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
