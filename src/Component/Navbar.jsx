import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import '../Style/Navbar.css';

function Navbar() {
  // const { user } = useSelector((state) => state.auth);
  const user = null;

  // const dispatch = useDispatch();
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
       
        
         {/* <Link to="/apply">Apply</Link> */}

         {user ? (
          <>
            <Link to="/admin">Admin</Link>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
             <Link to="/login">Signin</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
