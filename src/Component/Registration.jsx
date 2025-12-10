import React, { useState } from "react";
import axios from "axios";
import "../Style/Registration.css";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "",
    age: "",
    city: "",
    activities: [],
    reason: "",
  });

  const activitiesList = [
    "Yoga & Meditation",
    "Army / Police Training",
    "High Jump",
    "Long Jump",
    "Javelin",
    "Discus Throw",
    "Marathon",
    "Tiger Run",
    "Gym & Fitness",
    "Sports & Games"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "activities") {
      const selected = [...formData.activities];
      if (selected.includes(value)) {
        selected.splice(selected.indexOf(value), 1);
      } else {
        selected.push(value);
      }
      setFormData({ ...formData, activities: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://indore-corporation-athletics-backend.onrender.com/athletics/register",
         formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
      );
      alert(res.data.message);
    } catch (err) {
      // alert("Error: " + err.response.data.message);
      console.log(err.response.data);
      
    }
  };

  return (
    <div className="reg-container">
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2>Athletics Registration Form</h2>

        <input type="text" name="name" placeholder="Full Name"
          value={formData.name} onChange={handleChange} required />

        <input type="text" name="mobile" placeholder="Mobile Number"
          value={formData.mobile} onChange={handleChange} required />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="number" name="age" placeholder="Age"
          value={formData.age} onChange={handleChange} required />

        <input type="text" name="city" placeholder="City"
          value={formData.city} onChange={handleChange} required />

        <label className="activities-label">Select Activities:</label>
        <div className="activities-box">
  {activitiesList.map((act) => (
    <label className="activity-item" key={act}>
      <input
        type="checkbox"
        name="activities"
        value={act}
        checked={formData.activities.includes(act)}
        onChange={handleChange}
      />
      <span className="checkmark"></span>
      <p>{act}</p>
    </label>
  ))}
</div>

        <textarea name="reason" rows="4"
          placeholder="Why do you want to join?"
          value={formData.reason} onChange={handleChange}></textarea>

        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
}

export default Registration;
