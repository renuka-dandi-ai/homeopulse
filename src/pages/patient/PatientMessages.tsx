import { useState } from 'react';
import { useApp } from '../../store/AppState';
import { patient } from '../../data/mockData';
import { Send } from 'lucide-react';

export default function PatientMessages() {
  const { messages, addMessage } = useApp();
  const [text, setText] = useState('');
  function send() {
    if (!text.trim()) return;
    addMessage({ from: 'patient', text, time: 'Just now' });
    setText('');
  }
  return (
    <div>
      <h2 style={{ fontSize: 19, marginBottom: 4 }}>{patient.doctor}</h2>
      <div style={{ color: 'var(--sub)', fontSize: 12, marginBottom: 14 }}>Messages are for care-team communication and do not replace urgent medical care.</div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14, minHeight: 200 }}>
        {messages.map(m => (
          <div key={m.id} style={{ alignSelf: m.from === 'patient' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
            <div style={{ background: m.from === 'patient' ? 'var(--teal)' : 'var(--bg)', color: m.from === 'patient' ? '#fff' : 'var(--text)', padding: '9px 13px', borderRadius: 14, fontSize: 13.5 }}>{m.text}</div>
            <div style={{ fontSize: 10.5, color: 'var(--sub)', marginTop: 3, textAlign: m.from === 'patient' ? 'right' : 'left' }}>{m.time}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask My Doctor…" style={{ flex: 1, padding: '10px 13px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13.5 }} />
        <button className="btn btn-primary" onClick={send}><Send size={15} /></button>
      </div>
    </div>
  );
}
