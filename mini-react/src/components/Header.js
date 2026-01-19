import React from "react";
import './Header.css';

function Header({ openLogin, openSignup, navigateTo }) {
  return (
    <header className="header">
      <div className="logo">FreelanceHub ⚡</div>
      <nav className="nav">
        <button onClick={() => navigateTo("home")} className="nav-link">
          Home
        </button>
        <button onClick={() => navigateTo("findWork")} className="nav-link">
          Find Work
        </button>
        <button onClick={() => navigateTo("findTalent")} className="nav-link">
          Find Talent
        </button>
        <button onClick={() => navigateTo("dashboard")} className="nav-link">
          Dashboard
        </button>
      </nav>
      <div className="auth-buttons">
        <button onClick={openLogin} className="login-btn">
          Login
        </button>
        <button onClick={openSignup} className="signup-btn">
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;