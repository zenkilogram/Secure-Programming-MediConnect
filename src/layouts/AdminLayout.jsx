import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaUserCircle } from 'react-icons/fa';

// Pastikan css di import di sini atau di main.jsx
// import '../Admin.css'; 

const AdminLayout = ({ children, title }) => {
  return (
    <div className="admin-container">
      <Sidebar />
      
      <div className="admin-main">
        <header className="admin-header">
          <div className="user-info">
            <span>Hello, Admin!</span>
            <FaUserCircle size={32} color="#aaa" />
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