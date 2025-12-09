import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/LiveEvent.css";

function LiveVideo({ eventId }) {
  const [url, setUrl] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!eventId) return; 

    axios
      .get(`https://indore-corporation-athletics-backend.onrender.com/livevideo/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUrl(res.data.liveURL))
      .catch(err => {
        console.log(err);
        setUrl(""); // clear URL if error
      });
  }, [eventId, token]); // include eventId and token in dependency

  return (
    <div>
      {url ? (
        <iframe
          width="100%"
          height="500px"
          src={url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <h2>No Live Stream Available</h2>
      )}
    </div>
  );
}

export default LiveVideo;
