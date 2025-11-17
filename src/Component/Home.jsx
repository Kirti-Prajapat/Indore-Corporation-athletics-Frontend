import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Style/Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()


  // const programs = [
  //   "Army & Police Training",
  //   "Physical Fitness & Gym",
  //   "Sports & Games",
  //   "Javelin & Discus Throw",
  //   "High & Long Jump",
  //   "Marathon & Tiger Run",
  //   "Yoga Meditation",
  // ];


  return (
    <div className="home-container">
      {/* Carousel Section */}
      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showStatus={false}
          transitionTime={800}
          stopOnHover={false}
        >
          <div className="carousel-slide">
            <img
              src="https://media.istockphoto.com/id/184629980/photo/racers-at-the-start-line-on-a-track.jpg?s=612x612&w=0&k=20&c=44-t40YO41z44R81F6ruxvX2auKybj8U_fO6BsVSisI="
              alt="Running"
            />
          </div>
          <div className="carousel-slide">
            <img
              src="https://img.freepik.com/free-photo/close-up-woman-meditating-lotus-position-sunset_637285-5481.jpg?w=360"
              alt="Yoga Meditation"
            />
          </div>
          <div className="carousel-slide">
            <img
              src="https://t4.ftcdn.net/jpg/02/49/59/17/360_F_249591737_lQGWpUT86qZI8kozL5H0ED31C6ncHpVt.jpg"
              alt="High Jump"
            />
          </div>
        </Carousel>

        {/* Hero text overlay */}
        <div className="hero-overlay">
          <h2>Free Physical Training Programs</h2>
          <p>
            Turn your dreams into reality! Whether you aim to serve the nation
            or achieve peak fitness, our specialized training programs will
            build your strength, stamina, and spirit — absolutely FREE.
          </p>
        </div>
      </div>

      {/* 🏅 Program Cards */}
      {/* <div className="programs-grid">
        {programs.map((p) => (
          <div key={p} className="program-card">
            <h3>{p}</h3>
          </div>
        ))}
      </div> */}

   {/* Program Buttons */}
      <div className="programs-grid">
        <div className="program-card" onClick={()=>navigate("/armypolice")}>
          <h3>Army & Police Training</h3>
        </div>

        <div className="program-card">
          <h3>Physical Fitness & Gym</h3>
        </div>

        <div className="program-card">
          <h3>Sports & Games</h3>
        </div>

        <div className="program-card">
          <h3>Javelin & Discus Throw</h3>
        </div>

        <div className="program-card" >
          <h3>High & Long Jump</h3>
        </div>

        <div className="program-card">
          <h3>Marathon & Tiger Run</h3>
        </div>

        <div className="program-card" >
          <h3>Yoga Meditation</h3>
        </div>
      </div>



{/*  */}


{/* <div className="event-gallery">
      {Array.isArray(events) && events.map((event) => (
        <div key={event._id} className="event-card">
          <img src={event.imageUrl} alt={event.title} className="event-image" />
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          {event.videoUrl && (
            <video controls className="event-video">
              <source src={event.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
    </div> */}

    {/*  */}

    </div>
  );
}

export default Home;
