import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaTimes, FaPlus } from 'react-icons/fa';

const ScheduleCard = ({ time }) => (
  <div className="time-slot">
    <span>{time}</span>
    <FaTimes style={{cursor: 'pointer', color: '#EF4444'}} />
  </div>
);

const EditDoctor = () => {
  return (
    <AdminLayout title="Edit Doctor">
      <div className="form-grid">
        {/* Kolom Kiri: Info Dokter */}
        <div className="profile-section">
          <div className="profile-pic">
             {/* Placeholder Image */}
             <img src="https://via.placeholder.com/150" alt="Doctor" />
          </div>
          <h3>Dr. Aesir</h3>
          <p style={{color: '#536DFE', marginBottom: '20px'}}>Orthodology Specialist</p>

          <div style={{textAlign: 'left', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px'}}>
            <label style={{fontWeight: '600', display: 'block', marginBottom: '8px'}}>Education Background</label>
            <textarea 
              className="form-textarea"
              rows="4"
              defaultValue="Sarjana Kedokteran, Universitas Pelita Harapan"
            />
          </div>
        </div>

        {/* Kolom Kanan: Jadwal */}
        <div className="details-section">
          <h4 style={{marginBottom: '15px', color: '#1e1b4b'}}>Regular Schedule</h4>
          
          <div className="schedule-grid">
            <div className="schedule-box">
              <h5 style={{marginTop: 0}}>Monday</h5>
              <ScheduleCard time="09:00 - 12:00" />
              <ScheduleCard time="13:00 - 16:00" />
              <button className="btn btn-secondary" style={{width: '100%', marginTop: '10px'}}>
                 <FaPlus /> Add
              </button>
            </div>

            <div className="schedule-box">
              <h5 style={{marginTop: 0}}>Wednesday</h5>
              <ScheduleCard time="08:00 - 11:00" />
              <ScheduleCard time="15:00 - 18:00" />
              <button className="btn btn-secondary" style={{width: '100%', marginTop: '10px'}}>
                 <FaPlus /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn btn-danger">Delete</button>
        <button className="btn btn-primary">Save</button>
      </div>
    </AdminLayout>
  );
};

export default EditDoctor;