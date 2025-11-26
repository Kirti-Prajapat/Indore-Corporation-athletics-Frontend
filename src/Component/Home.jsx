import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Style/Home.css";
import Signup from "../Component/Signup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Home() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);

  //  Check if already signed up
//   useEffect(() => {
//   const userSigned = localStorage.getItem("signedUp");
//   const popupShown = localStorage.getItem("popupShown");

//   if (!userSigned && !popupShown) {
//     const timer = setTimeout(() => {
//       setSignup(true);
//       localStorage.setItem("popupShown", "true"); // mark popup shown
//     }, 2000);

//     return () => clearTimeout(timer);
//   }
// }, []);


useEffect(() => {
  const timer = setTimeout(() => {
    setSignup(true);
  }, 2000);

  return () => clearTimeout(timer);
}, []);


  // Card Animation
  useEffect(() => {
    const cards = document.querySelectorAll(".program-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
          else entry.target.classList.remove("show");
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  // Popup close handler
  const handleClosePopup = () => {
    setSignup(false);
  };


  return (
    <div className="home-main">

      {/* Blur Entire Content When Popup is Open */}
      <div className={signup ? "blur-background" : ""}>
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
                <img src="https://media.istockphoto.com/id/184629980/photo/racers-at-the-start-line-on-a-track.jpg?s=612x612&w=0&k=20&c=44-t40YO41z44R81F6ruxvX2auKybj8U_fO6BsVSisI=" />
              </div>

              <div className="carousel-slide">
                <img src="https://img.freepik.com/free-photo/close-up-woman-meditating-lotus-position-sunset_637285-5481.jpg?w=360" />
              </div>

              <div className="carousel-slide">
                <img src="https://t4.ftcdn.net/jpg/02/49/59/17/360_F_249591737_lQGWpUT86qZI8kozL5H0ED31C6ncHpVt.jpg" />
              </div>
            </Carousel>

            <div className="hero-overlay">
              <h2>Free Physical Training Programs</h2>
              <p>
                Turn your dreams into reality! Whether you aim to serve the
                nation or achieve peak fitness, our specialized training
                programs will build your strength, stamina, and spirit —
                absolutely FREE.
              </p>
            </div>
          </div>

          {/* Program Buttons */}
          <div className="programs-grid">
            <div className="program-card" onClick={() => navigate("/armypolice")}>
              <h3>Army & Police Training</h3>
            </div>

            <div className="program-card" onClick={() => navigate("/physicalFitness")}>
              <h3>Physical Fitness & Gym</h3>
            </div>

            <div className="program-card">
              <h3>Sports & Games</h3>
            </div>

            <div className="program-card">
              <h3>Javelin & Discus Throw</h3>
            </div>

            <div className="program-card">
              <h3>High & Long Jump</h3>
            </div>

            <div className="program-card">
              <h3>Marathon & Tiger Run</h3>
            </div>

            <div className="program-card">
              <h3>Yoga Meditation</h3>
            </div>
          </div>
        </div>
      </div>

      {signup && (
        <div className="signup-popup-overlay">
          <div className="signup-popup-box">
            {/* <FaRegWindowClose className="close-icon" onClick={handleClosePopup} /> */}
            <IoClose className="close-menu" onClick={handleClosePopup} />
            <Signup close={handleClosePopup}/>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
