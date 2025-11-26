import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AdminDashboard.css";

function AdminDashboard() {
  
  const [athletes, setAthletes] = useState([]);
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");


  // fetch athletics (registration form user)
  const fetchAthletes = async () => {
    try {
      const res = await axios.get("http://localhost:9900/athletics/all");
      setAthletes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch events 
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:9900/eventdata/getEvent");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchSignupUsers();
    fetchAthletes();
    fetchEvents();
  }, []);

  // add or update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:9900/eventdata/update/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Event Updated Successfully");
      } else {
        await axios.post("http://localhost:9900/eventdata/add", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Event Added Successfully");
      }

      setForm({ title: "", description: "", imageUrl: "", videoUrl: "" });
      setEditId(null);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // edit event
  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl,
    });
  };

  // delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await axios.delete(`http://localhost:9900/eventdata/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event Deleted");
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <section className="user-section">
        <h2>Athletics Registrations</h2>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Age</th>
              <th>City</th>
              <th>Activities</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.mobile}</td>
                <td>{u.gender}</td>
                <td>{u.age}</td>
                <td>{u.city}</td>
                <td>{u.activities.join(", ")}</td>
                <td>{u.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

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

      {/* all event */}
      <section className="events-list">
        <h2>All Events</h2>

        <div className="event-grid">
          {events.map((item) => (
            <div className="event-card" key={item._id}>
              <img src={item.imageUrl} alt="" />

              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}...</p>

              <div className="btn-row">
                <button onClick={() => handleEdit(item)} className="edit-btn">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
