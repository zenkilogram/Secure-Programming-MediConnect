import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FaPlus, FaTimes, FaCamera, FaTrash, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

// --- KOMPONEN MODAL (Untuk Tambah Fasilitas) ---
const AddFacilityModal = ({ isOpen, onClose, hospitalId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name || !hospitalId) {
        alert("Nama fasilitas wajib diisi!");
        return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('hospital_id', hospitalId);
    formData.append('name', name);
    formData.append('description', description);
    if (photo) formData.append('photo', photo);

    try {
      await api.post('/facilities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Fasilitas berhasil ditambahkan!");
      onSuccess(); 
      onClose();   
      setName(''); setDescription(''); setPhoto(null); setPreview(null);
    } catch (error) {
      console.error("Gagal tambah fasilitas:", error);
      // Tampilkan pesan error detail dari backend
      alert("Gagal: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
          background: 'white', padding: '30px', borderRadius: '12px', width: '400px', position: 'relative'
      }}>
        <button onClick={onClose} style={{position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer'}}>
          <FaTimes />
        </button>
        
        <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e1b4b'}}>Add Facility</h3>
        
        <div className="form-group" style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Facility Name</label>
          <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}} />
        </div>
        
        <div className="form-group" style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Description</label>
          <textarea className="form-textarea" rows="3" value={description} onChange={e => setDescription(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}} />
        </div>
        
        <div className="form-group" style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Upload Photo</label>
          <div className="upload-box" style={{border: '2px dashed #ddd', padding: '20px', textAlign: 'center', borderRadius: '8px', position: 'relative'}}>
            {preview ? (
                <img src={preview} alt="Preview" style={{maxHeight: '100px', display: 'block', margin: '0 auto'}} />
            ) : (
                <>
                    <FaCamera size={24} color="#ccc" />
                    <p style={{margin: '5px 0 0', color: '#999', fontSize: '12px'}}>Click to Upload</p>
                </>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} />
          </div>
        </div>
        
        <div className="modal-actions" style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
          <button onClick={onClose} className="btn" style={{padding: '10px 20px', border: '1px solid #ddd', background: 'white', borderRadius: '8px'}}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="btn" style={{padding: '10px 20px', background: '#536DFE', color: 'white', border: 'none', borderRadius: '8px'}}>
            {loading ? 'Saving...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA EDIT HOSPITAL ---
const EditHospital = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // State Data RS
  const [hospital, setHospital] = useState({
      name: '', address: '', phone: '', description: '', image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  
  // State Fasilitas
  const [facilities, setFacilities] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getImageUrl = (path) => {
      if (!path) return "https://via.placeholder.com/300x200";
      if (path.startsWith('http')) return path;
      return `http://localhost:8000/storage/${path}`;
  };

  // 1. Fetch Data
  const fetchData = async () => {
    try {
        const hospitalRes = await api.get(`/hospitals/${id}`);
        const data = hospitalRes.data;
        
        setHospital({
            name: data.name || '',
            address: data.address || '',
            phone: data.phone || '',
            description: data.description || '',
            image: null 
        });
        setPreviewImage(getImageUrl(data.image));

        const facilitiesRes = await api.get('/facilities');
        const allFacilities = facilitiesRes.data.data || facilitiesRes.data; 
        const myFacilities = allFacilities.filter(f => String(f.hospital_id) === String(id));
        
        setFacilities(myFacilities);

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      fetchData();
  }, [id]);

  const handleHospitalChange = (e) => {
      setHospital({...hospital, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setHospital({ ...hospital, image: file });
        setPreviewImage(URL.createObjectURL(file));
    }
  };

  const saveHospital = async () => {
      setSaving(true);
      const formData = new FormData();
      formData.append('name', hospital.name);
      formData.append('address', hospital.address);
      formData.append('phone', hospital.phone);
      formData.append('description', hospital.description);
      if(hospital.image instanceof File) {
          formData.append('image', hospital.image);
      }
      formData.append('_method', 'PUT'); 

      try {
          await api.post(`/hospitals/${id}`, formData, {
             headers: { 'Content-Type': 'multipart/form-data' }
          });
          alert("Data Rumah Sakit berhasil disimpan!");
      } catch (error) {
          console.error("Gagal update RS:", error);
          alert("Gagal menyimpan perubahan.");
      } finally {
          setSaving(false);
      }
  };

  // --- FITUR BARU: DELETE HOSPITAL ---
  const handleDeleteHospital = async () => {
    if (window.confirm("Apakah Anda yakin ingin MENGHAPUS Rumah Sakit ini? Semua data fasilitas terkait juga akan hilang.")) {
      try {
        await api.delete(`/hospitals/${id}`);
        alert("Rumah Sakit berhasil dihapus.");
        navigate('/admin/hospitals'); // Kembali ke list
      } catch (error) {
        console.error("Gagal hapus:", error);
        alert("Gagal menghapus rumah sakit.");
      }
    }
  };

  const handleDeleteFacility = async (facilityId) => {
      if(!window.confirm("Hapus fasilitas ini?")) return;
      try {
          await api.delete(`/facilities/${facilityId}`);
          setFacilities(facilities.filter(f => f.id !== facilityId));
      } catch (error) {
          console.error(error);
          alert("Gagal menghapus fasilitas.");
      }
  };

  if (loading) return <AdminLayout title="Edit Hospital"><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout title="Edit Hospital">
      {/* Bagian Atas: Edit Info RS */}
      <div className="hospital-hero" style={{display: 'flex', gap: '30px', marginBottom: '30px', alignItems: 'flex-start'}}>
        <div style={{position: 'relative', width: '300px', height: '200px', flexShrink: 0}}>
            <img 
              src={previewImage} 
              alt="Hospital" 
              style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', border: '1px solid #eee'}}
            />
            <label htmlFor="hero-upload" style={{
                position: 'absolute', bottom: '10px', right: '10px', background: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
                <FaCamera color="#536DFE" />
            </label>
            <input type="file" id="hero-upload" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
        </div>

        <div style={{flex: 1}}>
          <div className="form-group" style={{marginBottom: '15px'}}>
             <label style={{fontSize: '12px', fontWeight: '600', color: '#666'}}>Hospital Name</label>
             <input type="text" name="name" value={hospital.name} onChange={handleHospitalChange} className="form-input" style={{width: '100%', padding: '8px', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ddd', borderRadius: '6px'}} />
          </div>
          <div className="form-group" style={{marginBottom: '15px'}}>
             <label style={{fontSize: '12px', fontWeight: '600', color: '#666'}}>Address</label>
             <input type="text" name="address" value={hospital.address} onChange={handleHospitalChange} className="form-input" style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px'}} />
          </div>
          <div className="form-group">
             <label style={{fontSize: '12px', fontWeight: '600', color: '#666'}}>Phone</label>
             <input type="text" name="phone" value={hospital.phone} onChange={handleHospitalChange} className="form-input" style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px'}} />
          </div>
        </div>
      </div>

      <div className="form-group" style={{marginBottom: '30px'}}>
        <label style={{fontWeight: '600', display: 'block', marginBottom: '10px'}}>Hospital Description</label>
        <textarea 
          name="description"
          value={hospital.description}
          onChange={handleHospitalChange}
          className="form-textarea" 
          rows="4"
          style={{width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit', lineHeight: '1.5'}}
        />
      </div>
      
      {/* Bagian Bawah: Manage Facilities */}
      <div style={{marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
        <label style={{fontWeight: '600', display: 'block', marginBottom: '15px', fontSize: '18px'}}>Hospital's Facilities</label>
        
        <div className="facilities-scroll" style={{display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '15px'}}>
          {facilities.map((fac) => (
              <div key={fac.id} className="facility-card" style={{
                  minWidth: '120px', maxWidth: '120px', border: '1px solid #eee', borderRadius: '10px', padding: '10px', textAlign: 'center', position: 'relative', background: 'white'
              }}>
                <button onClick={() => handleDeleteFacility(fac.id)} style={{
                    position: 'absolute', top: '-5px', right: '-5px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px'
                }}>
                    <FaTimes />
                </button>
                <img 
                    src={getImageUrl(fac.photo)} 
                    alt={fac.name} 
                    style={{width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', marginBottom: '8px'}} 
                />
                <span style={{display: 'block', fontSize: '12px', fontWeight: '600', color: '#333'}}>{fac.name}</span>
              </div>
          ))}
          
          <div 
            className="add-facility-btn" 
            onClick={() => setIsModalOpen(true)}
            style={{
                minWidth: '120px', height: '115px', border: '2px dashed #536DFE', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#536DFE', background: '#F8FAFC'
            }}
          >
            <FaPlus size={24} />
            <span style={{fontSize: '12px', fontWeight: '600', marginTop: '5px'}}>Add New</span>
          </div>
        </div>
      </div>
      
      {/* Tombol Aksi (Save & Delete) */}
      <div className="action-buttons" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee'}}>
         {/* Tombol DELETE Kiri Bawah (Merah) */}
         <button onClick={handleDeleteHospital} className="btn btn-danger" style={{padding: '12px 20px', background: '#FFF', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <FaTrash /> Delete Hospital
        </button>

        <div style={{display: 'flex', gap: '10px'}}>
            <Link to="/admin/hospitals" className="btn btn-secondary" style={{textDecoration: 'none', padding: '12px 25px', border: '1px solid #ddd', borderRadius: '8px', color: '#333', background: 'white', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <FaArrowLeft /> Back
            </Link>
            <button onClick={saveHospital} disabled={saving} className="btn btn-primary" style={{padding: '12px 30px', background: '#536DFE', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <FaSave /> {saving ? 'Saving...' : 'Save All Changes'}
            </button>
        </div>
      </div>

      <AddFacilityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        hospitalId={id}
        onSuccess={fetchData} 
      />
    </AdminLayout>
  );
};

export default EditHospital;