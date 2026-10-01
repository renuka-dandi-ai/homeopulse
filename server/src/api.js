import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from './db.js';
import { JWT_SECRET } from './auth.js';

const router = Router();

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: 'Invalid or expired token' }); }
}
router.use(auth);

// Everything in this prototype is scoped to the one real patient (Meera Rao) that both
// the patient login and the doctor's workspace share — other patient names are static demo rows.
const MAIN_PATIENT = 'Meera Rao';

router.get('/me', (req, res) => res.json(req.user));

router.get('/medicines', (req, res) => {
  const data = db.load();
  res.json(data.medicines.filter(m => m.patient === MAIN_PATIENT));
});
router.patch('/medicines/:id', (req, res) => {
  const data = db.load();
  const m = data.medicines.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  m.status = req.body.status;
  db.save(data);
  res.json(m);
});

router.get('/symptoms', (req, res) => {
  const data = db.load();
  res.json(data.symptoms.filter(s => s.patient === MAIN_PATIENT));
});
router.post('/symptoms', (req, res) => {
  const data = db.load();
  const entry = { id: 's' + Date.now(), patient: MAIN_PATIENT, ...req.body };
  data.symptoms.unshift(entry);
  data.reviewItems.unshift({
    id: 'r' + Date.now(), patient: MAIN_PATIENT, type: 'Patient update',
    summary: `Reported ${entry.name?.toLowerCase?.() || 'a symptom'}, severity ${entry.severity}/5.`,
    time: 'Just now', status: 'new',
  });
  db.save(data);
  res.json(entry);
});

router.get('/messages', (req, res) => {
  const data = db.load();
  res.json(data.messages.filter(m => m.patient === MAIN_PATIENT));
});
router.post('/messages', (req, res) => {
  const data = db.load();
  const entry = { id: 'msg' + Date.now(), patient: MAIN_PATIENT, from: req.body.from, text: req.body.text, time: 'Just now' };
  data.messages.push(entry);
  db.save(data);
  res.json(entry);
});

router.get('/appointments', (req, res) => {
  const data = db.load();
  res.json(data.appointments);
});
router.post('/appointments', (req, res) => {
  const data = db.load();
  const entry = { id: 'a' + Date.now(), patient: MAIN_PATIENT, ...req.body };
  data.appointments.unshift(entry);
  db.save(data);
  res.json(entry);
});

router.get('/review-items', (req, res) => {
  const data = db.load();
  res.json(data.reviewItems);
});
router.patch('/review-items/:id', (req, res) => {
  const data = db.load();
  const r = data.reviewItems.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  r.status = req.body.status;
  db.save(data);
  res.json(r);
});

router.get('/patients', (req, res) => {
  const data = db.load();
  res.json(data.patients);
});

router.get('/adherence', (req, res) => {
  const data = db.load();
  res.json(data.medicineAdherence);
});

router.post('/treatment-plans', (req, res) => {
  const data = db.load();
  const entry = { id: 'tp' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  data.treatmentPlans.push(entry);
  db.save(data);
  res.json(entry);
});

export default router;
