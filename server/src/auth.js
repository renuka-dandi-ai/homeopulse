import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'homeopulse-dev-secret-change-in-production';
const router = Router();

function sign(payload) { return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }); }

// --- Patient: phone + OTP ---
router.post('/patient/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 6) return res.status(400).json({ error: 'Valid phone number required' });
  const data = db.load();
  const code = '123456'; // fixed demo OTP — replace with a real SMS provider (e.g. Twilio, MSG91) in production
  data.otps[phone] = { code, expiresAt: Date.now() + 5 * 60 * 1000 };
  db.save(data);
  console.log(`[DEV OTP] ${phone} -> ${code}`);
  // devOtp is only returned because there is no real SMS gateway wired up for this prototype
  res.json({ ok: true, devOtp: code, message: 'OTP sent (demo mode — no real SMS is sent).' });
});

router.post('/patient/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const data = db.load();
  const record = data.otps[phone];
  if (!record || record.code !== otp || record.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Invalid or expired OTP' });
  }
  delete data.otps[phone];
  let patient = data.patients.find(p => p.phone === phone);
  if (!patient) {
    // first-time login — create a lightweight patient record tied to this phone
    patient = { id: 'p' + Date.now(), name: 'New Patient', phone, age: null, doctor: 'Dr. Mantri Rama Krishna' };
    data.patients.push(patient);
  }
  db.save(data);
  const token = sign({ role: 'patient', phone, name: patient.name });
  res.json({ token, patient });
});

// --- Doctor: phone + password ---
router.post('/doctor/login', (req, res) => {
  const { phone, password } = req.body;
  const data = db.load();
  const doctor = data.doctors.find(d => d.phone === phone);
  if (!doctor || !bcrypt.compareSync(password || '', doctor.passwordHash)) {
    return res.status(401).json({ error: 'Invalid phone number or password' });
  }
  const token = sign({ role: 'doctor', phone, name: doctor.name });
  res.json({ token, doctor: { id: doctor.id, name: doctor.name, phone: doctor.phone } });
});

export default router;
