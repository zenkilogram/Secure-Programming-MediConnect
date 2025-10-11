import { useState } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function App() {
  const [search, setSearch] = useState("");

  // Banner images (relevan & seragam gaya ilustrasi medis)
const slides = [
  "https://i.ibb.co/8z1FQ3R/doctor-banner-1.jpg",
  "https://i.ibb.co/M8kQMzM/doctor-banner-2.jpg",
  "https://i.ibb.co/LxW8PQp/doctor-banner-3.jpg",
];


  // Specialities
  const specialties = [
    { id: 1, name: "Cardiology", icon: "❤️" },
    { id: 2, name: "Neurology", icon: "🧠" },
    { id: 3, name: "Pediatrics", icon: "🧸" },
    { id: 4, name: "Orthopedics", icon: "🦴" },
    { id: 5, name: "Dermatology", icon: "🌞" },
    { id: 6, name: "Ophthalmology", icon: "👁️" },
    { id: 7, name: "Dental", icon: "🦷" },
    { id: 8, name: "General", icon: "⚕️" },
  ];

  return (
    <div className="mediconnect">
      {/* HEADER */}
      <nav className="navbar">
        <div className="logo">MediConnect</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctors, specialties, or hospitals"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop
        style={{ width: "100%", height: "350px" }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s}
              alt={`Banner ${i}`}
              className="banner-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SPECIALITIES */}
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
      </section>
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
  );
}