const patients = [
  { name: 'Meera Rao', next: 'Arnica 30C, 10:00 AM', appt: 'Fri, Sep 29', alerts: 'On' },
];
export default function CaregiverDashboard() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>🩺 HomeoPulse — Caregiver</div>
      <div style={{ color: 'var(--sub)', fontSize: 13, marginBottom: 18 }}>Authorized patients</div>
      {patients.map(p => (
        <div key={p.name} className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
          <Row label="Next medicine" value={p.next} />
          <Row label="Upcoming appointment" value={p.appt} />
          <Row label="Configured alerts" value={p.alerts} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button className="btn">View medicines</button><button className="btn">Contact care team</button>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11.5, color: 'var(--sub)' }}>Access is permission-based — private doctor notes are not visible to caregivers.</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) { return <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0' }}><span style={{ color: 'var(--sub)' }}>{label}</span><span>{value}</span></div>; }
