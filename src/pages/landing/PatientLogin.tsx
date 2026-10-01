import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthState';

export default function PatientLogin() {
  const { sendOtp, verifyOtp } = useAuth();
  const nav = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [devOtp, setDevOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  async function handleSend() {
    if (phone.trim().length < 6) { setError('Enter a valid phone number'); return; }
    setError(''); setBusy(true);
    try {
      const code = await sendOtp(phone.trim());
      setDevOtp(code); setSent(true); setCooldown(30);
      const timer = setInterval(() => setCooldown(c => { if (c <= 1) { clearInterval(timer); return 0; } return c - 1; }), 1000);
    } catch (e: any) { setError(e.message || 'Could not send OTP'); }
    finally { setBusy(false); }
  }

  async function handleVerify() {
    setError(''); setBusy(true);
    try { await verifyOtp(phone.trim(), otp.trim()); nav('/app'); }
    catch (e: any) { setError(e.message || 'Invalid OTP'); }
    finally { setBusy(false); }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="frame card" style={{ width: '100%', maxWidth: 380, margin: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>🩺 <b>HomeoPulse</b></div>

        {!sent ? (
          <>
            <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 5 }}>Phone number</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 52, padding: '9px 0', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--sub)' }}>+91</div>
              <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="98765 43210" style={inputStyle} />
            </div>
            {error && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 6 }}>{error}</div>}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} disabled={busy} onClick={handleSend}>{busy ? 'Sending…' : 'Send OTP'}</button>
          </>
        ) : (
          <>
            <div className="box" style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 10 }}>
              <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 8 }}>Enter the OTP sent to +91 {phone}</div>
              <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="6-digit code" maxLength={6} style={{ ...inputStyle, textAlign: 'center', letterSpacing: 4, fontSize: 18 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--sub)' }}>{cooldown > 0 ? `Resend in 00:${String(cooldown).padStart(2, '0')}` : <button className="btn-ghost" onClick={handleSend}>Resend OTP</button>}</span>
                <button className="btn-ghost" onClick={() => { setSent(false); setOtp(''); }}>Change number</button>
              </div>
              <div style={{ fontSize: 11, color: 'var(--sub2)', marginTop: 6 }}>Demo mode — OTP is <b>{devOtp}</b> (no real SMS is sent in this prototype).</div>
            </div>
            {error && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 8 }}>{error}</div>}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} disabled={busy || otp.length < 4} onClick={handleVerify}>{busy ? 'Verifying…' : 'Verify & Continue'}</button>
          </>
        )}
        <div className="note" style={{ marginTop: 12 }}>We'll never share your number. OTP is valid for 5 minutes.</div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12.5 }}><Link to="/" className="btn-ghost">Back to home</Link></div>
      </div>
    </div>
  );
}
const inputStyle: CSSProperties = { flex: 1, width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13.5, fontFamily: 'inherit' };
