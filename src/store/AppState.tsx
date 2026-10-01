import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Medicine, Symptom, Message, ReviewItem, Appointment } from '../data/mockData';
import { api } from '../services/api';
import { useAuth } from './AuthState';

interface Ctx {
  loading: boolean;
  medicines: Medicine[]; updateMedicine: (id: string, status: Medicine['status']) => void;
  symptoms: Symptom[]; addSymptom: (s: Omit<Symptom, 'id'>) => void;
  messages: Message[]; addMessage: (m: Omit<Message, 'id'>) => void;
  reviewItems: ReviewItem[]; markReviewed: (id: string) => void;
  appointments: Appointment[]; addAppointment: (a: Omit<Appointment, 'id'>) => void;
  simpleMode: boolean; setSimpleMode: (v: boolean) => void;
  toast: string | null; showToast: (msg: string) => void;
}
const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [simpleMode, setSimpleModeState] = useState<boolean>(() => localStorage.getItem('hp_simple') === 'true');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    Promise.all([api.getMedicines(), api.getSymptoms(), api.getMessages(), api.getReviewItems(), api.getAppointments()])
      .then(([meds, syms, msgs, reviews, appts]) => {
        setMedicines(meds); setSymptoms(syms); setMessages(msgs); setReviewItems(reviews); setAppointments(appts);
      })
      .catch(() => showToast('Could not reach the server. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [user]);

  function setSimpleMode(v: boolean) { setSimpleModeState(v); localStorage.setItem('hp_simple', String(v)); }
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2400); }

  async function updateMedicine(id: string, status: Medicine['status']) {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, status } : m)); // optimistic
    try { await api.updateMedicine(id, status); } catch { showToast('Could not sync with server'); }
  }
  async function addSymptom(s: Omit<Symptom, 'id'>) {
    try {
      const saved = await api.addSymptom(s);
      setSymptoms(prev => [saved, ...prev]);
      const reviews = await api.getReviewItems();
      setReviewItems(reviews);
    } catch { showToast('Could not save — check your connection'); }
  }
  async function addMessage(m: Omit<Message, 'id'>) {
    try { const saved = await api.addMessage(m); setMessages(prev => [...prev, saved]); }
    catch { showToast('Message failed to send'); }
  }
  async function markReviewed(id: string) {
    setReviewItems(prev => prev.map(r => r.id === id ? { ...r, status: 'reviewed' } : r)); // optimistic
    try { await api.markReviewed(id); } catch { showToast('Could not sync with server'); }
  }
  async function addAppointment(a: Omit<Appointment, 'id'>) {
    try { const saved = await api.addAppointment(a); setAppointments(prev => [saved, ...prev]); }
    catch { showToast('Could not book — check your connection'); }
  }

  return (
    <AppContext.Provider value={{ loading, medicines, updateMedicine, symptoms, addSymptom, messages, addMessage, reviewItems, markReviewed, appointments, addAppointment, simpleMode, setSimpleMode, toast, showToast }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </AppContext.Provider>
  );
}
export function useApp() { const c = useContext(AppContext); if (!c) throw new Error('useApp outside provider'); return c; }
