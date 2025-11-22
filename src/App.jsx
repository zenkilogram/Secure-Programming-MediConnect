import React, { useState, useEffect } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import doctorImg from "./assets/dokter.jpg";
import doctorImg2 from "./assets/dokter2.jpg";
import doctorImg3 from "./assets/dokter3.jpg";
import doctorImg4 from "./assets/dokter4.jpg";

import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaCog } from "react-icons/fa";

function App() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      if (role === "admin") setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowDropdown(false);

    alert("You have been logged out.");
    navigate("/");
  };

  const slides = [
    "https://i.ibb.co/8z1FQ3R/doctor-banner-1.jpg",
    "https://i.ibb.co/M8kQMzM/doctor-banner-2.jpg",
    "https://i.ibb.co/LxW8PQp/doctor-banner-3.jpg",
  ];

  const specialties = [
    { id: 1, name: "Cardiology", icon: "❤️" },
    { id: 2, name: "Neurology", icon: "🧠" },
    { id: 3, name: "Pediatrics", icon: "🧸" },
    { id: 4, name: "Orthopedics", icon: "🦴" },
    { id: 5, name: "Dermatology", icon: "🌞" },
    { id: 6, name: "Ophthalmology", icon: "👁️" },
    { id: 7, name: "Dental", icon: "🦷" },
    { id: 8, name: "General", icon: "⚕️" }
  ];

  const doctors = [
    { id: 1, name: "Dr. Angel Chandra", photo: doctorImg, hospital: "Linon Hospital", spec: "Cardiology" },
    { id: 2, name: "Dr. Alan Halim", photo: doctorImg2, hospital: "Swelis Hospital", spec: "Allergy and Immune" },
    { id: 3, name: "Dr. Stephen Wadi", photo: doctorImg3, hospital: "Wando Hospital", spec: "Orthopedics" },
    { id: 4, name: "Dr. Devi Mira", photo: doctorImg4, hospital: "Mao Hospital", spec: "Orthopedics" }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo">MediConnect</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/booking">Book an Appointment</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="profile-btn"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "white" }}
          >
            <FaUserCircle size={28} />
          </button>

          {showDropdown && (
            <div
              className="dropdown-content"
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                background: "white",
                minWidth: "160px",
                borderRadius: "8px",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                zIndex: 999,
              }}
            >
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Link 
                      className="dropdown-item" 
                      to="/admin/doctors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaCog /> Dashboard
                    </Link>
                  )}

                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    className="dropdown-item" 
                    to="/login"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaSignInAlt /> Login
                  </Link>

                  <Link 
                    className="dropdown-item" 
                    to="/register"
                    onClick={() => setShowDropdown(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="home-page">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search doctors, specialties, or hospitals"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop
          className="banner-swiper"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <img src={s} alt={`Banner ${i}`} className="banner-img" />
            </SwiperSlide>
          ))}
        </Swiper>

        <section className="specialties">
          <h2>Specialities</h2>
          <div className="spec-grid">
            {specialties.map((s) => (
              <Link to={`/specialities/${s.id}`} key={s.id} className="spec-card">
                <div className="spec-icon">{s.icon}</div>
                <div className="spec-name">{s.name}</div>
              </Link>
            ))}
          </div>
          <div className="morespec">
            <Link to="/specialities">View All Specialities</Link>
          </div>
        </section>

        <section className="doctors">
          <h2>Doctors</h2>
          <div className="spec-grid">
            {doctors.map((d) => (
              <div key={d.id} className="spec-card">
                <img src={d.photo} className="doctor-photo" alt={d.name} />
                <div className="doc-name">{d.name}</div>
                <div className="doc-hospital">{d.hospital}</div>
                <div className="doc-spec">{d.spec}</div>
              </div>
            ))}
          </div>
          <div className="moredoc">
            <Link to="/doctor">View All Doctors</Link>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <div className="logo">MediConnect</div>
          <div className="copy">© 2025 MediConnect. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}

export default App;