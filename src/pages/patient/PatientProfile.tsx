import { useApp } from '../../store/AppState';
import { useAuth } from '../../store/AuthState';
import { useNavigate } from 'react-router-dom';
import { patient } from '../../data/mockData';

export default function PatientProfile() {
  const { simpleMode, setSimpleMode } = useApp();
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const displayName = user?.name || patient.name;
  return (
    <div>
      <h2 style={{ fontSize: 19, marginBottom: 16 }}>Profile</h2>
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 999, background: 'var(--mint)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
          {displayName.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>{displayName}</div>
          <div style={{ color: 'var(--sub)', fontSize: 12.5 }}>Phone: +91 {user?.phone} · Doctor: {patient.doctor}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <Row label="Notifications" value="On" />
        <Row label="Quiet hours" value="10 PM – 7 AM" />
        <Row label="Caregiver" value="Not set up" />
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>Simple Mode</div>
          <div style={{ color: 'var(--sub)', fontSize: 12 }}>Larger text, fewer taps — for older adults.</div>
        </div>
        <button className={`btn ${simpleMode ? 'btn-primary' : ''}`} onClick={() => setSimpleMode(!simpleMode)}>{simpleMode ? 'On' : 'Off'}</button>
      </div>

      <button className="btn btn-danger" style={{ width: '100%' }} onClick={() => { logout(); nav('/'); }}>Log out</button>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}><span style={{ color: 'var(--sub)' }}>{label}</span><span>{value}</span></div>;
}
