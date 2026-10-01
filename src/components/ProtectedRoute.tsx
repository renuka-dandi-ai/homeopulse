import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../store/AuthState';

export default function ProtectedRoute({ role, children }: { role: 'patient' | 'doctor'; children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--sub)' }}>Loading…</div>;
  if (!user || user.role !== role) return <Navigate to={role === 'patient' ? '/login/patient' : '/login/doctor'} replace />;
  return <>{children}</>;
}
