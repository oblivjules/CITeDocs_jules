import { useState } from 'react';
import { User } from '../../users/User';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (email, password) => {
    setError(null);
    if (email === 'admin@cit.edu' && password === 'admin123') {
      const adminUser = new User('1', 'Admin User', email, 'admin');
      setUser(adminUser);
      return adminUser;
    } else if (email === 'student@cit.edu' && password === 'student123') {
      const studentUser = new User('2', 'John Doe', email, 'student', '2024-001');
      setUser(studentUser);
      return studentUser;
    } else {
      setError('Invalid credentials. Try admin@cit.edu/admin123 or student@cit.edu/student123');
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, error, login, logout };
}