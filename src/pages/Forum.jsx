import React, { useState } from 'react';

// Örnek Forum Verileri
const INITIAL_POSTS = [
  {
    id: 1,
    title: "Bilgisayar Müh. 1. Sınıf Kaynak Önerisi",
    excerpt: "Arkadaşlar merhaba, C programlama için hangi kaynakları önerirsiniz? YouTube kanalı veya kitap tavsiyesi olan var mı?",
    author: "Ahmet Y.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet",
    date: "2 saat önce",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    tags: ["soru", "yazılım"],
    upvotes: 24,
    comments: 12
  },
  {
    id: 2,
    title: "Kayıp Kedi İlanı - Mühendislik Fakültesi",
    excerpt: "Turuncu sarman kedimizi fakülte önünde kaybettik. Görenlerin acil iletişime geçmesini rica ederim. Tasması mavi renkte.",
    author: "Ayşe K.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse",
    date: "5 saat önce",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&q=80",
    tags: ["kayip", "acil"],
    upvotes: 156,
    comments: 4
  },
  {
    id: 3,
    title: "Bahar Şenliği Konserleri Hakkında Düşünceler",
    excerpt: "Bu seneki lineup hakkında ne düşünüyorsunuz? Bence geçen seneye göre biraz sönük kalmış gibi.",
    author: "Mehmet T.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet",
    date: "1 gün önce",
    image: "https://images.unsplash.com/photo-1459749411177-260f11470c25?w=500&q=80",
    tags: ["etkinlik", "tartışma"],
    upvotes: 45,
    comments: 89
  },
  {
    id: 4,
    title: "Yemekhane Zamları",
    excerpt: "Gelecek aydan itibaren yemek ücretlerine %20 zam geleceği söyleniyor. Bu konuda bilgisi olan var mı?",
    author: "Zeynep B.",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep",
    date: "2 gün önce",
    image: null, // Görselsiz post örneği
    tags: ["duyuru", "yemekhane"],
    upvotes: 310,
    comments: 102
  }
];

const Forum = ({ onPostClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts] = useState(INITIAL_POSTS);

  // Arama filtresi
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '80vh', paddingBottom: '50px' }}>
      
      {/* 1. Üst Kısım: Başlık ve Arama */}
      <div style={{ backgroundColor: '#fff', padding: '40px 20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', margin: '0 0 20px 0', color: '#333' }}>Kampüs Forum</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Konu başlığı, etiket veya içerik ara..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Blog/Post Listesi */}
      <div className="forum-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="forum-card" onClick={() => onPostClick(post.id)}>
              
              {/* Görsel varsa göster, yoksa gösterme veya varsayılan koy */}
              {post.image && (
                <div className="forum-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              
              <div className="forum-content">
                {/* Etiketler */}
                <div className="forum-tags">
                  {post.tags.map((tag, idx) => (
                    // Tag rengini belirlemek için class ataması (örn: tag soru)
                    <span key={idx} className={`tag ${tag}`}>{tag}</span>
                  ))}
                </div>

                <h3 className="forum-title">{post.title}</h3>
                <p className="forum-excerpt">{post.excerpt}</p>

                <div className="forum-footer">
                  <div className="author-info">
                    <img src={post.authorAvatar} alt="avatar" className="author-avatar" />
                    <span>{post.author} • {post.date}</span>
                  </div>
                  <div className="interaction-stats">
                    <span>👍 {post.upvotes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#888' }}>
            <h3>Aradığınız kriterlere uygun konu bulunamadı.</h3>
          </div>
        )}
      </div>

    </div>
  );
};

export default Forum;