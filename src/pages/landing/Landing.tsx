import { useNavigate } from 'react-router-dom';
import { Stethoscope, Pill, FileText, Users, Inbox, ClipboardList, ShieldCheck } from 'lucide-react';

export default function Landing() {
  const nav = useNavigate();
  return (
    <div style={{ background: 'var(--bg)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px' }}>
        <div style={{ fontWeight: 800, fontSize: 17, display: 'flex', alignItems: 'center', gap: 6 }}><Stethoscope size={20} color="var(--teal)" />HomeoPulse</div>
        <button className="btn" onClick={() => nav('/login/doctor')}>For Doctors</button>
      </header>

      <section style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: 38, maxWidth: 640, margin: '0 auto 14px' }}>Stay on track. Stay connected.</h1>
        <p style={{ color: 'var(--sub)', maxWidth: 520, margin: '0 auto 26px', fontSize: 15.5 }}>
          HomeoPulse brings patients and doctors together with simpler treatment schedules, reminders, updates, appointments, and communication.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '12px 22px' }} onClick={() => nav('/login/patient')}>Get Started</button>
          <button className="btn" style={{ padding: '12px 22px' }} onClick={() => nav('/login/doctor')}>For Doctors</button>
        </div>
        <div className="badge badge-blue" style={{ marginTop: 16 }}>Demo Mode</div>
      </section>

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '30px 20px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <StepCard n={1} title="Doctor creates the care plan" />
        <StepCard n={2} title="Patient follows the daily schedule" />
        <StepCard n={3} title="HomeoPulse keeps everyone connected" />
      </section>

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '20px 20px 50px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>For patients</div>
          <Feature icon={Pill} text="Simple reminders" />
          <Feature icon={FileText} text="Easy medicine tracking" />
          <Feature icon={ClipboardList} text="Appointment preparation" />
          <Feature icon={Users} text="Doctor communication" />
          <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => nav('/login/patient')}>Start your care journey</button>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>For doctors</div>
          <Feature icon={Inbox} text="Review Center" />
          <Feature icon={ClipboardList} text="Treatment plans" />
          <Feature icon={Users} text="Patient workspace" />
          <Feature icon={ShieldCheck} text="Reports & follow-ups" />
          <button className="btn" style={{ marginTop: 12 }} onClick={() => nav('/login/doctor')}>Request a demo</button>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '10px 20px 60px', color: 'var(--sub)', fontSize: 13 }}>
        <ShieldCheck size={16} style={{ verticalAlign: -3 }} /> Permission-based access · patient-controlled caregiver access · secure account controls
      </section>
    </div>
  );
}
function StepCard({ n, title }: { n: number; title: string }) {
  return <div className="card" style={{ textAlign: 'center' }}><div className="badge badge-blue" style={{ marginBottom: 8 }}>{n}</div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{title}</div></div>;
}
function Feature({ icon: Icon, text }: any) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13.5 }}><Icon size={15} color="var(--teal)" />{text}</div>;
}
