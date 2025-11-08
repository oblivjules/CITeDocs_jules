import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentLogin from './features/auth/Login/StudentLogin';
import RegistrarLogin from './features/auth/Login/RegistrarLogin';
import StudentRegister from './features/auth/Register/StudentRegister';
import RegistrarRegister from './features/auth/Register/RegistrarRegister';
import DocumentRequest from './features/documents/DocumentRequest/DocumentRequest';
import RegistrarPortal from './features/documents/RegistrarPortal/RegistrarPortal';
import ClaimSlip from './features/documents/ClaimSlip/ClaimSlip';
import StudentPortal from './features/documents/StudentPortal/StudentPortal';
import { AuthProvider, useAuthContext } from './features/auth/context/AuthContext';
import './styles/common.css';

function AppContent() {
  const { user } = useAuthContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1 }}>
        <Routes>
  {/* Default redirect */}
  <Route
    path="/"
    element={
      !user ? (
        <Navigate to="/student-login" />
      ) : user.role === 'admin' ? (
        <Navigate to="/admin" />
      ) : (
        <Navigate to="/student" />
      )
    }
  />

  {/* Student Auth */}
  <Route path="/student-login" element={<StudentLogin />} />
  <Route path="/student-register" element={<StudentRegister />} />

  {/* Registrar Auth */}
  <Route path="/registrar-login" element={<RegistrarLogin />} />
  <Route path="/registrar-register" element={<RegistrarRegister />} />

  {/* Authenticated pages */}
  <Route
    path="/request"
    element={
      user && user.role === 'student' ? (
        <DocumentRequest />
      ) : (
        <Navigate to="/student-login" replace />
      )
    }
  />
  <Route
    path="/admin"
    element={
      user && user.role === 'admin' ? (
        <RegistrarPortal />
      ) : (
        <Navigate to="/registrar-login" replace />
      )
    }
  />
  <Route
    path="/student"
    element={
      user && user.role === 'student' ? (
        <StudentPortal />
      ) : (
        <Navigate to="/student-login" replace />
      )
    }
  />
  <Route path="/claim/:id" element={<ClaimSlip />} />
</Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;