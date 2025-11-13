import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar({ cart }) {
  return (
    <div className="navbar">
      {/* Left Section: Logo + Heading */}
      <div className="navbar-left">
        <img src="/Images/logo.jpg" alt="logo" className="logo" />
        <h3>Indore Corporation Athletics</h3>
      </div>

      {/* Right Section: Links */}
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Navbar;
