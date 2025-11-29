import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { fetchForumPosts } from '../services/api';

const Forum = () => {
  const { isLoggedIn } = useOutletContext() || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      const { data, error: fetchError } = await fetchForumPosts();
      if (ignore) return;

      if (fetchError) {
        setError('Forum gÇônderileri yÇüklenemedi. Backend baYlantŽñnŽñ kontrol edin.');
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

  const allPosts = useMemo(() => [...posts], [posts]);

  const tagOptions = useMemo(() => {
    const set = new Set();
    allPosts.forEach((p) => (p.tags || []).forEach((t) => set.add(t.toLowerCase())));
    return ['all', ...Array.from(set).sort()];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    const filtered = allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag =
        selectedTag === 'all' || (post.tags || []).map((t) => t.toLowerCase()).includes(selectedTag);
      return matchesSearch && matchesTag;
    });

    if (sortBy === 'likes') {
      return [...filtered].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }
    return [...filtered].sort((a, b) => String(b.id).localeCompare(String(a.id)));
  }, [searchTerm, selectedTag, sortBy, allPosts]);

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
        <div
          className="search-container"
          style={{
            display: 'grid',
            gap: '12px',
            justifyItems: 'center',
            width: '100%',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          <input
            type="text"
            placeholder="Konu basligi, etiket veya icerik ara..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', maxWidth: '720px' }}
          />
          <div
            style={{
              display: 'flex',
              gap: '30px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '100%',
              maxWidth: '720px',
            }}
          >
            <select
              className="search-input"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{ minWidth: '170px', maxWidth: '220px' }}
            >
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'TÇ¬m etiketler' : tag}
                </option>
              ))}
            </select>
            <select
              className="search-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ minWidth: '170px', maxWidth: '220px' }}
            >
              <option value="newest">En yeni</option>
              <option value="likes">En Çõok beŽYenilen</option>
            </select>
            <button
              className="save-btn"
              style={{ minWidth: '170px', whiteSpace: 'nowrap' }}
              onClick={() => navigate('/forum/olustur')}
              disabled={!isLoggedIn}
              title={!isLoggedIn ? 'GÇônderi oluYturmak iÇõin giriY yapŽñn' : undefined}
            >
              Yeni GÇônderi OluYtur
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="detail-card" style={{ margin: '0 20px 20px', background: '#fff5f5', border: '1px solid #fecdd3' }}>
          <p style={{ margin: 0, color: '#b91c1c' }}>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>GÇônderiler yÇükleniyor...</h3>
        </div>
      ) : (
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
                      <span>ƒ-ý {post.upvotes}</span>
                      <span>§Y'ª {post.comments}</span>
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
      )}
    </div>
  );
};

export default Forum;
