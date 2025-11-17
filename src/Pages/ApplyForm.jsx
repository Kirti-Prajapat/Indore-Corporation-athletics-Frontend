import { useState } from "react";
import axios from "axios";

export default function ApplyForm() {
  const [form, setForm] = useState({ name: "", age: "", program: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/apply", form);
    alert("Application submitted!");
  };

  return (
    <div className="form-container">
      <h2>Apply for Training</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Program Name"
          onChange={(e) => setForm({ ...form, program: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
