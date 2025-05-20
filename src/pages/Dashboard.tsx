import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/layout/DashboardLyout';
import FarmerDashboardHome from '../components/Dashboard/FamerDashboardHome';
import AdminDashboardHome from '../components/Dashboard/AdminDashboardHome';


function Dashboard() {
 const { currentUser } = useAuth() as any;

  const isAdmin = currentUser?.role === 'admin';
  
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={isAdmin ? <AdminDashboardHome /> : <FarmerDashboardHome />} />
        {/* Add other routes as needed */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </DashboardLayout>
  );
}

export default Dashboard;
