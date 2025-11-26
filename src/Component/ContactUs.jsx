import React from "react";
import "../Style/ContactUs.css";

function ContactUs() {
    return (
        <div className="contact-wrapper">
            <h1 className="contact-heading">Contact Us</h1>
            <p className="contact-subheading">
                For admissions, training details, coaching sessions, and queries — connect with us anytime.
            </p>

            <div className="contact-card">
                <img
                    src="/Images/logo.jpg"
                    alt="Coach"
                    className="contact-image"
                />

                <div className="contact-content">
                    <h2 className="contact-title">Indore Corp. Area Athletics Association</h2>
                    <p className="contact-sub">Sport & Fitness Instruction</p>

                    <div className="contact-info">
                        <div className="info-box">
                            <h3>NIS Athletics Coach</h3>
                            <p className="coach-name">Mr. Rajendra Verma</p>
                        </div>

                        <div className="info-box">
                            <h3>Assistant Coach</h3>
                            <p className="coach-name">@rhythm_thakur.02</p>
                        </div>

                        <div className="info-box">
                            <h3>Admission Open</h3>
                            <p className="contact-number"> +91 7771007505</p>
                        </div>
                    </div>

                    <button
                        className="contact-btn"
                        onClick={() => window.location.href = "tel:7771007505"}
                    >
                        Call Now
                    </button>

                </div>
            </div>

            <div className="map-section">
                <h2 className="map-heading">Our Location</h2>
                <iframe
                    title="Indore Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114035.91205558036!2d75.7804023!3d22.7239113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d8dbf77a5b7%3A0xfb436bb6b8bc7b57!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                    className="map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}

export default ContactUs;
