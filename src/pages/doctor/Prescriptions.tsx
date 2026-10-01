import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useApp } from '../../store/AppState';
import { doctorPatients } from '../../data/mockData';

export default function Prescriptions() {
  const { showToast } = useApp();
  const [step, setStep] = useState<'create' | 'review'>('create');
  const [patient, setPatient] = useState(doctorPatients[0].name);
  const [medicine, setMedicine] = useState('');
  const [instructions, setInstructions] = useState('');

  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Prescriptions</h2>
      <div className="card" style={{ maxWidth: 480 }}>
        <div className="badge badge-blue" style={{ marginBottom: 12 }}>{step === 'create' ? 'Step 1: Create' : 'Step 2: Review'}</div>
        {step === 'create' ? (
          <>
            <Field label="Patient"><select value={patient} onChange={e => setPatient(e.target.value)} style={input}>{doctorPatients.map(p => <option key={p.id}>{p.name}</option>)}</select></Field>
            <Field label="Medicine"><input value={medicine} onChange={e => setMedicine(e.target.value)} placeholder="e.g. Arnica Montana 30C" style={input} /></Field>
            <Field label="Instructions"><textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={2} style={input} /></Field>
            <button className="btn btn-primary" onClick={() => setStep('review')} disabled={!medicine}>Review prescription</button>
          </>
        ) : (
          <>
            <Row label="Patient" value={patient} /><Row label="Medicine" value={medicine} /><Row label="Instructions" value={instructions || '—'} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn" onClick={() => setStep('create')}>Back</button>
              <button className="btn btn-primary" onClick={() => { showToast('Prescription approved & sent to ' + patient); setStep('create'); setMedicine(''); setInstructions(''); }}>Approve &amp; send to patient</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
const input: CSSProperties = { width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13.5, fontFamily: 'inherit' };
function Field({ label, children }: any) { return <div style={{ marginBottom: 12 }}><div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 5 }}>{label}</div>{children}</div>; }
function Row({ label, value }: { label: string; value: string }) { return <div style={{ padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}><span style={{ color: 'var(--sub)' }}>{label}:</span> {value}</div>; }
