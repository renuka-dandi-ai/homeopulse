import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppState';
import { patient } from '../../data/mockData';
import { Bell, Clock, FileText, MessageCircle, PlusCircle, Upload, CalendarPlus, CheckCircle2, Link2 } from 'lucide-react';

export default function PatientHome() {
  const { medicines, appointments, showToast } = useApp();
  const nav = useNavigate();
  const next = medicines.find(m => m.status === 'due') || medicines.find(m => m.status === 'upcoming');
  const recorded = medicines.filter(m => m.status === 'taken').length;
  const upcomingAppt = appointments.find(a => a.status === 'upcoming');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 21 }}>Good morning, {patient.name.split(' ')[0]}</h2>
          <div style={{ color: 'var(--sub)', fontSize: 13 }}>Friday, September 25</div>
        </div>
        <button className="btn" style={{ borderRadius: 999, padding: 8 }} onClick={() => showToast('2 unread notifications')}><Bell size={18} /></button>
      </div>

      {next ? (
        <div className="card" style={{ background: 'linear-gradient(135deg,var(--mint),#fff)', marginBottom: 14 }}>
          <div className="badge badge-amber" style={{ marginBottom: 8 }}><Clock size={12} />{next.status === 'due' ? 'Due in 20 minutes' : 'Next up'}</div>
          <h3 style={{ fontSize: 19 }}>{next.name}</h3>
          <div style={{ color: 'var(--sub)', fontSize: 13, margin: '4px 0 14px' }}>{next.time} · {next.instructions}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary" onClick={() => nav('/app/medicines')}>View reminder</button>
            <button className="btn" onClick={() => nav('/app/medicines')}>Today's schedule</button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 14 }}>All medicines recorded for today. Nicely done.</div>
      )}

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 10 }}>Today's care</div>
        <div style={{ display: 'flex', gap: 22 }}>
          <Stat label="Scheduled" value={medicines.length} />
          <Stat label="Recorded" value={recorded} />
          <Stat label="Remaining" value={medicines.length - recorded} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <QuickAction icon={PlusCircle} label="Add symptom" onClick={() => nav('/app/symptoms/new')} />
        <QuickAction icon={CalendarPlus} label="Book appointment" onClick={() => nav('/app/calendar')} />
        <QuickAction icon={Upload} label="Upload prescription" onClick={() => showToast('Prescription sent to your doctor for review')} />
        <QuickAction icon={MessageCircle} label="Message doctor" onClick={() => nav('/app/messages')} />
      </div>

      {upcomingAppt && (
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 6 }}>Upcoming appointment</div>
          <div style={{ fontSize: 14 }}>{upcomingAppt.doctor}</div>
          <div style={{ color: 'var(--sub)', fontSize: 12.5 }}>{upcomingAppt.date}, {upcomingAppt.time} · {upcomingAppt.type}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button className="btn btn-primary" onClick={() => nav('/app/calendar')}>Prepare</button>
            <button className="btn" onClick={() => nav('/app/calendar')}>View appointment</button>
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 10 }}>Your care today</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <LoopStep icon={CheckCircle2} label="Medicine" status={recorded > 0 ? 'Recorded' : 'Pending'} done={recorded > 0} />
          <LoopStep icon={FileText} label="Update" status="Shared" done />
          <LoopStep icon={CalendarPlus} label="Appointment" status={upcomingAppt ? upcomingAppt.date : 'None'} done={false} />
          <LoopStep icon={Link2} label="Doctor" status="Connected" done />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div><div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div><div style={{ fontSize: 11.5, color: 'var(--sub)' }}>{label}</div></div>;
}
function QuickAction({ icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', border: '1px solid var(--border)' }}>
      <Icon size={18} color="var(--teal)" /><span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
    </button>
  );
}
function LoopStep({ icon: Icon, label, status, done }: any) {
  return (
    <div style={{ textAlign: 'center', minWidth: 70 }}>
      <div style={{ width: 38, height: 38, borderRadius: 999, background: done ? 'var(--green-bg)' : 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
        <Icon size={17} color={done ? 'var(--green)' : 'var(--sub)'} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 10.5, color: 'var(--sub)' }}>{status}</div>
    </div>
  );
}
