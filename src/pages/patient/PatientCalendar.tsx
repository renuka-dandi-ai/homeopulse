import { useState } from 'react';
import { useApp } from '../../store/AppState';
import { patient } from '../../data/mockData';
import { CalendarDays } from 'lucide-react';

const days = ['Mon 28', 'Tue 29', 'Wed 30', 'Thu 1'];
const slots = ['9:00 AM', '9:30 AM', '10:00 AM', '4:00 PM', '4:30 PM', '5:00 PM'];
const preBooked = ['10:00 AM'];

export default function PatientCalendar() {
  const { appointments, addAppointment, showToast } = useApp();
  const [day, setDay] = useState('Tue 29');
  const [slot, setSlot] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);

  function confirm() {
    if (!slot) return;
    addAppointment({ patient: patient.name, doctor: patient.doctor, date: day, time: slot, type: 'Follow-up consultation', status: 'upcoming' });
    showToast(`Appointment booked for ${day}, ${slot}`);
    setBooking(false); setSlot(null);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ fontSize: 19 }}>Calendar</h2>
        <button className="btn btn-primary" onClick={() => setBooking(b => !b)}>{booking ? 'Close' : 'Book appointment'}</button>
      </div>

      {booking && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 6 }}>{patient.doctor} · Follow-up (15 min)</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {days.map(d => <button key={d} className="btn" style={d === day ? { background: 'var(--teal)', color: '#fff' } : {}} onClick={() => setDay(d)}>{d}</button>)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 8 }}>Available slots — {day}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {slots.map(s => {
              const isBooked = preBooked.includes(s);
              return (
                <button key={s} disabled={isBooked} className="btn" style={s === slot ? { background: 'var(--teal)', color: '#fff' } : {}} onClick={() => setSlot(s)}>
                  {s}{isBooked && <div style={{ fontSize: 9 }}>Booked</div>}
                </button>
              );
            })}
          </div>
          <button className="btn btn-primary" disabled={!slot} onClick={confirm} style={{ width: '100%' }}>Confirm booking</button>
        </div>
      )}

      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sub)', textTransform: 'uppercase', marginBottom: 8 }}>Appointments</div>
      {appointments.map(a => (
        <div key={a.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{a.doctor}</div>
              <div style={{ color: 'var(--sub)', fontSize: 12.5 }}>{a.date}, {a.time} · {a.type}</div>
            </div>
            <span className={`badge ${a.status === 'upcoming' ? 'badge-amber' : 'badge-gray'}`}><CalendarDays size={11} />{a.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
