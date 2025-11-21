import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaCamera, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '', // <-- SUDAH DIPERBAIKI JADI 'specialty'
    hospital_id: '',
    education: '',
    photo: null,
  });

 // --- FETCH DATA (READ) ---
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await api.get(`/doctors/${id}`);
        const data = response.data.data || response.data;
        
        setFormData({
            name: data.name || '',
            specialty: data.specialty || '',
            hospital_id: data.hospital_id || '', 
            education: data.education || '',
            photo: null 
        });

        // --- LOGIKA BARU: PAKAI PHOTO_URL LANGSUNG ---
        if (data.photo_url) {
            // Backend sudah kasih URL lengkap, kita pakai saja!
            setPreviewImage(data.photo_url);
            console.log("✅ FOTO DITEMUKAN:", data.photo_url);
        } else {
            // Kalau kosong, pakai default
            setPreviewImage("https://cdn-icons-png.flaticon.com/512/3774/3774299.png");
        }

      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

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

  // --- UPDATE DATA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('specialty', formData.specialty); // <-- KIRIM SEBAGAI 'specialty'
    if(formData.hospital_id) dataToSend.append('hospital_id', formData.hospital_id);
    dataToSend.append('education', formData.education);
    
    if (formData.photo) {
      dataToSend.append('photo', formData.photo);
    }

    // Wajib buat Laravel kalau ada file upload di method PUT/PATCH
    dataToSend.append('_method', 'PUT');

    try {
      await api.post(`/doctors/${id}`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Data dokter berhasil diperbarui!");
      navigate('/admin/doctors');
    } catch (error) {
      console.error("Error updating:", error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout title="Edit Doctor"><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout title="Edit Doctor">
      <form onSubmit={handleSubmit}>
        <div className="form-grid" style={{display: 'flex', gap: '40px', flexDirection: 'row-reverse'}}>
          
          <div className="details-section" style={{flex: 2, border: '1px solid #eee', padding: '30px', borderRadius: '16px'}}>
             <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} />
             </div>

             <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Specialization</label>
                {/* Pastikan name="specialty" */}
                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="form-input" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} />
             </div>

             <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Hospital ID</label>
                <input type="number" name="hospital_id" value={formData.hospital_id} onChange={handleChange} className="form-input" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} />
             </div>

             <div className="form-group">
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Education</label>
                <textarea name="education" value={formData.education} onChange={handleChange} className="form-textarea" rows="4" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit'}} />
             </div>
          </div>

           <div className="profile-section" style={{flex: 1, border: '1px solid #eee', padding: '30px', borderRadius: '16px', textAlign: 'center', height: 'fit-content'}}>
            <div className="profile-pic-container" style={{position: 'relative', width: '150px', height: '150px', margin: '0 auto 20px'}}>
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '3px solid #536DFE'}}
                  onError={(e) => {
                    console.log("❌ Gagal muat gambar:", e.target.src);
                    // Fallback ke gambar default kalau error
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";
                   }}
                />
                <label htmlFor="photo-upload" style={{position: 'absolute', bottom: '5px', right: '5px', background: '#536DFE', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer'}}>
                    <FaCamera />
                </label>
                <input type="file" id="photo-upload" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
            </div>
            <h3>{formData.name}</h3>
            <p style={{color: '#536DFE'}}>{formData.specialty}</p>
          </div>

        </div>
        
        <div className="action-buttons" style={{display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee'}}>
          <Link to="/admin/doctors" className="btn btn-secondary" style={{textDecoration: 'none', padding: '12px 25px', border: '1px solid #ddd', borderRadius: '8px', color: '#333', background: 'white', display: 'flex', alignItems: 'center', gap: '8px'}}><FaArrowLeft /> Cancel</Link>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{padding: '12px 30px', background: '#536DFE', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600'}}><FaSave /> Save Changes</button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditDoctor;