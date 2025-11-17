import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AdminPanel.css";

function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [editId, setEditId] = useState(null); // for editing mode
  const token = localStorage.getItem("token");

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:9900/eventdata/getEvent");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ADD / UPDATE event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // ---- UPDATE event ----
        await axios.put(
          `http://localhost:9900/eventdata/update/${editId}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Event Updated Successfully");
      } else {
        // ---- ADD new event ----
        await axios.post("http://localhost:9900/eventdata/add", form, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Event Added Successfully");
      }

      // Reset
      setForm({ title: "", description: "", imageUrl: "", videoUrl: "" });
      setEditId(null);

      fetchEvents();

    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  // Load event data into form for editing
  const handleEdit = (event) => {
    setEditId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      videoUrl: event.videoUrl,
    });
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:9900/eventdata/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Event Deleted");
      fetchEvents();

    } catch (error) {
      alert("Failed to delete event");
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>

      {/* Add/Edit Event Form */}
      <div className="form-box">
        <h2>{editId ? "Edit Event" : "Add New Event"}</h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Event Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>

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

          <button className="add-btn" type="submit">
            {editId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>

      {/* Event List */}
      <h2 className="section-title">All Events</h2>

      <div className="event-grid">
        {events.map((item) => (
          <div className="event-card" key={item._id}>
            <img src={item.imageUrl} alt="" className="event-img" />

            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 100)}...</p>

            {item.videoUrl && (
              <a
                className="video-link"
                href={item.videoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            )}

            {/* Edit & Delete Buttons */}
            <div className="btn-box">
              <button
                className="edit-btn"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
