import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambah useNavigate
import AdminLayout from '../layouts/AdminLayout';
import { FaEdit, FaFilter, FaTrash, FaPlus } from 'react-icons/fa';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // URL Backend Temanmu
  const API_BASE_URL = "http://localhost:8000/api/v1"; 

  // Fungsi untuk mengambil token (asumsi sudah login)
  const getToken = () => localStorage.getItem('auth_token'); 

  // 1. READ (GET)
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const token = getToken();
    if (!token) {
        alert("Anda belum login!");
        return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/doctors`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Wajib ada karena auth:sanctum
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error("Gagal ambil data");
      
      const data = await response.json();
      // Sesuaikan 'data.data' tergantung format response json temanmu
      setDoctors(data.data || data); 
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // 2. DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Hapus dokter ini?")) return;

    const token = getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Update UI
        setDoctors(doctors.filter(doc => doc.id !== id));
      } else {
        alert("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 3. SEARCH / FILTER (Client Side)
  const filteredDoctors = doctors.filter((doc) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    // Sesuaikan nama properti dengan database (misal: name, specialist, dll)
    return (
      doc.name?.toLowerCase().includes(searchLower) ||
      doc.specialization?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout title="Manage Records">
      <div className="toolbar">
        <div className="search-group">
          <input 
            type="text" 
            placeholder="Search doctor..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-secondary"><FaFilter /> Filter</button>
        </div>
        <Link to="/admin/doctors/add" className="btn btn-primary"><FaPlus /> Add Doctor</Link>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="list-container">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="list-item">
              <div className="list-info">
                <h4>{doctor.name}</h4>
                <p>{doctor.specialization}</p>
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <Link to={`/admin/doctors/${doctor.id}/edit`} className="btn btn-secondary"><FaEdit /> Edit</Link>
                <button onClick={() => handleDelete(doctor.id)} className="btn btn-danger"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageDoctors;