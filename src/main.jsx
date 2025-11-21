import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import CSS
import './index.css';
import './Admin.css';

// 2. Import Landing Page & Public Pages
import App from './App.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import Booking from './Booking.jsx';
import AboutUs from './aboutus.jsx';
import Profile from './profile.jsx';
import Specialities from './specialities.jsx';
import SpecialityDetail from './specdetail.jsx';
import Doctor from './doctor.jsx';

// 3. Import Halaman Admin (Punya Kamu)
import Dashboard from './pages/Dashboard.jsx';
import ManageDoctors from './pages/ManageDoctors.jsx';
import EditDoctor from './pages/EditDoctor.jsx';
import ManageHospitals from './pages/ManageHospitals.jsx';
import EditHospital from './pages/EditHospital.jsx';
import AddDoctor from './pages/AddDoctor.jsx';
import AddHospital from './pages/AddHospital';

// Komponen Placeholder untuk halaman yang belum jadi
const ComingSoon = ({ page }) => (
    <div className="p-8 text-center bg-white rounded-lg shadow-lg m-10">
        <h1 className="text-3xl font-bold text-gray-800">Coming Soon: {page}</h1>
    </div>
);

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* --- PUBLIC ROUTES (Punya Temanmu) --- */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/specialities" element={<Specialities />} />
      <Route path="/specialities/:id" element={<SpecialityDetail />} />
      <Route path="/doctor" element={<Doctor />} />
      
      {/* --- ADMIN ROUTES (Punya Kamu) --- */}
      <Route path="/admin" element={<Dashboard />} />
      
      {/* Doctors */}
      <Route path="/admin/doctors" element={<ManageDoctors />} />
      <Route path="/admin/doctors/add" element={<AddDoctor />} />
      <Route path="/admin/doctors/:id/edit" element={<EditDoctor />} />

      {/* Hospitals */}
      <Route path="/admin/hospitals" element={<ManageHospitals />} />
      <Route path="/admin/hospitals/add" element={<AddHospital />} />
      <Route path="/admin/hospitals/:id/edit" element={<EditHospital />} />

      {/* Others */}
      <Route path="/admin/appointments" element={<ComingSoon page="Appointments" />} />
      <Route path="/admin/logs" element={<ComingSoon page="Logs" />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);