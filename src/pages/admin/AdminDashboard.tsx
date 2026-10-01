const stats = [
  { label: 'Total users', value: 342 }, { label: 'Active doctors', value: 18 },
  { label: 'Active patients', value: 312 }, { label: 'Pending verification', value: 2 },
];
export default function AdminDashboard() {
  return (
    <div style={{ padding: 28, maxWidth: 900, margin: '0 auto' }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>🩺 HomeoPulse — Admin</div>
      <div style={{ color: 'var(--sub)', fontSize: 13, marginBottom: 20 }}>Platform overview</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {stats.map(s => <div key={s.label} className="card"><div style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</div><div style={{ fontSize: 11.5, color: 'var(--sub)' }}>{s.label}</div></div>)}
      </div>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Doctor verification queue</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}>
          <span>Dr. Kavya Nair — submitted credentials</span>
          <span><button className="btn">Approve</button></span>
        </div>
      </div>
    </div>
  );
}
