import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import DocumentRequest from './components/DocumentRequest';
import AdminPortal from './components/AdminPortal';
import ClaimSlip from './components/ClaimSlip';
import './styles/common.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header user={user} onLogout={handleLogout} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                !user ? (
                  showRegister ? (
                    <Register onBack={() => setShowRegister(false)} />
                  ) : (
                    <Login 
                      onLogin={handleLogin} 
                      onRegister={() => setShowRegister(true)} 
                    />
                  )
                ) : user.role === 'admin' ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/request" replace />
                )
              } 
            />
            <Route 
              path="/request" 
              element={user && user.role === 'student' ? <DocumentRequest user={user} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/admin" 
              element={user && user.role === 'admin' ? <AdminPortal /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/claim/:id" 
              element={<ClaimSlip />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;