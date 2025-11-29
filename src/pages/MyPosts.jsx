import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadUserPosts } from '../data/forumPosts';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(loadUserPosts());
  }, []);

  const handlePostClick = (post) => {
    navigate(`/forum/${post.id}`, { state: { post } });
  };

  return (
    <div style={{ minHeight: '70vh', padding: '24px 20px 50px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Forum</p>
          <h1 style={{ margin: '6px 0 4px' }}>Oluşturduğum Gönderiler</h1>
          <p className="muted" style={{ margin: 0 }}>Kendi paylaşımlarını burada yönet.</p>
        </div>
        <button className="save-btn" onClick={() => navigate('/forum')}>
          Foruma Dön
        </button>
      </header>

      {posts.length === 0 ? (
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>Henüz gönderi oluşturmadın.</h3>
          <p className="muted">Forum sayfasından yeni bir konu açabilirsin.</p>
          <button className="save-btn" onClick={() => navigate('/forum')} style={{ marginTop: '10px' }}>
            Gönderi Oluştur
          </button>
        </div>
      ) : (
        <div className="forum-grid">
          {posts.map((post) => (
            <div key={post.id} className="forum-card" onClick={() => handlePostClick(post)}>
              {post.image && (
                <div className="forum-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}

              <div className="forum-content">
                <div className="forum-tags">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="forum-title">{post.title}</h3>
                <p className="forum-excerpt">{post.excerpt}</p>

                <div className="forum-footer">
                  <div className="author-info">
                    <img src={post.authorAvatar} alt="avatar" className="author-avatar" />
                    <span>
                      {post.author} • {post.date}
                    </span>
                  </div>
                  <div className="interaction-stats">
                    <span>👍 {post.upvotes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
