import React, { useState } from "react";
import axios from "axios";
import "../Style/Signin.css"; 
import { useNavigate } from "react-router-dom";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


   const handleLogin = async(e)=>{
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }


    try{
      const response = await axios.post("https://indore-corporation-athletics-backend.onrender.com/athletics/signin",
        {email,
        password,
    });

    alert(response.data.message);

    const role = response.data.user.role;

    const token=response.data.token
    localStorage.setItem('token',token)
    console.log(token)


     if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch(error){
      alert(error.response?.data?.message || "Login Failed");
    }
   };

  return (
    <div className="signin-page">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin} className="signin-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn">Sign In</button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
