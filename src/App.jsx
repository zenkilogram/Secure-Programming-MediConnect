import { useRef, useState } from "react";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function App() {
  const [search, setSearch] = useState("");

  // Refs buat scroll
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const specialtiesRef = useRef(null);
  const doctorsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
    { id: 8, name: "General", icon: "⚕️" },
  ];

  const doctors = [
    { id: 1, name: "Dr. A", hospital: "Siloam Hospital", specialty: "Cardiology", image: "" },
    { id: 2, name: "Dr. B", hospital: "Siloam Hospital", specialty: "Cardiology", image: "https://i.ibb.co/ScM0LnS/doctor.jpg" },
    { id: 3, name: "Dr. C", hospital: "Siloam Hospital", specialty: "Cardiology", image: "" },
    { id: 4, name: "Dr. D", hospital: "Siloam Hospital", specialty: "Cardiology", image: "" },
  ];

  return (
    <div className="mediconnect">
      {/* HEADER */}
      <nav className="navbar">
        <div className="logo">MediConnect</div>
        <div className="nav-links">
          <a onClick={() => scrollToSection(homeRef)}>Home</a>
          <a onClick={() => scrollToSection(aboutRef)}>About Us</a>
          <a onClick={() => scrollToSection(specialtiesRef)}>Specialities</a>
          <a onClick={() => scrollToSection(doctorsRef)}>Doctors</a>
          <a onClick={() => scrollToSection(contactRef)}>Contact</a>
        </div>
      </nav>

      {/* HOME SECTION */}
      <section ref={homeRef}>
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
          style={{ width: "100%", height: "350px" }}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <img src={s} alt={`Banner ${i}`} className="banner-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ABOUT US */}
      <section ref={aboutRef} className="about-section">
        <div className="about-box">
          <p>
            MediConnect is a healthcare platform that helps patients connect easily
            with hospitals and doctors. We make it simple to find medical services,
            check doctor availability, and book appointments in just a few clicks.
            Our mission is to make healthcare more accessible and efficient through
            technology. With MediConnect, patients can save time, avoid long queues,
            and focus on getting the right care when they need it.
          </p>
        </div>
      </section>

      {/* SPECIALITIES */}
      <section ref={specialtiesRef} className="specialties">
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

      {/* DOCTORS */}
      <section ref={doctorsRef} className="doctors">
        <h2 className="section-title">Our Doctors</h2>
        <div className="doctor-grid">
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              {doc.image ? (
                <img src={doc.image} alt={doc.name} className="doctor-img" />
              ) : (
                <div className="doctor-placeholder" />
              )}
              <div className="doctor-name">{doc.name}</div>
              <div className="doctor-info">
                {doc.hospital} <br /> {doc.specialty}
              </div>
            </div>
          ))}
        </div>
        <div className="view-more">
          <button className="view-more-btn">More →</button>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={contactRef} className="contact-section">
        <h2>Contact</h2>
        <div className="contact-box">
          <p>For booking issues, technical support, or account help</p>

          <div className="contact-item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="contact-icon"
            />
            <span>+62 xxx-xxxx-xxxx</span>
          </div>

          <div className="contact-item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="Email"
              className="contact-icon"
            />
            <span>mediconnect@gmail.com</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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