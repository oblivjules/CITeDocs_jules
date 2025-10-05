import React, { useState } from 'react';
import '../styles/Login.css';

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@cit.edu' && password === 'admin123') {
      onLogin({ 
        id: '1', 
        name: 'Admin User', 
        email: email, 
        role: 'admin' 
      });
    } else if (email === 'student@cit.edu' && password === 'student123') {
      onLogin({ 
        id: '2', 
        name: 'John Doe', 
        email: email, 
        role: 'student',
        studentId: '2024-001'
      });
    } else {
      setError('Invalid credentials. Try admin@cit.edu/admin123 or student@cit.edu/student123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h2>Welcome to CITeDocs</h2>
          <p>Sign in to request and manage your documents</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
            Sign In
          </button>
          
          <button type="button" className="btn btn-outline" style={{ width: '100%' }} onClick={onRegister}>
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}