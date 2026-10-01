import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthState';

export default function DoctorSettings() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Settings</h2>
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}>Signed in as <b>{user?.name}</b> · +91 {user?.phone}</div>
        {['Profile & credentials', 'Notification preferences', 'Availability', 'Practice details', 'Security'].map(s => (
          <div key={s} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}>{s}</div>
        ))}
      </div>
      <button className="btn btn-danger" onClick={() => { logout(); nav('/'); }}>Log out</button>
    </div>
  );
}
