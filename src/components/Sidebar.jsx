import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserMd, FaHospital, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';

const navItems = [
  { name: 'Edit Doctor', icon: FaUserMd, path: '/admin/doctors' },
  { name: 'Edit Hospital', icon: FaHospital, path: '/admin/hospitals' },
  { name: 'Edit Appointment', icon: FaCalendarCheck, path: '/admin/appointments' },
  { name: 'Logs', icon: FaClipboardList, path: '/admin/logs' },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">MediConnect</div>
      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <item.icon className="nav-icon" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;