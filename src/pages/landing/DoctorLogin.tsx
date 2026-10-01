import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthState';

export default function DoctorLogin() {
  const { loginDoctor } = useAuth();
  const nav = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    setError(''); setBusy(true);
    try { await loginDoctor(phone.trim(), password); nav('/doctor'); }
    catch (e: any) { setError(e.message || 'Login failed'); }
    finally { setBusy(false); }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="card" style={{ width: '100%', maxWidth: 380, margin: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>🩺 <b>HomeoPulse</b> — Doctor</div>

        <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 5 }}>Phone number</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          <div style={{ width: 52, padding: '9px 0', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--sub)' }}>+91</div>
          <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="98765 00000" style={inputStyle} />
        </div>

        <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 5 }}>Password</div>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" style={{ ...inputStyle, width: '100%' }} />

        {error && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 8 }}>{error}</div>}
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 14 }} disabled={busy} onClick={handleLogin}>{busy ? 'Signing in…' : 'Continue'}</button>

        <div className="note" style={{ marginTop: 12 }}>Your credentials were issued during HomeoPulse verification. Contact admin if you've lost access.</div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12.5 }}><Link to="/" className="btn-ghost">Back to home</Link></div>
      </div>
    </div>
  );
}
const inputStyle = { flex: 1, width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13.5, fontFamily: 'inherit' } as const;
