import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppState';
import { doctorPatients } from '../../data/mockData';
import { Users, CalendarDays, Inbox, MessageSquare } from 'lucide-react';

export default function DoctorDashboard() {
  const { reviewItems } = useApp();
  const nav = useNavigate();
  const newUpdates = reviewItems.filter(r => r.status === 'new');
  const questions = newUpdates.filter(r => r.type === 'Question');
  const followUps = newUpdates.filter(r => r.type === 'Follow-up');

  return (
    <div>
      <h2 style={{ fontSize: 22, marginBottom: 2 }}>Good morning, Dr. Mantri Rama Krishna</h2>
      <div style={{ color: 'var(--sub)', fontSize: 13, marginBottom: 20 }}>Friday, September 25</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard icon={Users} label="Patients" value={doctorPatients.length} />
        <StatCard icon={CalendarDays} label="Appointments today" value={3} />
        <StatCard icon={Inbox} label="New updates" value={newUpdates.length} />
        <StatCard icon={MessageSquare} label="Unread messages" value={2} />
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Patient updates</div>
        <div style={{ color: 'var(--sub)', fontSize: 13, marginBottom: 14 }}>
          {doctorPatients.length} patients · {newUpdates.length} new updates · {questions.length} questions · {followUps.length} follow-up today
        </div>
        <button className="btn btn-primary" onClick={() => nav('/doctor/review')}>Open Review Center</button>
      </div>

      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Your attention today</div>
      {newUpdates.slice(0, 4).map(r => (
        <div key={r.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.patient}</div>
            <div style={{ color: 'var(--sub)', fontSize: 12.5 }}>{r.summary}</div>
          </div>
          <button className="btn" onClick={() => nav('/doctor/review')}>Review</button>
        </div>
      ))}
      {newUpdates.length === 0 && <div className="card" style={{ textAlign: 'center', color: 'var(--sub)' }}>You're all caught up.</div>}
    </div>
  );
}
function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="card">
      <Icon size={16} color="var(--teal)" />
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--sub)' }}>{label}</div>
    </div>
  );
}
