import { useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';
import { medicineAdherence } from '../../data/mockData';
import EmptyState from '../../components/EmptyState';

type Stat = 'recorded' | 'snoozed' | 'unable';

function buildRows() {
  const byPatient: Record<string, typeof medicineAdherence> = {};
  medicineAdherence.forEach(r => { (byPatient[r.patient] ||= []).push(r); });
  return Object.entries(byPatient).map(([patient, meds]) => {
    const sum = (key: Stat | 'scheduled') => meds.reduce((s, m) => s + m[key], 0);
    const detail = (key: Stat) => meds.filter(m => m[key] > 0).map(m => `${m.medicine} (${m[key]})`).join(', ') || 'None';
    return {
      patient,
      scheduled: sum('scheduled'),
      recorded: sum('recorded'), recordedDetail: detail('recorded'),
      snoozed: sum('snoozed'), snoozedDetail: detail('snoozed'),
      unable: sum('unable'), unableDetail: detail('unable'),
    };
  });
}

export default function Adherence() {
  const [query, setQuery] = useState('');
  const allRows = useMemo(buildRows, []);
  const rows = allRows.filter(r => r.patient.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 6 }}>Adherence</h2>
      <div style={{ color: 'var(--sub)', fontSize: 12.5, marginBottom: 14 }}>Schedule adherence reflects reminders followed, not treatment effectiveness. Hover a number to see which medicines it includes.</div>

      <div style={{ position: 'relative', maxWidth: 360, marginBottom: 16 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--sub)' }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search patient name…"
          style={{ width: '100%', padding: '9px 12px 9px 34px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13.5, fontFamily: 'inherit' }}
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={Users} title="No patients found" subtitle={`No match for "${query}". Try a different name.`} />
      ) : (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--sub)', fontSize: 11.5 }}>
                <th style={{ padding: '6px 8px' }}>Patient</th>
                <th style={{ padding: '6px 8px' }}>Scheduled</th>
                <th style={{ padding: '6px 8px' }}>Recorded</th>
                <th style={{ padding: '6px 8px' }}>Snoozed</th>
                <th style={{ padding: '6px 8px' }}>Unable to take</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.patient} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '9px 8px', fontWeight: 600 }}>{r.patient}</td>
                  <td style={{ padding: '9px 8px' }}>{r.scheduled}</td>
                  <td style={{ padding: '9px 8px' }}><span className="badge badge-green" title={`Recorded — ${r.recordedDetail}`} style={{ cursor: 'default' }}>{r.recorded}</span></td>
                  <td style={{ padding: '9px 8px' }}><span className="badge badge-purple" title={`Snoozed — ${r.snoozedDetail}`} style={{ cursor: 'default' }}>{r.snoozed}</span></td>
                  <td style={{ padding: '9px 8px' }}><span className="badge badge-red" title={`Unable to take — ${r.unableDetail}`} style={{ cursor: 'default' }}>{r.unable}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
