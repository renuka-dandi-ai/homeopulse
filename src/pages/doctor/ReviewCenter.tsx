import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppState';
import EmptyState from '../../components/EmptyState';
import { Inbox } from 'lucide-react';

const filters = ['All', 'New', 'Questions', 'Patient updates', 'Adherence updates', 'Follow-ups'] as const;
const typeMap: Record<string, string> = { Questions: 'Question', 'Patient updates': 'Patient update', 'Adherence updates': 'Adherence update', 'Follow-ups': 'Follow-up' };

export default function ReviewCenter() {
  const { reviewItems, markReviewed, showToast } = useApp();
  const [filter, setFilter] = useState<typeof filters[number]>('New');
  const nav = useNavigate();

  const list = reviewItems.filter(r => {
    if (filter === 'All') return true;
    if (filter === 'New') return r.status === 'new';
    return r.type === typeMap[filter];
  });

  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 14 }}>Review Center</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} className="btn" style={f === filter ? { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)' } : {}} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {list.length === 0 && <EmptyState icon={Inbox} title="You're all caught up." subtitle="No items match this filter." />}
      {list.map(r => (
        <div key={r.id} className="card" style={{ marginBottom: 10, opacity: r.status === 'reviewed' ? .55 : 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{r.patient}</span>
                <span className="badge badge-blue">{r.type}</span>
                {r.status === 'new' && <span className="badge badge-amber">New</span>}
              </div>
              <div style={{ color: 'var(--sub)', fontSize: 13, marginTop: 4 }}>{r.summary}</div>
              <div style={{ color: 'var(--sub2)', fontSize: 11.5, marginTop: 4 }}>{r.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => nav('/doctor/patients/' + encodeURIComponent(r.patient))}>Open profile</button>
              <button className="btn btn-primary" disabled={r.status === 'reviewed'} onClick={() => { markReviewed(r.id); showToast('Marked as reviewed'); }}>Review</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
