export type MedStatus = 'upcoming' | 'due' | 'taken' | 'snoozed' | 'unable';
export interface Medicine {
  id: string; name: string; time: string; period: 'Morning'|'Afternoon'|'Evening'|'Night';
  instructions: string; status: MedStatus;
}
export interface Symptom { id: string; name: string; severity: number; date: string; notes: string; }
export interface Message { id: string; from: 'patient'|'doctor'; text: string; time: string; }
export interface ReviewItem {
  id: string; patient: string; type: 'Patient update'|'Question'|'Adherence update'|'Follow-up';
  summary: string; time: string; status: 'new'|'reviewed';
}
export interface Appointment { id: string; patient: string; doctor: string; date: string; time: string; type: string; status: 'upcoming'|'completed'|'cancelled'; }

export const patient = { name: 'Meera Rao', doctor: 'Dr. Mantri Rama Krishna', age: 34 };

export const initialMedicines: Medicine[] = [
  { id: 'm1', name: 'Nux Vomica 6C', time: '8:00 AM', period: 'Morning', instructions: '2 drops, empty stomach', status: 'taken' },
  { id: 'm2', name: 'Arnica Montana 30C', time: '10:00 AM', period: 'Morning', instructions: '2 drops, empty stomach', status: 'due' },
  { id: 'm3', name: 'Belladonna 30C', time: '2:00 PM', period: 'Afternoon', instructions: '3 drops after food', status: 'upcoming' },
  { id: 'm4', name: 'Pulsatilla 200C', time: '7:00 PM', period: 'Evening', instructions: '2 drops before dinner', status: 'upcoming' },
];

export const initialSymptoms: Symptom[] = [
  { id: 's1', name: 'Mild headache', severity: 2, date: 'Sep 25, 9:41 AM', notes: 'Started after lunch, mild.' },
];

export const initialMessages: Message[] = [
  { id: 'msg1', from: 'doctor', text: 'How has the sleep been this week?', time: 'Yesterday, 6:12 PM' },
  { id: 'msg2', from: 'patient', text: 'A bit better, thank you!', time: 'Yesterday, 8:00 PM' },
];

export const initialReviewItems: ReviewItem[] = [
  { id: 'r1', patient: 'Meera Rao', type: 'Patient update', summary: 'Reported mild headache, severity 2/5.', time: '9:41 AM', status: 'new' },
  { id: 'r2', patient: 'Ravi Kumar', type: 'Adherence update', summary: '22/28 scheduled medicines recorded this week.', time: '8:15 AM', status: 'new' },
  { id: 'r3', patient: 'Nita Shah', type: 'Question', summary: '"Can I take this with food?"', time: 'Yesterday', status: 'new' },
  { id: 'r4', patient: 'Arjun Mehta', type: 'Follow-up', summary: 'Follow-up appointment scheduled for today.', time: 'Today', status: 'new' },
];

export const initialAppointments: Appointment[] = [
  { id: 'a1', patient: 'Meera Rao', doctor: 'Dr. Mantri Rama Krishna', date: 'Fri, Sep 29', time: '4:00 PM', type: 'Follow-up consultation', status: 'upcoming' },
  { id: 'a2', patient: 'Meera Rao', doctor: 'Dr. Mantri Rama Krishna', date: 'Aug 12', time: '11:00 AM', type: 'Initial consultation', status: 'completed' },
];

export const doctorPatients = [
  { id: 'p1', name: 'Meera Rao', age: 34, lastUpdate: 'Symptom update, 9:41 AM', adherence: '24/28' },
  { id: 'p2', name: 'Ravi Kumar', age: 52, lastUpdate: 'Adherence update, 8:15 AM', adherence: '22/28' },
  { id: 'p3', name: 'Nita Shah', age: 29, lastUpdate: 'Question, yesterday', adherence: '27/28' },
  { id: 'p4', name: 'Arjun Mehta', age: 45, lastUpdate: 'Follow-up today', adherence: '20/28' },
  { id: 'p5', name: 'Sunita Reddy', age: 41, lastUpdate: 'Adherence update, 2 days ago', adherence: '25/28' },
  { id: 'p6', name: 'Vikram Desai', age: 38, lastUpdate: 'Symptom update, yesterday', adherence: '19/28' },
  { id: 'p7', name: 'Priya Iyer', age: 27, lastUpdate: 'Question, 3 days ago', adherence: '28/28' },
  { id: 'p8', name: 'Karthik Subramaniam', age: 60, lastUpdate: 'Follow-up tomorrow', adherence: '21/28' },
  { id: 'p9', name: 'Fathima Beevi', age: 33, lastUpdate: 'Adherence update, today', adherence: '23/28' },
  { id: 'p10', name: 'Manoj Pillai', age: 49, lastUpdate: 'Symptom update, today', adherence: '18/28' },
  { id: 'p11', name: 'Anjali Nair', age: 31, lastUpdate: 'Question, today', adherence: '26/28' },
  { id: 'p12', name: 'Suresh Babu', age: 55, lastUpdate: 'Follow-up next week', adherence: '20/28' },
];

export interface MedicineAdherence { patient: string; medicine: string; scheduled: number; recorded: number; snoozed: number; unable: number; }
export const medicineAdherence: MedicineAdherence[] = [
  { patient: 'Meera Rao', medicine: 'Arnica Montana 30C', scheduled: 7, recorded: 6, snoozed: 1, unable: 0 },
  { patient: 'Meera Rao', medicine: 'Nux Vomica 6C', scheduled: 7, recorded: 6, snoozed: 0, unable: 1 },
  { patient: 'Meera Rao', medicine: 'Belladonna 30C', scheduled: 7, recorded: 6, snoozed: 1, unable: 0 },
  { patient: 'Meera Rao', medicine: 'Pulsatilla 200C', scheduled: 7, recorded: 6, snoozed: 1, unable: 0 },
  { patient: 'Ravi Kumar', medicine: 'Rhus Tox 30C', scheduled: 14, recorded: 11, snoozed: 2, unable: 1 },
  { patient: 'Ravi Kumar', medicine: 'Bryonia Alba 30C', scheduled: 14, recorded: 11, snoozed: 1, unable: 2 },
  { patient: 'Nita Shah', medicine: 'Calcarea Carb 200C', scheduled: 14, recorded: 13, snoozed: 1, unable: 0 },
  { patient: 'Nita Shah', medicine: 'Sepia 30C', scheduled: 14, recorded: 14, snoozed: 0, unable: 0 },
  { patient: 'Arjun Mehta', medicine: 'Lycopodium 30C', scheduled: 14, recorded: 10, snoozed: 3, unable: 1 },
  { patient: 'Arjun Mehta', medicine: 'Natrum Mur 30C', scheduled: 14, recorded: 10, snoozed: 2, unable: 2 },
  { patient: 'Sunita Reddy', medicine: 'Ignatia Amara 30C', scheduled: 14, recorded: 12, snoozed: 2, unable: 0 },
  { patient: 'Vikram Desai', medicine: 'Gelsemium 30C', scheduled: 14, recorded: 9, snoozed: 3, unable: 2 },
  { patient: 'Priya Iyer', medicine: 'Phosphorus 200C', scheduled: 14, recorded: 14, snoozed: 0, unable: 0 },
  { patient: 'Karthik Subramaniam', medicine: 'Silicea 30C', scheduled: 14, recorded: 10, snoozed: 2, unable: 2 },
  { patient: 'Fathima Beevi', medicine: 'Thuja Occidentalis 30C', scheduled: 14, recorded: 12, snoozed: 1, unable: 1 },
  { patient: 'Manoj Pillai', medicine: 'Kali Bichromicum 30C', scheduled: 14, recorded: 9, snoozed: 3, unable: 2 },
  { patient: 'Anjali Nair', medicine: 'Cina 30C', scheduled: 14, recorded: 13, snoozed: 1, unable: 0 },
  { patient: 'Suresh Babu', medicine: 'Carbo Vegetabilis 30C', scheduled: 14, recorded: 10, snoozed: 2, unable: 2 },
];
