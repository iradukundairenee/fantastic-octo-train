import { createContext, useState, useContext } from 'react';

const AuthContext:any = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }:any) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate checking if user is logged in
  useState(() => {
    const user:any = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  function login(credentials: { phoneNumber: any; pin: any; role: string; }) {
    // For demo, we'll just check if phoneNumber and PIN are provided
    if (credentials.phoneNumber && credentials.pin) {
      const user = {
        phoneNumber: credentials.phoneNumber,
        role: credentials.role,
        name: credentials.role === 'farmer' ? 'John Farmer' : 'Admin User'
      };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem('user');
    setCurrentUser(null);
    return true;
  }

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
