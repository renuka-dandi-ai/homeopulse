const BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api';

function getToken() { return localStorage.getItem('hp_token'); }

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  sendPatientOtp: (phone: string) => request('/auth/patient/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyPatientOtp: (phone: string, otp: string) => request('/auth/patient/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
  doctorLogin: (phone: string, password: string) => request('/auth/doctor/login', { method: 'POST', body: JSON.stringify({ phone, password }) }),

  getMedicines: () => request('/medicines'),
  updateMedicine: (id: string, status: string) => request(`/medicines/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getSymptoms: () => request('/symptoms'),
  addSymptom: (body: any) => request('/symptoms', { method: 'POST', body: JSON.stringify(body) }),
  getMessages: () => request('/messages'),
  addMessage: (body: any) => request('/messages', { method: 'POST', body: JSON.stringify(body) }),
  getAppointments: () => request('/appointments'),
  addAppointment: (body: any) => request('/appointments', { method: 'POST', body: JSON.stringify(body) }),
  getReviewItems: () => request('/review-items'),
  markReviewed: (id: string) => request(`/review-items/${id}`, { method: 'PATCH', body: JSON.stringify({ status: 'reviewed' }) }),
  getPatients: () => request('/patients'),
  getAdherence: () => request('/adherence'),
  addTreatmentPlan: (body: any) => request('/treatment-plans', { method: 'POST', body: JSON.stringify(body) }),
};

export function setToken(token: string) { localStorage.setItem('hp_token', token); }
export function clearToken() { localStorage.removeItem('hp_token'); }
export function getStoredToken() { return getToken(); }
