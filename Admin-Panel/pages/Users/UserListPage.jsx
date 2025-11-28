import React, { useEffect, useState } from 'react';
import adminAPI from '../../api/admin';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/Dialog';
import { Ban, UserCheck } from 'lucide-react';

const USE_MOCK = true;
const MOCK_USERS = [
  { id: 1, username: 'ayse.demir', email: 'ayse@hubber.app', role: 'user', is_banned: false, created_at: '2024-08-01' },
  { id: 2, username: 'emre.kaya', email: 'emre@hubber.app', role: 'user', is_banned: true, created_at: '2024-08-18' },
  { id: 3, username: 'selin.ak', email: 'selin@hubber.app', role: 'moderator', is_banned: false, created_at: '2024-07-10' },
];

/**
 * User List Page
 * Kullanıcı yönetimi - ban/unban
 */
const UserListPage = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [banDialog, setBanDialog] = useState({ open: false, user: null, action: 'ban' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    if (USE_MOCK) {
      setUsers(MOCK_USERS);
      setLoading(false);
      return;
    }

    try {
      const data = await adminAPI.getUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Kullanıcılar yüklenemedi, mock veriye düşüldü:', error);
      setUsers(MOCK_USERS);
    } finally {
      setLoading(false);
    }
  };

  const handleBanAction = async () => {
    try {
      if (!banDialog.user) return;
      if (!USE_MOCK) {
        if (banDialog.action === 'ban') {
          await adminAPI.banUser(banDialog.user.id);
        } else {
          await adminAPI.unbanUser(banDialog.user.id);
        }
        await loadUsers();
      } else {
        // mock güncelleme
        setUsers((prev) =>
          prev.map((u) =>
            u.id === banDialog.user.id ? { ...u, is_banned: banDialog.action === 'ban' } : u
          )
        );
      }
    } catch (error) {
      console.error('İşlem başarısız:', error);
    } finally {
      setBanDialog({ open: false, user: null, action: 'ban' });
    }
  };

  const filtered = users.filter((user) =>
    [user.username, user.email, user.role].some((field) =>
      (field || '').toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Kullanıcılar</p>
          <h1>Kullanıcı Yönetimi</h1>
          <p className="muted">Ban / unban işlemleri ve rol görünümü.</p>
        </div>
        <div className="input-search">
          <input
            type="text"
            placeholder="İsme veya emaile göre ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="card card--center">
          <p className="muted">Yükleniyor...</p>
        </div>
      ) : (
        <div className="card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı Adı</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead className="is-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="is-strong">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'warning' : 'default'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_banned ? 'danger' : 'success'}>
                      {user.is_banned ? 'Banlı' : 'Aktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString('tr-TR')
                      : '-'}
                  </TableCell>
                  <TableCell className="is-right">
                    {user.role !== 'admin' && (
                      <Button
                        variant={user.is_banned ? 'primary' : 'danger'}
                        size="sm"
                        onClick={() =>
                          setBanDialog({
                            open: true,
                            user,
                            action: user.is_banned ? 'unban' : 'ban',
                          })
                        }
                      >
                        {user.is_banned ? (
                          <>
                            <UserCheck size={14} />
                            <span className="btn__gap">Banı Kaldır</span>
                          </>
                        ) : (
                          <>
                            <Ban size={14} />
                            <span className="btn__gap">Banla</span>
                          </>
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Ban/Unban Confirmation Dialog */}
      <Dialog
        open={banDialog.open}
        onOpenChange={(open) => setBanDialog({ open, user: null, action: 'ban' })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {banDialog.action === 'ban' ? 'Kullanıcıyı Banla' : 'Banı Kaldır'}
            </DialogTitle>
            <DialogDescription>
              {banDialog.action === 'ban'
                ? `${banDialog.user?.username} kullanıcısını banlamak istediğinden emin misin?`
                : `${banDialog.user?.username} kullanıcısının banını kaldırmak istediğinden emin misin?`}
            </DialogDescription>
          </DialogHeader>
          <div className="dialog__actions">
            <Button variant="outline" onClick={() => setBanDialog({ open: false, user: null, action: 'ban' })}>
              İptal
            </Button>
            <Button
              variant={banDialog.action === 'ban' ? 'danger' : 'primary'}
              onClick={handleBanAction}
            >
              {banDialog.action === 'ban' ? 'Banla' : 'Banı Kaldır'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserListPage;
