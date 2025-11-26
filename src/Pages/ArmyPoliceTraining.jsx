import React, { useEffect } from "react";
import "../Style/ArmyPoliceTraining.css";
import { useDispatch, useSelector } from "react-redux";
import Action from "../Redux/Action";

function ArmyPoliceTraining() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(Action());
  }, [dispatch]);

  return (
    <div className="training-wrapper">
      <h1 className="training-heading">Army & Police Training</h1>
      <p className="training-text">
        Explore real training sessions added by the admin. View images, videos, and
        complete details of Army & Police physical training.
      </p>

      <div className="training-grid">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="card-wrapper">

              {/* image card */}
              <div className="media-card">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="media-img"
                />
                <div className="media-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>

              {/* video card */}
              {event.videoUrl && (
                <div className="video-card">
                  <video
                    src={event.videoUrl}
                    controls
                    className="media-video"
                  ></video>
                  {/* <div className="media-content"> */}
                    {/* <h3>{event.title} - Training Video</h3> */}
                    {/* <p>{event.description}</p> */}
                  {/* </div> */}
                </div>
              )}

            </div>
          ))
        ) : (
          <p className="no-data">No Training Data Found</p>
        )}
      </div>

    </div>
  );
}

export default ArmyPoliceTraining;
