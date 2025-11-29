import React, { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { forumPosts as fallbackForumPosts, loadUserPosts } from '../data/forumPosts';

const Forum = () => {
  const { isLoggedIn } = useOutletContext() || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [userPosts] = useState(loadUserPosts());
  const navigate = useNavigate();

  const allPosts = useMemo(
    () => [...userPosts, ...fallbackForumPosts],
    [userPosts]
  );

  const tagOptions = useMemo(() => {
    const set = new Set();
    allPosts.forEach((p) => p.tags.forEach((t) => set.add(t.toLowerCase())));
    return ['all', ...Array.from(set).sort()];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    const filtered = allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag === 'all' || post.tags.map((t) => t.toLowerCase()).includes(selectedTag);
      return matchesSearch && matchesTag;
    });

    if (sortBy === 'likes') {
      return [...filtered].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }
    // default newest: assume higher id means newer for base and user posts
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
                  {tag === 'all' ? 'Tüm etiketler' : tag}
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
              <option value="likes">En çok beğenilen</option>
            </select>
            <button
              className="save-btn"
              style={{ minWidth: '170px', whiteSpace: 'nowrap' }}
              onClick={() => navigate('/forum/olustur')}
              disabled={!isLoggedIn}
              title={!isLoggedIn ? 'Gönderi oluşturmak için giriş yapın' : undefined}
            >
              Yeni Gönderi Oluştur
            </button>
          </div>
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
