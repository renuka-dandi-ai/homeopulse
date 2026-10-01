import { useState } from 'react';
import { doctorPatients, patient as realPatient } from '../../data/mockData';
import { useApp } from '../../store/AppState';

export default function DoctorMessages() {
  const [active, setActive] = useState(doctorPatients[0].name);
  const { messages, addMessage, showToast } = useApp();
  const [text, setText] = useState('');
  const isRealPatient = active === realPatient.name; // only Meera Rao has a live two-way thread in this prototype
  const thread = isRealPatient ? messages : [];

  function send() {
    if (!text.trim()) return;
    if (isRealPatient) {
      addMessage({ from: 'doctor', text, time: 'Just now' });
    } else {
      showToast('Message sent to ' + active);
    }
    setText('');
  }

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 220 }}>
        {doctorPatients.map(p => (
          <div key={p.id} onClick={() => setActive(p.name)} className="card" style={{ marginBottom: 8, cursor: 'pointer', padding: 10, background: active === p.name ? 'var(--mint)' : '#fff' }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--sub)' }}>{p.lastUpdate}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>{active}</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14, minHeight: 160 }}>
          {thread.length === 0 && <div style={{ color: 'var(--sub)', fontSize: 13 }}>No conversation yet.</div>}
          {thread.map(m => (
            <div key={m.id} style={{ alignSelf: m.from === 'doctor' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
              <div style={{ background: m.from === 'doctor' ? 'var(--teal)' : 'var(--bg)', color: m.from === 'doctor' ? '#fff' : 'var(--text)', padding: '9px 13px', borderRadius: 14, fontSize: 13.5 }}>{m.text}</div>
              <div style={{ fontSize: 10.5, color: 'var(--sub)', marginTop: 3, textAlign: m.from === 'doctor' ? 'right' : 'left' }}>{m.time}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message…" style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)' }} />
          <button className="btn btn-primary" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
