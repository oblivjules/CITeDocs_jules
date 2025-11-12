import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import appLogo from "../../../../assets/images/app_logo.png";

export default function Header({ title, onLogout }) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: "#8B2635",
        color: "white",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <img
          src={appLogo}
          alt="CITeDocs Logo"
          style={{ height: "48px", cursor: "pointer" }}
          onClick={() => navigate("/registrar")}
        />

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <NavLink
            to="/registrar"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/registrar/all-requests"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            All Requests
          </NavLink>
        </nav>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div className="user-avatar">📊</div>
        <span style={{ fontWeight: "600", fontSize: "20px" }}>
          BLEASSYGWAPA
        </span>

        {onLogout && (
          <button 
            className="logout-btn" 
            onClick={onLogout}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span>Logout</span>
            <span style={{ fontSize: "20px" }}>🏃🚪</span>
          </button>
        )}
      </div>
    </header>
  );
}