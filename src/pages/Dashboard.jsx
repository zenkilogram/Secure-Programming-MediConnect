import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

const DashboardCard = ({ title, description, link }) => (
  <div className="card">
    <h3>{title}</h3>
    <p style={{marginBottom: '20px', color: '#666'}}>{description}</p>
    <Link to={link} className="btn btn-primary">
      Manage
    </Link>
  </div>
);

const Dashboard = () => {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="dashboard-grid">
        <DashboardCard 
          title="Edit Doctor"
          description="Add, edit, or remove doctor information."
          link="/admin/doctors"
        />
        <DashboardCard 
          title="Edit Hospital"
          description="Add, edit, or remove hospital information."
          link="/admin/hospitals"
        />
        <DashboardCard 
          title="Edit Appointment"
          description="Add or edit new appointment information."
          link="/admin/appointments"
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;