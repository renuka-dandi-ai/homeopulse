import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Inbox, Users, FileText, ClipboardList, Activity, CalendarDays, MessageSquare, BarChart3, Settings } from 'lucide-react';

const groups = [
  { label: 'Workspace', items: [
    { to: '/doctor', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/doctor/review', label: 'Review Center', icon: Inbox },
    { to: '/doctor/patients', label: 'Patients', icon: Users },
  ]},
  { label: 'Care', items: [
    { to: '/doctor/treatment-plans', label: 'Treatment Plans', icon: ClipboardList },
    { to: '/doctor/prescriptions', label: 'Prescriptions', icon: FileText },
    { to: '/doctor/adherence', label: 'Adherence', icon: Activity },
  ]},
  { label: 'Practice', items: [
    { to: '/doctor/appointments', label: 'Appointments', icon: CalendarDays },
    { to: '/doctor/messages', label: 'Messages', icon: MessageSquare },
    { to: '/doctor/reports', label: 'Reports', icon: BarChart3 },
  ]},
  { label: 'Settings', items: [
    { to: '/doctor/settings', label: 'Settings', icon: Settings },
  ]},
];

export default function DoctorLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="doc-sidebar">
        <div className="pat-logo" style={{ marginBottom: 18 }}>🩺 HomeoPulse</div>
        {groups.map(g => (
          <div key={g.label} style={{ marginBottom: 14 }}>
            <div className="doc-group-label">{g.label}</div>
            {g.items.map(i => (
              <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => 'doc-navitem' + (isActive ? ' active' : '')}>
                <i.icon size={16} /><span>{i.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </aside>
      <main style={{ flex: 1, padding: '26px 32px', maxWidth: 1100 }}>
        <Outlet />
      </main>
    </div>
  );
}
