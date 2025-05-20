import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  // State for tracking sidebar collapsed state - we'll pass this to header
  const [isSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Handler to toggle mobile sidebar from header
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* The Sidebar component handles its own visibility */}
      <Sidebar />
      
      {/* Main content */}
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out`}>
        <Header 
          toggleMobileSidebar={toggleMobileSidebar} 
          isSidebarCollapsed={isSidebarCollapsed}
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
