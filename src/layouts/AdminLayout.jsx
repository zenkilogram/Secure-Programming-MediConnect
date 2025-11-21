import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaUserCircle, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLayout = ({ children, title }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dan data user
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");
    
    // Redirect ke home
    navigate("/");
  };

  return (
    <div className="admin-container">
      <Sidebar />
      
      <div className="admin-main">
        <header className="admin-header" style={{justifyContent: 'space-between'}}> {/* Ubah justify-content */}
          
          {/* TOMBOL BACK */}
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-secondary" 
            style={{padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px'}}
          >
            <FaArrowLeft /> Back
          </button>

          {/* USER PROFILE DENGAN DROPDOWN LOGOUT */}
          <div style={{position: 'relative'}}>
            <div 
              className="user-info" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{cursor: 'pointer'}}
            >
              <span>Hello, Admin!</span>
              <FaUserCircle size={32} color="#aaa" />
            </div>

            {/* DROPDOWN MENU */}
            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #eee',
                borderRadius: '8px',
                marginTop: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                minWidth: '150px',
                zIndex: 10
              }}>
                <button 
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '12px 15px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#d9534f',
                    textAlign: 'left'
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </header>
        
        <main className="admin-content">
          {title && <h2 className="page-title">{title}</h2>}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;