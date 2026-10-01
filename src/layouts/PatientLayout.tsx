import { NavLink, Outlet } from 'react-router-dom';
import { Home, Pill, Calendar, MessageCircle, User } from 'lucide-react';

const items = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/medicines', label: 'Medicines', icon: Pill },
  { to: '/app/calendar', label: 'Calendar', icon: Calendar },
  { to: '/app/messages', label: 'Messages', icon: MessageCircle },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export default function PatientLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="pat-sidebar">
        <div className="pat-logo">🩺 HomeoPulse</div>
        <nav>
          {items.map(i => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => 'pat-navitem' + (isActive ? ' active' : '')}>
              <i.icon size={18} /><span>{i.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, paddingBottom: 76 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px 40px' }}>
          <Outlet />
        </div>
      </main>
      <nav className="pat-bottomnav">
        {items.map(i => (
          <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => 'bn-item' + (isActive ? ' active' : '')}>
            <i.icon size={20} /><span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
