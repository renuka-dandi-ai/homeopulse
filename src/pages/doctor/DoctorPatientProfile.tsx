import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../store/AppState';
import { doctorPatients } from '../../data/mockData';

const tabs = ['Overview', 'Treatment', 'Adherence', 'Updates', 'Messages'];

export default function DoctorPatientProfile() {
  const { name } = useParams();
  const { reviewItems, showToast } = useApp();
  const [tab, setTab] = useState('Overview');
  const p = doctorPatients.find(d => d.name === name) || doctorPatients[0];
  const patientUpdates = reviewItems.filter(r => r.patient === p.name);

  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <h2 style={{ fontSize: 20 }}>{p.name}</h2>
        <div style={{ color: 'var(--sub)', fontSize: 13 }}>Age {p.age} · Next appointment: Fri, Sep 29 · No caregiver on file</div>
      </div>
      <div style={{ display: 'flex', gap: 4, margin: '16px 0', borderBottom: '1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', padding: '10px 14px', fontSize: 13.5, fontWeight: 600, color: tab === t ? 'var(--teal)' : 'var(--sub)', borderBottom: tab === t ? '2px solid var(--teal)' : '2px solid transparent' }}>{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="card">
          <Row label="Current treatment plan" value="Arnica 30C, Nux Vomica 6C, Belladonna 30C" />
          <Row label="Schedule adherence" value={p.adherence + ' recorded this week'} />
          <Row label="Recent patient update" value={p.lastUpdate} />
          <Row label="Upcoming appointment" value="Fri, Sep 29, 4:00 PM" />
        </div>
      )}
      {tab === 'Treatment' && (
        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Active treatment plan</div>
          {['Arnica Montana 30C — 10:00 AM', 'Nux Vomica 6C — 8:00 AM', 'Belladonna 30C — 2:00 PM'].map(m => (
            <div key={m} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}>{m}</div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => showToast('Opening prescription builder…')}>Update prescription</button>
        </div>
      )}
      {tab === 'Adherence' && (
        <div className="card" style={{ display: 'flex', gap: 24 }}>
          <Stat label="Scheduled" value="28" /><Stat label="Recorded" value="24" /><Stat label="Snoozed" value="3" /><Stat label="Unable" value="1" />
        </div>
      )}
      {tab === 'Updates' && (
        <div>
          {patientUpdates.length === 0 && <div className="card" style={{ color: 'var(--sub)' }}>No recent updates.</div>}
          {patientUpdates.map(u => (
            <div key={u.id} className="card" style={{ marginBottom: 8 }}>
              <span className="badge badge-blue">{u.type}</span>
              <div style={{ fontSize: 13.5, marginTop: 6 }}>{u.summary}</div>
              <div style={{ fontSize: 11.5, color: 'var(--sub)', marginTop: 4 }}>{u.time}</div>
            </div>
          ))}
        </div>
      )}
      {tab === 'Messages' && (
        <div className="card">
          <button className="btn btn-primary" onClick={() => showToast('Message sent to ' + p.name)}>Message {p.name}</button>
        </div>
      )}
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div style={{ padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}><div style={{ color: 'var(--sub)', fontSize: 11.5 }}>{label}</div>{value}</div>;
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div><div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div><div style={{ fontSize: 11.5, color: 'var(--sub)' }}>{label}</div></div>;
}
