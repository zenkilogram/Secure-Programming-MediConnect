// src/pages/AddDoctor.jsx
import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaCamera, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    hospital_id: '',
    education: '',
    password: 'password123', // Default password untuk dokter baru
    photo: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // --- HANDLE SUBMIT (CREATE BARU) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('email', `${formData.name.replace(/\s+/g, '').toLowerCase()}@mediconnect.com`); // Generate email dummy
    dataToSend.append('password', formData.password);
    dataToSend.append('role', 'doctor'); // Pastikan role-nya doctor
    dataToSend.append('specialty', formData.specialty);
    // Hanya kirim hospital_id jika diisi
    if(formData.hospital_id) dataToSend.append('hospital_id', formData.hospital_id);
    dataToSend.append('education', formData.education);
    
    if (formData.photo) {
      dataToSend.append('photo', formData.photo);
    }

    try {
      // Pakai POST biasa untuk create
      await api.post('/doctors', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Dokter baru berhasil ditambahkan!");
      navigate('/admin/doctors');
    } catch (error) {
      console.error("Error creating:", error);
      // Tampilkan pesan error dari backend jika ada validasi gagal
      const errorMsg = error.response?.data?.message || "Gagal menambahkan dokter. Cek inputan.";
      alert(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Add New Doctor">
      <form onSubmit={handleSubmit}>
        <div className="form-grid" style={{display: 'flex', gap: '40px', flexDirection: 'row-reverse'}}>
          
          {/* Kolom Kanan: Form Input */}
          <div className="details-section" style={{flex: 2, border: '1px solid #eee', padding: '30px', borderRadius: '16px'}}>
             <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="e.g., Dr. Jane Doe" required style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} />
             </div>
             <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Specialty *</label>
                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="form-input" placeholder="e.g., Pediatrician" required style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} />
             </div>
             <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Hospital ID </label>
                <input type="number" name="hospital_id" value={formData.hospital_id} onChange={handleChange} className="form-input" placeholder="Hospital ID number" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} />
             </div>
             <div className="form-group">
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Education Background</label>
                <textarea name="education" value={formData.education} onChange={handleChange} className="form-textarea" rows="4" placeholder="Education history..." style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit'}} />
             </div>
          </div>

           {/* Kolom Kiri: Foto Profil */}
           <div className="profile-section" style={{flex: 1, border: '1px solid #eee', padding: '30px', borderRadius: '16px', textAlign: 'center', height: 'fit-content'}}>
            <div className="profile-pic-container" style={{position: 'relative', width: '150px', height: '150px', margin: '0 auto 20px'}}>
                <img src={previewImage || "https://via.placeholder.com/150?text=Upload+Photo"} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '3px solid #ddd'}} />
                <label htmlFor="photo-upload-add" style={{position: 'absolute', bottom: '5px', right: '5px', background: '#536DFE', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer'}}>
                    <FaCamera />
                </label>
                <input type="file" id="photo-upload-add" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
            </div>
            <p style={{color: '#666'}}>Default Password: <b>password123</b></p>
          </div>
        </div>
        
        <div className="action-buttons" style={{display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee'}}>
          <Link to="/admin/doctors" className="btn btn-secondary" style={{textDecoration: 'none', padding: '12px 25px', border: '1px solid #ddd', borderRadius: '8px', color: '#333', background: 'white', display: 'flex', alignItems: 'center', gap: '8px'}}><FaArrowLeft /> Cancel</Link>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{padding: '12px 30px', background: '#536DFE', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}><FaSave /> {saving ? 'Saving...' : 'Save Doctor'}</button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddDoctor;