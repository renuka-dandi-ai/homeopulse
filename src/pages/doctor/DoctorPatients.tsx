import { useNavigate } from 'react-router-dom';
import { doctorPatients } from '../../data/mockData';

export default function DoctorPatients() {
  const nav = useNavigate();
  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Patients</h2>
      {doctorPatients.map(p => (
        <div key={p.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, cursor: 'pointer' }} onClick={() => nav('/doctor/patients/' + encodeURIComponent(p.name))}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
            <div style={{ color: 'var(--sub)', fontSize: 12.5 }}>Age {p.age} · {p.lastUpdate}</div>
          </div>
          <span className="badge badge-green">{p.adherence} adherence</span>
        </div>
      ))}
    </div>
  );
}
