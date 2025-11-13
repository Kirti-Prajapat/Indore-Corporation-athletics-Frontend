import React, { useState } from 'react'
import axios from 'axios'
import '../Style/Signup.css'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Signup successful!")

    try {
      const response = await axios.post("http://localhost:9900/athletics/signup",
        {
          name,
          email,
          password
        })

      alert(response.data.message);
      if (response.status === 201) {
        navigate('/signin')
      }

    } catch (error) {
     
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }

  }


  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Re-enter password"
            />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/signin">Signin</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
