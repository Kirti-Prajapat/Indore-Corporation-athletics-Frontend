import React, { useState } from 'react'
import axios from 'axios'
import '../Style/Signup.css'
import { useNavigate } from 'react-router-dom'

function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9900/adminverify/signupadmin",
        {
          email,
          password,
          secretKey,  
        }
      );

      alert(response.data.message);

      if (response.status === 200) {
        navigate('/adminsignin');
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create Admin Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">

          <div className="form-group">
            <label>Email</label>
            <input type="email"
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password"
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>

          <div className="form-group">
            <label>Secret Key</label>
            <input type="text"
              onChange={(e) => setSecretKey(e.target.value)}
              required
              placeholder="Enter Admin Secret Key"
            />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/adminsignin">Signin</a>
        </p>
      </div>
    </div>
  );
}

export default AdminSignup;
