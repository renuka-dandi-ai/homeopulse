const reports = [
  { title: 'Patient engagement', value: '82%', desc: 'Patients active in the last 7 days' },
  { title: 'Schedule adherence', value: '86%', desc: 'Average recorded vs scheduled' },
  { title: 'Follow-up activity', value: '14', desc: 'Follow-ups completed this month' },
  { title: 'Patient updates', value: '37', desc: 'Structured updates this month' },
];
export default function Reports() {
  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Reports</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
        {reports.map(r => (
          <div key={r.title} className="card">
            <div style={{ fontSize: 12, color: 'var(--sub)' }}>{r.title}</div>
            <div style={{ fontSize: 26, fontWeight: 700, margin: '4px 0' }}>{r.value}</div>
            <div style={{ fontSize: 11.5, color: 'var(--sub)' }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
