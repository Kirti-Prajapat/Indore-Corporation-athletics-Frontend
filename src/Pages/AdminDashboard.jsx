// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [programs, setPrograms] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const userRes = await axios.get("http://localhost:5000/api/admin/users");
//       const progRes = await axios.get("http://localhost:5000/api/admin/programs");
//       setUsers(userRes.data);
//       setPrograms(progRes.data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="admin">
//       <h2>Admin Dashboard</h2>
//       <h3>Registered Users</h3>
//       <ul>
//         {users.map((u) => (
//           <li key={u._id}>{u.name} - {u.email}</li>
//         ))}
//       </ul>

//       <h3>Programs</h3>
//       <ul>
//         {programs.map((p) => (
//           <li key={p._id}>{p.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9900/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:9900/eventdata/getEvent");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  // Add/Update Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:9900/eventdata/update/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Event updated");
      } else {
        await axios.post("http://localhost:9900/eventdata/add", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Event added");
      }

      setForm({ title: "", description: "", imageUrl: "", videoUrl: "" });
      setEditId(null);
      fetchEvents();

    } catch (error) {
      console.log(error);
    }
  };

  // Edit button action
  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl,
    });
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await axios.delete(`http://localhost:9900/eventdata/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Registered Users Section */}
      <section className="user-section">
        <h2>Registered Users</h2>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered On</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Event */}
      <section className="event-form-section">
        <h2>{editId ? "Edit Event" : "Add New Event"}</h2>

        <form className="event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <input
            type="text"
            placeholder="Video URL"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />

          <button className="btn-submit" type="submit">
            {editId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </section>

      {/* All Events */}
      <section className="events-list">
        <h2>All Events</h2>

        <div className="event-grid">
          {events.map((item) => (
            <div className="event-card" key={item._id}>
              <img src={item.imageUrl} alt="" />

              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}...</p>

              <div className="btn-row">
                <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

