import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppState';

export default function AddSymptom() {
  const { addSymptom, showToast } = useApp();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [severity, setSeverity] = useState(2);
  const [notes, setNotes] = useState('');

  function save() {
    if (!name.trim()) return;
    addSymptom({ name, severity, date: 'Just now', notes });
    showToast('Your update has been recorded.');
    nav('/app/symptoms');
  }

  return (
    <div>
      <h2 style={{ fontSize: 19, marginBottom: 4 }}>How are you feeling?</h2>
      <div className="badge badge-blue" style={{ marginBottom: 16 }}>Patient-reported information — not a medical diagnosis.</div>
      <div className="card">
        <Field label="Symptom"><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mild headache" style={inputStyle} /></Field>
        <Field label={`Severity: ${severity}/5`}>
          <input type="range" min={1} max={5} value={severity} onChange={e => setSeverity(+e.target.value)} style={{ width: '100%' }} />
        </Field>
        <Field label="Notes"><textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={inputStyle} /></Field>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button className="btn btn-primary" onClick={save}>Save entry</button>
          <button className="btn" onClick={save}>Save &amp; share with my doctor</button>
        </div>
      </div>
    </div>
  );
}
const inputStyle: CSSProperties = { width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13.5, fontFamily: 'inherit' };
function Field({ label, children }: any) {
  return <div style={{ marginBottom: 14 }}><div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 5 }}>{label}</div>{children}</div>;
}
