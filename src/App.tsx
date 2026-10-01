import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/AuthState';
import { AppProvider } from './store/AppState';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/landing/Landing';
import PatientLogin from './pages/landing/PatientLogin';
import DoctorLogin from './pages/landing/DoctorLogin';
import PatientLayout from './layouts/PatientLayout';
import PatientHome from './pages/patient/PatientHome';
import PatientMedicines from './pages/patient/PatientMedicines';
import Symptoms from './pages/patient/Symptoms';
import AddSymptom from './pages/patient/AddSymptom';
import PatientCalendar from './pages/patient/PatientCalendar';
import PatientMessages from './pages/patient/PatientMessages';
import PatientProfile from './pages/patient/PatientProfile';
import DoctorLayout from './layouts/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import ReviewCenter from './pages/doctor/ReviewCenter';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorPatientProfile from './pages/doctor/DoctorPatientProfile';
import TreatmentPlans from './pages/doctor/TreatmentPlans';
import Prescriptions from './pages/doctor/Prescriptions';
import Adherence from './pages/doctor/Adherence';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorMessages from './pages/doctor/DoctorMessages';
import Reports from './pages/doctor/Reports';
import DoctorSettings from './pages/doctor/DoctorSettings';
import CaregiverDashboard from './pages/caregiver/CaregiverDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/patient" element={<PatientLogin />} />
            <Route path="/login/doctor" element={<DoctorLogin />} />

            <Route path="/app" element={<ProtectedRoute role="patient"><PatientLayout /></ProtectedRoute>}>
              <Route index element={<PatientHome />} />
              <Route path="medicines" element={<PatientMedicines />} />
              <Route path="symptoms" element={<Symptoms />} />
              <Route path="symptoms/new" element={<AddSymptom />} />
              <Route path="calendar" element={<PatientCalendar />} />
              <Route path="messages" element={<PatientMessages />} />
              <Route path="profile" element={<PatientProfile />} />
            </Route>

            <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorLayout /></ProtectedRoute>}>
              <Route index element={<DoctorDashboard />} />
              <Route path="review" element={<ReviewCenter />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="patients/:name" element={<DoctorPatientProfile />} />
              <Route path="treatment-plans" element={<TreatmentPlans />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="adherence" element={<Adherence />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="messages" element={<DoctorMessages />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<DoctorSettings />} />
            </Route>

            <Route path="/caregiver" element={<CaregiverDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
