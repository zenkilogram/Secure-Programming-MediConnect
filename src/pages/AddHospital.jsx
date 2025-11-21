import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaCamera, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const AddHospital = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('address', formData.address);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('description', formData.description);
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }

    try {
      await api.post('/hospitals', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Rumah Sakit berhasil ditambahkan!");
      navigate('/admin/hospitals');
    } catch (error) {
      console.error("Error:", error);
      // Tampilkan pesan error yang lebih detail
      const msg = error.response?.data?.message || "Gagal menyimpan data.";
      alert(`Gagal: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Add New Hospital">
      <form onSubmit={handleSubmit}>
        <div className="hospital-hero" style={{display: 'flex', gap: '30px', marginBottom: '30px', alignItems: 'flex-start'}}>
           {/* Upload Foto */}
           <div style={{position: 'relative', width: '300px', height: '200px', flexShrink: 0, background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {previewImage ? (
                  <img src={previewImage} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px'}} />
              ) : (
                  <p style={{color: '#999'}}>No Image</p>
              )}
              <label htmlFor="add-hospital-upload" style={{
                  position: 'absolute', bottom: '10px', right: '10px', background: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                  <FaCamera color="#536DFE" />
              </label>
              <input type="file" id="add-hospital-upload" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
          </div>

          {/* Input Data */}
          <div style={{flex: 1}}>
            <div className="form-group" style={{marginBottom: '15px'}}>
               <label>Hospital Name *</label>
               <input type="text" name="name" required onChange={handleChange} className="form-input" style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}} />
            </div>
            <div className="form-group" style={{marginBottom: '15px'}}>
               <label>Address</label>
               <input type="text" name="address" onChange={handleChange} className="form-input" style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}} />
            </div>
            <div className="form-group">
               <label>Phone</label>
               <input type="text" name="phone" onChange={handleChange} className="form-input" style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}} />
            </div>
          </div>
        </div>

        <div className="form-group">
           <label>Description</label>
           <textarea name="description" onChange={handleChange} rows="4" className="form-textarea" style={{width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px'}}></textarea>
        </div>

        <div className="action-buttons" style={{display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px'}}>
          <Link to="/admin/hospitals" className="btn btn-secondary" style={{padding: '12px 25px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333'}}>Cancel</Link>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{padding: '12px 30px', background: '#536DFE', color: 'white', border: 'none', borderRadius: '8px'}}>Save Hospital</button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddHospital;