import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/PhysicalFitness.css";

function PhysicalFitness() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://indore-corporation-athletics-backend.onrender.com/eventdata/getEvent");
      // Filter only “Physical Fitness & Gym” category
      const filtered = res.data.filter(
        (item) => item.title.toLowerCase().includes("gym") ||
           item.title.toLowerCase().includes("fitness")
      );
      setData(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fitness-container">

      <h1 className="fitness-title">Physical Fitness & Gym</h1>
      <p className="fitness-subtitle">
        Build stamina, strength and power with our professional training programs.
      </p>

      <div className="fitness-grid">
        {data.map((item) => (
          <div className="fitness-card" key={item._id}>
            <img src={item.imageUrl} className="fitness-img" alt="fitness" />

            <div className="fitness-content">
              <h3>{item.title}</h3>
              <p>{item.description.slice(0, 120)}...</p>

              {item.videoUrl && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fitness-video-btn"
                >
                  Watch Video
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PhysicalFitness;
