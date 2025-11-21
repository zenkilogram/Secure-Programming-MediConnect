import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import api from '../api'; // Import Axios

const ManageHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian
  const [loading, setLoading] = useState(true);

  // Fetch Data dari Database
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get('/hospitals');
        setHospitals(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  // Logic Search / Filter
  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hospital.address && hospital.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="Manage Records">
      {/* Toolbar: Search & Add Button */}
      <div className="toolbar" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center'}}>
        <div className="search-group" style={{display: 'flex', gap: '10px', flex: 1, maxWidth: '500px'}}>
          <input 
            type="text" 
            placeholder="Search hospital by name..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Search aktif saat mengetik
            style={{flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}}
          />
          <button className="btn btn-secondary" style={{padding: '0 20px', border: '1px solid #ddd', borderRadius: '8px', background: 'white'}}>
            <FaFilter /> Filter
          </button>
        </div>
        <Link to="/admin/hospitals/add" className="btn btn-primary" style={{padding: '12px 20px', background: '#536DFE', color: 'white', borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <FaPlus /> Add Hospital
        </Link>
      </div>

      {/* List Data */}
      <div className="list-container">
        {loading ? <p>Loading...</p> : (
          filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div key={hospital.id} className="list-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '12px', marginBottom: '15px', background: 'white'}}>
                <div className="list-info">
                  <h4 style={{margin: '0 0 5px 0', fontSize: '18px', color: '#1e1b4b'}}>{hospital.name}</h4>
                  <p style={{margin: 0, color: '#64748B'}}>{hospital.address || 'No address'}</p>
                </div>
                <Link to={`/admin/hospitals/${hospital.id}/edit`} className="btn btn-secondary" style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <FaEdit /> Edit
                </Link>
              </div>
            ))
          ) : (
            <p style={{textAlign: 'center', color: '#888'}}>No hospitals found.</p>
          )
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageHospitals;