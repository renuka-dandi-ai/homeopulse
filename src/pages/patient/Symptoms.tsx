import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppState';
import EmptyState from '../../components/EmptyState';
import { Activity, PlusCircle } from 'lucide-react';

export default function Symptoms() {
  const { symptoms } = useApp();
  const nav = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ fontSize: 19 }}>Symptom journal</h2>
        <button className="btn btn-primary" onClick={() => nav('/app/symptoms/new')}><PlusCircle size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Add</button>
      </div>
      {symptoms.length === 0 ? <EmptyState icon={Activity} title="No entries yet" subtitle="Log how you're feeling and share it with your doctor." /> : symptoms.map(s => (
        <div key={s.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
            <span className="badge badge-blue">{s.severity}/5</span>
          </div>
          <div style={{ color: 'var(--sub)', fontSize: 12.5, marginTop: 3 }}>{s.date}</div>
          {s.notes && <div style={{ fontSize: 13, marginTop: 6 }}>{s.notes}</div>}
        </div>
      ))}
    </div>
  );
}
