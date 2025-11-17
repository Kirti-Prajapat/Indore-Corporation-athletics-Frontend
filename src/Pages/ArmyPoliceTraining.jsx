// import React, { useEffect } from "react";
// import "../Style/ArmyPoliceTraining.css";
// import { useDispatch, useSelector } from "react-redux";
// import  Action  from "../Redux/Action";

// function ArmyPoliceTraining() {
//   const dispatch = useDispatch();
//   const { events } = useSelector((state) => state.item);
  

//   useEffect(() => {
//     dispatch(Action());
    
//   }, [dispatch]);

  
//   return (
//     <div className="training-container">
//       <h1 className="training-title">Army & Police Training</h1>
//       <p className="training-subtitle">
//         Explore our specialized training programs for the Indian Army, MP & UP Police. Watch videos, check images, and learn more!
//       </p>
//       <div className="event-gallery">
//         {Array.isArray(events) && events.length > 0 ? (
//           events.map((event) => (
//             <div key={event._id} className="event-card">
//               <div className="media-container">
//                 {event.imageUrl && (
//                   <img
//                     src={event.imageUrl}
//                     alt={event.title}
//                     className="event-image"
//                   />
//                 )}
//                 {event.videoUrl && (
//                   <video controls className="event-video">
//                     <source src={event.videoUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//               <div className="event-info">
//                 <h3 className="event-title">{event.title}</h3>
//                 <p className="event-description">{event.description}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-events">No events available right now.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ArmyPoliceTraining;


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
    <div className="training-container">
      <h1 className="training-title">Army & Police Training</h1>
      <p className="training-subtitle">
        Explore our specialized training programs for the Indian Army, MP & UP Police.
        Watch videos, check images, and learn more!
      </p>

      <div className="event-gallery">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                {/* 4 Training Program Cards */}
                <div className="training-card-container">
                  <div className="training-card">
                    <img src="/images/army1.jpg" alt="Army Training" />
                    <h4>Army Drills</h4>
                    <p>Physical endurance, discipline, and leadership skills.</p>
                  </div>

                  <div className="training-card">
                    <img src="/images/police1.jpg" alt="Police Training" />
                    <h4>Police Fitness</h4>
                    <p>Strength, reflexes, and quick decision making.</p>
                  </div>

                  <div className="training-card">
                    <img src="/images/selfdefense.jpg" alt="Self Defense" />
                    <h4>Self Defense</h4>
                    <p>Combat skills and tactical awareness training.</p>
                  </div>

                  <div className="training-card">
                    <img src="/images/endurance.jpg" alt="Endurance" />
                    <h4>Endurance Run</h4>
                    <p>Long-distance stamina building and obstacle running.</p>
                  </div>
                </div>
              </div>

              <div className="media-container">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="event-image"
                  />
                )}
                {event.videoUrl && (
                  <video controls className="event-video">
                    <source src={event.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events available right now.</p>
        )}
      </div>
    </div>
  );
}

export default ArmyPoliceTraining;
