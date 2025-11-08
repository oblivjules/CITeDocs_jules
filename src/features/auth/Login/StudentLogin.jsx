import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../../assets/images/app_logo.png';
import documentIcon from '../../../assets/images/document_icon.png';
import swapIcon from '../../../assets/images/swap.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    }
  };

  return (
    <div className="login-page">
      <header className="login-page-header">
        <img src={logo} alt="CITeDocs" className="header-logo" />
      </header>

      <div className="login-content">
        <div className="welcome-section">
          <div className="document-icon-wrapper">
            <img src={documentIcon} alt="Document" className="document-icon" />
          </div>
          <h1 className="welcome-title">WELCOME BACK TO CITEDOCS</h1>
          <p className="welcome-text">
            Sign in to access your document requests,
            track their status, and stay updated on any
            new notifications.
          </p>
        </div>

        <div className="login-form-section">
          <div className="login-card">
            <div className="card-header">
              <Link to="/registrar-login" className="registrar-btn">
                <img src={swapIcon} alt="CITeDocs" className="swapIcon" />
                REGISTRAR
              </Link>
            </div>

            <h2 className="login-title">LOGIN AS STUDENT</h2>

            {error && (
              <div className="alert alert-error">{error}</div>
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

              <button type="submit" className="btn btn-primary btn-signin">
                SIGN IN
              </button>

              <Link to="/student-register" className="btn btn-secondary btn-create">
                CREATE NEW ACCOUNT
              </Link>

              <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
