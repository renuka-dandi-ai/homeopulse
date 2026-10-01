# HomeoPulse

A patient–doctor care coordination prototype with a real frontend and backend.

## Structure
```
homeopulse/
  src/            React + TypeScript frontend (Vite)
  server/         Node.js + Express backend API
```

## Run it locally

**1. Start the backend** (in one terminal):
```
cd server
npm install
npm run dev
```
Runs on `http://localhost:4000`. Data is stored in `server/db.json` (auto-created on first run, seeded with demo data). Delete this file to reset to the seed data.

**2. Start the frontend** (in another terminal):
```
npm install
npm run dev
```
Runs on `http://localhost:5173` and talks to the backend at `http://localhost:4000/api` by default. To point it at a different backend URL (e.g. after deploying the server), copy `.env.example` to `.env` and set `VITE_API_URL`.

## Demo logins

**Doctor** (phone + password):
- Phone: `9876500000`
- Password: `homeopulse123`

**Patient** (phone + OTP):
- Phone: anything, e.g. `9123456789`
- OTP: there's no real SMS gateway wired up, so the API returns the OTP directly in the response (`devOtp`) and logs it to the server console. It's always `123456` for this prototype.

## What's real vs. mock

- **Real**: login (JWT-based), medicines status, symptom entries, messages (two-way, patient to doctor), appointment booking, review center, treatment plan submission — all persisted server-side in `server/db.json` and shared between whoever is logged in as the patient and whoever is logged in as the doctor.
- **Still static/demo**: the list of other mock patients (Ravi Kumar, Nita Shah, etc.) shown on the doctor's side — they don't have real logins in this prototype, only "Meera Rao" does. Adherence numbers, caregiver, and admin pages are illustrative sample data.

## Before production

- Replace the OTP flow with a real SMS provider (Twilio, MSG91, etc.) — right now no SMS is actually sent.
- Replace `server/db.json` with a real database (Postgres/MySQL/MongoDB).
- Move `JWT_SECRET` and doctor credentials out of source and into environment variables / a secrets manager.
- Add HTTPS, rate limiting, and input validation on the backend.
- Add real multi-patient and multi-doctor account support (currently single-clinic, single-demo-patient).
