import type { Medicine } from '../data/mockData';
import { CheckCircle2, Clock, Moon, XCircle } from 'lucide-react';

const statusMap: Record<Medicine['status'], { label: string; cls: string; icon: any }> = {
  upcoming: { label: 'Upcoming', cls: 'badge-gray', icon: Clock },
  due: { label: 'Due now', cls: 'badge-amber', icon: Clock },
  taken: { label: 'Recorded', cls: 'badge-green', icon: CheckCircle2 },
  snoozed: { label: 'Snoozed', cls: 'badge-purple', icon: Moon },
  unable: { label: 'Unable to take', cls: 'badge-red', icon: XCircle },
};

export default function MedicineCard({ med, onAction }: { med: Medicine; onAction?: (action: 'taken'|'snoozed'|'unable') => void }) {
  const s = statusMap[med.status];
  return (
    <div className="card" style={{ padding: 14, marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14.5 }}>{med.name}</div>
          <div style={{ color: 'var(--sub)', fontSize: 12.5, marginTop: 2 }}>{med.time} · {med.instructions}</div>
        </div>
        <span className={`badge ${s.cls}`}><s.icon size={12} />{s.label}</span>
      </div>
      {onAction && med.status !== 'taken' && (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn btn-primary" onClick={() => onAction('taken')}>Taken</button>
          <button className="btn" onClick={() => onAction('snoozed')}>Snooze</button>
          <button className="btn" onClick={() => onAction('unable')}>Unable to take</button>
        </div>
      )}
    </div>
  );
}
