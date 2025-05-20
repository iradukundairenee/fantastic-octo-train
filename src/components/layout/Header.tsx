import { useAuth } from '../../contexts/useAuth';

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

interface User {
  name?: string;
  role?: 'admin' | 'farmer';
}

interface AuthContextType {
  currentUser: User | null;
}

function Header({ toggleMobileSidebar }: HeaderProps) {
  const { currentUser } = useAuth() as AuthContextType;
  
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            className="md:hidden -ml-1 mr-2 flex items-center justify-center h-10 w-10 rounded-md focus:outline-none"
            onClick={toggleMobileSidebar}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">
            {currentUser?.role === 'admin' ? 'Admin Dashboard' : 'Farmer Dashboard'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <span className="relative inline-block">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
          </span>
          
          {/* User profile */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium">{currentUser?.name?.charAt(0) || 'U'}</span>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
              {currentUser?.name || 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
