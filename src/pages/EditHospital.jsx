import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaPlus, FaTimes, FaCamera } from 'react-icons/fa';

const AddFacilityModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer'}}>
          <FaTimes />
        </button>
        
        <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e1b4b'}}>Add Facility</h3>
        
        <div className="form-group">
          <label>Facility Name</label>
          <input type="text" className="form-input" placeholder="Facility Name" />
        </div>
        
        <div className="form-group">
          <label>Facility Description</label>
          <textarea className="form-textarea" rows="3" placeholder="Facility Description" />
        </div>
        
        <div className="form-group">
          <label>Upload Photo</label>
          <div className="upload-box">
            <FaCamera size={24} />
            <p>Click to Upload Photo</p>
          </div>
        </div>
        
        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button onClick={onClose} className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  );
};

const EditHospital = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <AdminLayout title="Edit Hospital">
      {/* Header Info RS */}
      <div className="hospital-hero">
        <img 
          src="https://via.placeholder.com/300x200" 
          alt="Hospital" 
          className="hospital-img"
        />
        <div>
          <h3 style={{margin: '0 0 10px 0', fontSize: '24px'}}>Siloam Hospital</h3>
          <p style={{color: '#666', margin: 0}}>Jl. Perjuangan No.Kav.9, Kebon Jeruk, Jakarta Barat</p>
          <p style={{color: '#999', fontSize: '14px', marginTop: '5px'}}>(021) 2567 7888 / 1-500-911</p>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="form-group">
        <label>Hospital Description</label>
        <textarea 
          className="form-textarea" 
          rows="4"
          defaultValue="Siloam Hospitals Kebon Jeruk merupakan rumah sakit yang terletak secara strategis di Jakarta Barat..."
        />
      </div>
      
      {/* Fasilitas */}
      <div style={{marginTop: '30px'}}>
        <label style={{fontWeight: '600', display: 'block', marginBottom: '10px'}}>Hospital's Facilities</label>
        <div className="facilities-scroll">
          <div className="facility-card">
            <img src="https://via.placeholder.com/100" alt="MRI" />
            <span>MRI</span>
          </div>
          <div className="facility-card">
             <img src="https://via.placeholder.com/100" alt="Canteen" />
            <span>Canteen</span>
          </div>
          
          {/* Tombol Tambah */}
          <div className="add-facility-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus />
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn btn-danger">Delete</button>
        <button className="btn btn-primary">Save</button>
      </div>

      <AddFacilityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AdminLayout>
  );
};

export default EditHospital;