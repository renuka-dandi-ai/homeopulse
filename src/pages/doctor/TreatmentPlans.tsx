import { useState } from 'react';
import type { CSSProperties } from 'react';
import { doctorPatients } from '../../data/mockData';
import { useApp } from '../../store/AppState';
import { api } from '../../services/api';

export default function TreatmentPlans() {
  const { showToast } = useApp();
  const [building, setBuilding] = useState(false);
  const [step, setStep] = useState<'create' | 'review'>('create');
  const [patientName, setPatientName] = useState(doctorPatients[0].name);
  const [medicines, setMedicines] = useState('');
  const [schedule, setSchedule] = useState('Morning');
  const [followUp, setFollowUp] = useState('');

  function openBuilder() { setBuilding(true); setStep('create'); }
  function reset() { setStep('create'); setMedicines(''); setSchedule('Morning'); setFollowUp(''); setBuilding(false); }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>Treatment plans</h2>
        <button className="btn btn-primary" onClick={() => building ? setBuilding(false) : openBuilder()}>{building ? 'Close' : 'New treatment plan'}</button>
      </div>

      {building && (
        <div className="card" style={{ marginBottom: 16, maxWidth: 460 }}>
          <div className="badge badge-blue" style={{ marginBottom: 12 }}>{step === 'create' ? 'Step 1: Create' : 'Step 2: Review'}</div>

          {step === 'create' ? (
            <>
              <Field label="Select patient">
                <select value={patientName} onChange={e => setPatientName(e.target.value)} style={input}>
                  {doctorPatients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </Field>
              <Field label="Add medicines">
                <input value={medicines} onChange={e => setMedicines(e.target.value)} placeholder="e.g. Arnica 30C, Nux Vomica 6C" style={input} />
              </Field>
              <Field label="Configure schedule">
                <select value={schedule} onChange={e => setSchedule(e.target.value)} style={input}>
                  {['Morning', 'Afternoon', 'Evening', 'Night', 'Morning / Afternoon', 'Morning / Evening', 'Morning / Afternoon / Evening'].map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Follow-up date">
                <input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} style={input} />
              </Field>
              <button className="btn btn-primary" disabled={!medicines.trim() || !followUp} onClick={() => setStep('review')}>Review</button>
            </>
          ) : (
            <>
              <Row label="Patient" value={patientName} />
              <Row label="Medicines" value={medicines} />
              <Row label="Schedule" value={schedule} />
              <Row label="Follow-up date" value={followUp} />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn" onClick={() => setStep('create')}>Back</button>
                <button className="btn btn-primary" onClick={() => { api.addTreatmentPlan({ patient: patientName, medicines, schedule, followUp }).catch(() => {}); showToast('Treatment plan sent to ' + patientName); reset(); }}>Approve &amp; send to patient</button>
              </div>
            </>
          )}
        </div>
      )}

      {doctorPatients.map(p => (
        <div key={p.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
            <div style={{ color: 'var(--sub)', fontSize: 12.5 }}>Active plan · started Sep 10, review Oct 10</div>
          </div>
          <span className="badge badge-green">Active</span>
        </div>
      ))}
    </div>
  );
}
const input: CSSProperties = { width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13.5, fontFamily: 'inherit' };
function Field({ label, children }: any) { return <div style={{ marginBottom: 12 }}><div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 5 }}>{label}</div>{children}</div>; }
function Row({ label, value }: { label: string; value: string }) { return <div style={{ padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}><span style={{ color: 'var(--sub)' }}>{label}:</span> {value}</div>; }
