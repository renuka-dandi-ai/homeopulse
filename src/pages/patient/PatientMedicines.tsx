import { useState } from 'react';
import { useApp } from '../../store/AppState';
import MedicineCard from '../../components/MedicineCard';
import type { Medicine } from '../../data/mockData';

const periods: Medicine['period'][] = ['Morning', 'Afternoon', 'Evening', 'Night'];
const unableReasons = ['Forgot', 'Busy', 'Medicine unavailable', 'Was sleeping', "Didn't feel comfortable", 'Other', 'Prefer not to say'];

export default function PatientMedicines() {
  const { medicines, updateMedicine, showToast } = useApp();
  const [unableFor, setUnableFor] = useState<string | null>(null);
  const [snoozeFor, setSnoozeFor] = useState<string | null>(null);

  function act(id: string, action: 'taken' | 'snoozed' | 'unable') {
    if (action === 'unable') { setUnableFor(id); return; }
    if (action === 'snoozed') { setSnoozeFor(id); return; }
    updateMedicine(id, 'taken');
    showToast("Recorded. You're on track for today.");
  }
  function confirmSnooze(mins: number) {
    if (snoozeFor) updateMedicine(snoozeFor, 'snoozed');
    showToast(`Reminder snoozed for ${mins} minutes.`);
    setSnoozeFor(null);
  }
  function confirmUnable(_reason: string) {
    if (unableFor) updateMedicine(unableFor, 'unable');
    showToast('Recorded — thanks for letting us know.');
    setUnableFor(null);
  }

  return (
    <div>
      <h2 style={{ fontSize: 19, marginBottom: 16 }}>Today's medicines</h2>
      {periods.map(p => {
        const items = medicines.filter(m => m.period === p);
        if (!items.length) return null;
        return (
          <div key={p} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--sub)', textTransform: 'uppercase', marginBottom: 8 }}>{p}</div>
            {items.map(m => <MedicineCard key={m.id} med={m} onAction={(a) => act(m.id, a)} />)}
          </div>
        );
      })}

      {snoozeFor && (
        <Modal onClose={() => setSnoozeFor(null)} title="Snooze reminder">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[10, 30, 60].map(m => <button key={m} className="btn" onClick={() => confirmSnooze(m)}>{m} min</button>)}
            <button className="btn" onClick={() => confirmSnooze(120)}>Custom</button>
          </div>
        </Modal>
      )}
      {unableFor && (
        <Modal onClose={() => setUnableFor(null)} title="What happened?">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {unableReasons.map(r => <button key={r} className="btn" style={{ textAlign: 'left' }} onClick={() => confirmUnable(r)}>{r}</button>)}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: any) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,30,.35)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div className="card" style={{ width: '100%', maxWidth: 420, borderRadius: '20px 20px 0 0', margin: 0 }} onClick={e => e.stopPropagation()}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}
