import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { FaEdit, FaFilter } from 'react-icons/fa';

const dummyHospitals = [
  { id: 1, name: 'St. Carolus Hospital', city: 'Jakarta Pusat' },
  { id: 2, name: 'Siloam Hospital', city: 'Jakarta Barat' },
  { id: 3, name: 'Hospital ABC', city: 'Bandung' },
];

const ManageHospitals = () => {
  return (
    <AdminLayout title="Manage Records">
      <div className="toolbar">
        <div className="search-group">
          <input 
            type="text" 
            placeholder="Search hospital by name" 
            className="search-input"
          />
          <button className="btn btn-secondary">
            <FaFilter /> Filter
          </button>
        </div>
        <Link to="/admin/hospitals/add" className="btn btn-primary">
          Add Hospital
        </Link>
      </div>

      <div className="list-container">
        {dummyHospitals.map((hospital) => (
          <div key={hospital.id} className="list-item">
            <div className="list-info">
              <h4>{hospital.name}</h4>
              <p>{hospital.city}</p>
            </div>
            <Link to={`/admin/hospitals/${hospital.id}/edit`} className="btn btn-secondary">
              <FaEdit /> Edit
            </Link>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageHospitals;