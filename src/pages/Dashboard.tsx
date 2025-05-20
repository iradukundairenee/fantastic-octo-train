import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import DashboardLayout from '../components/layout/DashboardLyout';
import FarmerDashboardHome from '../components/Dashboard/FamerDashboardHome';
import AdminDashboardHome from '../components/Dashboard/AdminDashboardHome';

// Define the user type
interface User {
  role: string;
  // Add other properties as needed
}

function Dashboard() {
  // Type the currentUser properly instead of using "any"
  const { currentUser } = useAuth() as { currentUser: User };

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
