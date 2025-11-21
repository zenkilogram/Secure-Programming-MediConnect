import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import CSS
import './index.css';
import './Admin.css'; // CSS Admin yang kita buat tadi

// 2. Import Landing Page
import App from './App.jsx';

// 3. Import Halaman Punya Temanmu (Sesuai nama file di screenshot konflik)
// Pastikan nama file ini sesuai besar/kecil hurufnya di folder src kamu
import Login from './login.jsx';
import Register from './register.jsx';
// import Booking from './booking.jsx'; // Uncomment kalau file ini ada
// import Profile from './Profile.jsx'; // Uncomment kalau file ini ada

// 4. Import Halaman Admin (Punya Kamu)
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
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* --- ADMIN ROUTES --- */}
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
      <Route path="/admin/appointments" element={<ComingSoon page="Edit Appointment" />} />
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