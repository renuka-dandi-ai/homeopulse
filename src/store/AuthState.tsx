import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { api, setToken, clearToken, getStoredToken } from '../services/api';

interface AuthUser { role: 'patient' | 'doctor'; name: string; phone: string; }
interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  loginDoctor: (phone: string, password: string) => Promise<void>;
  sendOtp: (phone: string) => Promise<string>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    const stored = localStorage.getItem('hp_user');
    if (token && stored) { try { setUser(JSON.parse(stored)); } catch { /* ignore */ } }
    setLoading(false);
  }, []);

  function persistUser(u: AuthUser) { setUser(u); localStorage.setItem('hp_user', JSON.stringify(u)); }

  async function loginDoctor(phone: string, password: string) {
    const res = await api.doctorLogin(phone, password);
    setToken(res.token);
    persistUser({ role: 'doctor', name: res.doctor.name, phone: res.doctor.phone });
  }
  async function sendOtp(phone: string) {
    const res = await api.sendPatientOtp(phone);
    return res.devOtp as string; // demo-only: real SMS provider would not return this
  }
  async function verifyOtp(phone: string, otp: string) {
    const res = await api.verifyPatientOtp(phone, otp);
    setToken(res.token);
    persistUser({ role: 'patient', name: res.patient.name, phone: res.patient.phone });
  }
  function logout() { clearToken(); localStorage.removeItem('hp_user'); setUser(null); }

  return <AuthContext.Provider value={{ user, loading, loginDoctor, sendOtp, verifyOtp, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const c = useContext(AuthContext); if (!c) throw new Error('useAuth outside provider'); return c; }
