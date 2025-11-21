// src/pages/ManageDoctors.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { FaEdit, FaFilter, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../api'; // Jembatan ke backend

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk search bar

  // --- 1. READ DATA (Ambil semua dokter) ---
  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors');
      // Sesuaikan dengan struktur JSON backendmu.
      // Kalau datanya dibungkus 'data', pakai response.data.data
      setDoctors(response.data.data || response.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Jangan alert error 401 karena sudah dihandle di api.js
      if (error.response?.status !== 401) {
         alert("Gagal mengambil data dokter.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // --- 2. DELETE FUNC (Hapus dokter) ---
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus dokter ini? Data yang dihapus tidak dapat dikembalikan.")) {
      try {
        await api.delete(`/doctors/${id}`);
        // Update tampilan: buang dokter yang id-nya dihapus dari state
        setDoctors(doctors.filter((doc) => doc.id !== id));
        alert("Dokter berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Gagal menghapus dokter.");
      }
    }
  };

  // --- 3. FILTER LOGIC (Search Bar Client-side) ---
  const filteredDoctors = doctors.filter((doc) => {
    if (!searchTerm) return true; // Kalau search kosong, tampilkan semua
    const searchLower = searchTerm.toLowerCase();
    // Cari berdasarkan nama ATAU spesialisasi (gunakan optional chaining ?. biar ga error kalau null)
    return (
      doc.name?.toLowerCase().includes(searchLower) ||
      doc.specialization?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout title="Manage Doctors">
      {/* Toolbar: Search & Add Button */}
      <div className="toolbar" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <div className="search-group" style={{display: 'flex', gap: '10px', flex: 1, maxWidth: '500px'}}>
          <input 
            type="text" 
            placeholder="Search doctor by name or specialization..." 
            className="search-input"
            style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update state saat mengetik
          />
          <button className="btn btn-secondary" style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 15px', border: '1px solid #ddd', borderRadius: '8px', background: 'white', cursor: 'pointer'}}>
            <FaFilter /> Filter
          </button>
        </div>
        <Link to="/admin/doctors/add" className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', background: '#536DFE', color: 'white', borderRadius: '8px', textDecoration: 'none'}}>
          <FaPlus /> Add Doctor
        </Link>
      </div>

      {/* Content List */}
      {loading ? (
        <p style={{textAlign: 'center', padding: '20px'}}>Loading data...</p>
      ) : (
        <div className="list-container" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="list-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '12px', background: 'white'}}>
                <div className="list-info" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                  {/* Menampilkan Foto (Jika ada) */}
                   <img 
                      src={doctor.photo_url || "https://via.placeholder.com/60"} 
                      alt={doctor.name} 
                      style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee'}}
                   />
                  <div>
                    <h4 style={{margin: '0 0 5px 0', fontSize: '18px', color: '#1e1b4b'}}>{doctor.name}</h4>
                    {/* Gunakan optional chaining (?.) dan fallback (||) untuk keamanan data null */}
                    <p style={{margin: 0, color: '#64748B'}}>{doctor.specialization || '-'} | {doctor.hospital?.name || 'No Hospital Assigned'}</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                  <Link to={`/admin/doctors/${doctor.id}/edit`} className="btn btn-secondary" style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', background: '#F1F5F9', color: '#1e1b4b', textDecoration: 'none'}}>
                    <FaEdit /> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(doctor.id)} 
                    className="btn btn-danger"
                    style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', border: '1px solid #EF4444', borderRadius: '8px', background: 'white', color: '#EF4444', cursor: 'pointer'}}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
             <div style={{textAlign: 'center', padding: '30px', color: '#888', border: '1px dashed #ddd', borderRadius: '12px'}}>
               {searchTerm ? `No doctors found matching "${searchTerm}"` : "No doctors data available."}
             </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageDoctors;