import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users"); // default screen

  const [athletes, setAthletes] = useState([]);
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [editId, setEditId] = useState(null);
  const [url, setUrl] = useState("");
  const token = localStorage.getItem("token");

  // Fetch registered athletes
  const fetchAthletes = async () => {
    try {
      const res = await axios.get("https://indore-corporation-athletics-backend.onrender.com/athletics/all");
      setAthletes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://indore-corporation-athletics-backend.onrender.com/eventdata/getEvent");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAthletes();
    fetchEvents();
  }, []);

  // Add / Update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `https://indore-corporation-athletics-backend.onrender.com/eventdata/update/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Event Updated Successfully");
      } else {
        await axios.post("https://indore-corporation-athletics-backend.onrender.com/eventdata/add", form, {
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

  // Edit event
  const handleEdit = (item) => {
    setActiveTab("addEvent");
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
      await axios.delete(`https://indore-corporation-athletics-backend.onrender.com/eventdata/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event Deleted");
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // Save Live Stream URL
  const handleAdd = async () => {
    if (!editId) {
      alert("Please select an event");
      return;
    }

    try {
      await axios.put(
        `https://indore-corporation-athletics-backend.onrender.com/eventdata/toggleLive/${editId}`,
        { liveURL:`https://www.youtube.com/embed/UCJKNaCURBPOp8jm?autoplay=1` },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Live Stream URL Saved Successfully!");
      setUrl("");
    } catch (error) {
      console.log(error);
      alert("Error saving live URL");
    }
  };


  return (
    <div className="admin-container">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Registered Users
        </button>

        <button
          className={activeTab === "addEvent" ? "active" : ""}
          onClick={() => {
            setEditId(null);
            setForm({ title: "", description: "", imageUrl: "", videoUrl: "" });
            setActiveTab("addEvent");
          }}
        >
          Add Event
        </button>

        <button
          className={activeTab === "allEvents" ? "active" : ""}
          onClick={() => setActiveTab("allEvents")}
        >
          All Events
        </button>

        <button
          className={activeTab === "live" ? "active" : ""}
          onClick={() => setActiveTab("live")}
        >
          Live Stream
        </button>

      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="content">

        {/* REGISTERED USERS SECTION */}
        {activeTab === "users" && (
          <section>
            <h2>Registered Athletes</h2>
            <table className="data-table">
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
        )}

        {/* ADD/EDIT EVENT SECTION */}
        {activeTab === "addEvent" && (
          <section>
            <h2>{editId ? "Edit Event" : "Add New Event"}</h2>

            <form className="event-form" onSubmit={handleSubmit}>
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
              />

              <input
                type="text"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />

              <input
                type="text"
                placeholder="Live Video URL"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              />

              <button type="submit" className="btn-submit">
                {editId ? "Update Event" : "Add Event"}
              </button>
            </form>
          </section>
        )}

        {/* ALL EVENTS SECTION */}
        {activeTab === "allEvents" && (
          <section>
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
        )}

        {/* LIVE STREAM SECTION */}
        {activeTab === "live" && (
          <section>
            <h2>Live Stream Settings</h2>

            {/* 🔽 SELECT EVENT DROPDOWN HERE */}
            <div className="live-select-container">
              <select value={editId} onChange={(e) => setEditId(e.target.value)}>
                <option value="">Select Event</option>
                {events.map(ev => (
                  <option key={ev._id} value={ev._id}>{ev.title}</option>
                ))}
              </select>
            </div>


            <div className="live-box">
              <input
                type="text"
                placeholder="Paste YouTube Live URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button onClick={handleAdd} className="live-btn">
                Save Live Stream
              </button>
            </div>
          </section>
        )}

      </div>




    </div>
  );
}

export default AdminDashboard;
