import React from 'react';
import '../styles/Header.css';

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-icon">🎓</span>
          <h1>CITeDocs</h1>
        </div>
        {user && (
          <div className="header-user">
            <span className="user-info">
              {user.name} ({user.role})
            </span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}