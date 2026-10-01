import { useApp } from '../../store/AppState';

const todaysAppts = [
  { patient: 'Arjun Mehta', time: '5:00 PM', type: 'Follow-up' },
  { patient: 'Nita Shah', time: '5:30 PM', type: 'Initial consult' },
];

export default function DoctorAppointments() {
  const { appointments } = useApp();
  const booked = appointments.filter(a => a.status === 'upcoming');

  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Appointments — Today</h2>

      {booked.map(a => (
        <div key={a.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{a.patient}</div>
            <span className="badge badge-amber">{a.date}, {a.time}</span>
          </div>
          <div style={{ color: 'var(--sub)', fontSize: 12.5, margin: '4px 0 8px' }}>{a.type}</div>
          <div style={{ fontSize: 12, background: 'var(--bg)', borderRadius: 8, padding: '8px 10px' }}>
            <b>Patient preparation:</b> 1 recent question · schedule adherence 24/28 · latest update: mild headache reported
          </div>
        </div>
      ))}

      {todaysAppts.map(a => (
        <div key={a.patient} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{a.patient}</div>
            <span className="badge badge-blue">{a.time}</span>
          </div>
          <div style={{ color: 'var(--sub)', fontSize: 12.5, margin: '4px 0 8px' }}>{a.type}</div>
        </div>
      ))}
    </div>
  );
}
