// src/main.jsx (PERBARUI FILE INI)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './Admin.css';
// Import komponen User Landing Page
import App from './App.jsx'; 

// Import halaman Admin (ASUMSI SUDAH DIPINDAH KE src/pages/!)
import Dashboard from './pages/Dashboard.jsx';
import ManageDoctors from './pages/ManageDoctors.jsx';
import EditDoctor from './pages/EditDoctor.jsx';
import ManageHospitals from './pages/ManageHospitals.jsx';
import EditHospital from './pages/EditHospital.jsx';
// Import CSS Tailwind Anda
import './index.css'; 

// Halaman-halaman dummy yang belum dibuat
const ComingSoon = ({ page }) => (
    <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Coming Soon: {page}</h1>
        <p className="text-gray-500 mt-2">Halaman ini belum diimplementasikan.</p>
    </div>
);

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Route utama untuk Landing Page User */}
      <Route path="/" element={<App />} /> 
      
      {/* Route Landing Page Admin (Dashboard) */}
      <Route path="/admin" element={<Dashboard />} />
      
      {/* Routes Edit Doctor */}
      <Route path="/admin/doctors" element={<ManageDoctors />} />
      <Route path="/admin/doctors/:id/edit" element={<EditDoctor />} />
      <Route path="/admin/doctors/add" element={<ComingSoon page="Add Doctor" />} />

      {/* Routes Edit Hospital */}
      <Route path="/admin/hospitals" element={<ManageHospitals />} />
      <Route path="/admin/hospitals/:id/edit" element={<EditHospital />} />
      <Route path="/admin/hospitals/add" element={<ComingSoon page="Add Hospital" />} />

      {/* Routes lainnya sesuai Sidebar */}
      <Route path="/admin/appointments" element={<ComingSoon page="Edit Appointment" />} />
      <Route path="/admin/logs" element={<ComingSoon page="Logs" />} />
      
      {/* Optional: Error page atau redirect ke Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);