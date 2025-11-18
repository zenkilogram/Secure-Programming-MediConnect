import { useState } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Booking from "./booking.jsx";
import Profile from "./profile.jsx";
import Specialities from "./specialities.jsx";
import SpecialityDetail from "./specdetail.jsx";

export default function App() {
  const [search, setSearch] = useState("");

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

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
        <div className="logo">MediConnect</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/booking">Book an Appointment</Link>
          <a href="#">About Us</a>
          <Link to="/profile">Profile</Link>
          <a href="#">Contact</a>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route
            path="/"
            element={
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
                  <h2 className="section-title">Specialities</h2>
                  <div className="spec-grid">
                    {specialties.map((s) => (
                      <div key={s.id} className="spec-card">
                        <div className="spec-icon">{s.icon}</div>
                        <div className="spec-name">{s.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="morespec">
                  <Link to="/specialities">More</Link>
                  </div>
                </section>

                <section className="doctors">
                  <h2 className="section-title">Doctors</h2>
                  <div className="spec-grid">
                    
                  </div>
                  <div className="moredoc">
                  <Link to="/Doctor">More</Link>
                  </div>
                </section>
              </div>
            }
          />

          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/specialities" element={<Specialities/>} />
          <Route path="/specialities/:id" element={<SpecialityDetail/>} />
        </Routes>
        </div>

        <footer className="footer">
          <div className="footer-left">
            <div className="logo">MediConnect</div>
            <div className="copy">© 2025 MediConnect. All rights reserved.</div>
          </div>
          
          <div className="footer-right">
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}