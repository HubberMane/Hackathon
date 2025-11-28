import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumPosts } from '../data/forumPosts';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    return forumPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handlePostClick = (post) => {
    navigate(`/forum/${post.id}`, { state: { post } });
  };

  return (
    <div style={{ minHeight: '80vh', paddingBottom: '50px' }}>
      <div
        className="forum-hero"
        style={{
          backgroundColor: '#fff',
          padding: '40px 20px',
          borderBottom: '1px solid #eee',
          marginBottom: '20px',
        }}
      >
        <h1 className="forum-page-title">Kampus Forum</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Konu basligi, etiket veya icerik ara..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="forum-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
                    <span>▲ {post.upvotes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#888' }}>
            <h3>Aradiginiz kriterlere uygun konu bulunamadi.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
