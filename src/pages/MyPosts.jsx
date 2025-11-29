import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchForumPosts } from '../services/api';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      const { data, error: fetchError } = await fetchForumPosts('scope=me');
      if (ignore) return;

      if (fetchError) {
        setError('GÇônderilerin getirilebilmesi iÇõin backend baYlantŽñ gerekli.');
        setPosts([]);
      } else {
        setPosts(Array.isArray(data) ? data : data?.posts || []);
        setError('');
      }
      setLoading(false);
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handlePostClick = (post) => {
    navigate(`/forum/${post.id}`, { state: { post } });
  };

  return (
    <div style={{ minHeight: '70vh', padding: '24px 20px 50px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>Forum</p>
          <h1 style={{ margin: '6px 0 4px' }}>OluYturduŽYum GÇônderiler</h1>
          <p className="muted" style={{ margin: 0 }}>Kendi paylaYŽñmlarŽñnŽñ burada yÇônet.</p>
        </div>
        <button className="save-btn" onClick={() => navigate('/forum')}>
          Foruma DÇôn
        </button>
      </header>

      {error && (
        <div className="detail-card" style={{ background: '#fff5f5', border: '1px solid #fecdd3', marginBottom: '10px' }}>
          <p style={{ margin: 0, color: '#b91c1c' }}>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>GÇônderiler yÇükleniyor...</h3>
        </div>
      ) : posts.length === 0 ? (
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>HenÇ¬z gÇônderi oluYturmadŽñn.</h3>
          <p className="muted">Backend baYlantŽñ geldiYinde kendi gÇônderilerin burada listelenecek.</p>
          <button className="save-btn" onClick={() => navigate('/forum')} style={{ marginTop: '10px' }}>
            GÇônderi OluYtur
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
                  {(post.tags || []).map((tag, idx) => (
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
                      {post.author} ƒ?½ {post.date}
                    </span>
                  </div>
                  <div className="interaction-stats">
                    <span>§Y'? {post.upvotes}</span>
                    <span>§Y'ª {post.comments}</span>
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
