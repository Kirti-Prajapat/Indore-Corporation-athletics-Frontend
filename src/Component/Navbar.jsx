import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const user = null;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <img src="/Images/logo.jpg" alt="logo" className="logo" />
          <h3>Indore Corporation Athletics</h3>
        </div>

        <div className="navbar-right">
          <Link to="/">Home</Link>
          {!user && (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Signin</Link>
              <Link to="/register">Register</Link>
              <Link to="/contact">Contact Us</Link>

             
            </>
          )}
        </div>

         {/* Hamburger */}
         
              <GiHamburgerMenu
                className="hamburger"
                onClick={() => setMenuOpen(true)}
              />
      </div>

      {/* ---------- Mobile Slide Menu ---------- */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <IoClose className="close-menubar" onClick={() => setMenuOpen(false)} />

            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Signin</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
