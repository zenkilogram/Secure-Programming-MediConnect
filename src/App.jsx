import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Login from "./login.jsx";
import Register from "./register.jsx";
import Booking from "./Booking.jsx";
import AboutUs from "./aboutus.jsx";
import Profile from "./Profile.jsx";
import Specialities from "./specialities.jsx";
import SpecialityDetail from "./specdetail.jsx";
import Doctor from "./doctor.jsx";

import doctorImg from "./assets/dokter.jpg";
import doctorImg2 from "./assets/dokter2.jpg";
import doctorImg3 from "./assets/dokter3.jpg";
import doctorImg4 from "./assets/dokter4.jpg";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

function App() {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const hiddenLayoutRoutes = ["/login", "/register"];
  const hideLayout = hiddenLayoutRoutes.includes(location.pathname);

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
    {id: 1, name: "Dr. Angel Chandra", photo: doctorImg, hospital: "Linon Hospital", spec: "Cardiology"},
    {id: 2, name: "Dr. Alan Halim", photo: doctorImg2, hospital: "Swelis Hospital", spec: "Allergy and Immune"},
    {id: 3, name: "Dr. Stephen Wadi", photo: doctorImg3, hospital: "Wando Hospital", spec: "Orthopedics"},
    {id: 4, name: "Dr. Devi Mira", photo: doctorImg4, hospital: "Mao Hospital", spec: "Orthopedics"}
  ];

  return (
    <div className="app-container">

      {!hideLayout && (
        <nav className="navbar">
          <div className="logo">MediConnect</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/booking">Book an Appointment</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/profile">Profile</Link>
            <a href="#">Contact</a>
          </div>
        </nav>
      )}

      <div className="main-content">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
                    {doctors.map((d) => (
                      <div key={d.id} className="spec-card">
                        <img src={d.photo} alt={d.name} className="doctor-photo" />
                        <div className="doc-name">{d.name}</div>
                        <div className="doc-hospital">{d.hospital}</div>
                        <div className="doc-spec">{d.spec}</div>
                      </div>
                    ))}
                  </div>
                  <div className="moredoc">
                    <Link to="/doctor">More</Link>
                  </div>
                </section>
              </div>
            }
          />

          <Route path="/booking" element={<Booking />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/specialities/:id" element={<SpecialityDetail />} />
          <Route path="/doctor" element={<Doctor />} />

        </Routes>
      </div>

      {!hideLayout && (
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
      )}
    </div>
  );
}