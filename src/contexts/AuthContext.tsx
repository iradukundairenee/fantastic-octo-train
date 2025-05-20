import {
  createContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';

// Define user type
type User = {
  phoneNumber: string;
  role: string;
  name: string;
};

// Define login credentials type
type Credentials = {
  phoneNumber: string;
  pin: string;
  role: string;
};

// Define context value type
interface AuthContextType {
  currentUser: User | null;
  login: (credentials: Credentials) => boolean;
  logout: () => boolean;
  loading: boolean;
}

// Create context with default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function login(credentials: Credentials): boolean {
    const { phoneNumber, pin, role } = credentials;
    if (phoneNumber && pin) {
      const user: User = {
        phoneNumber,
        role,
        name: role === 'farmer' ? 'John Farmer' : 'Admin User',
      };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  }

  function logout(): boolean {
    localStorage.removeItem('user');
    setCurrentUser(null);
    return true;
  }

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

