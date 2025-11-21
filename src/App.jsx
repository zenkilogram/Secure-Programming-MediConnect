import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaCog } from "react-icons/fa"; // Import Icon
import { Link, useNavigate } from "react-router-dom"; // Import Link & Navigate

// Import CSS
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function App() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State untuk menu dropdown
  const navigate = useNavigate();

  // Cek status login saat website dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      if (role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // Hapus data dari local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");
    
    // Reset state
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowDropdown(false);
    
    alert("You have been logged out.");
    navigate("/"); // Refresh ke home
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

  return (
    <div className="mediconnect">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">MediConnect</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          
          {/* PROFILE SECTION (GANTIKAN LOGIN/REGISTER BIASA) */}
          <div className="profile-menu-container" style={{position: 'relative', display: 'inline-block', marginLeft: '20px'}}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              className="profile-btn"
              style={{background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', fontSize: '1.2rem'}}
            >
              <FaUserCircle size={28} /> 
            </button>

            {/* DROPDOWN MENU */}
            {showDropdown && (
              <div className="dropdown-content" style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                backgroundColor: 'white',
                minWidth: '160px',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                zIndex: 100,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin/doctors" className="dropdown-item" style={{color: '#333', padding: '12px 16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #eee'}}>
                        <FaCog /> Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-item" style={{width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#d9534f', padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'}}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item" style={{color: '#333', padding: '12px 16px', textDecoration: 'none', display: 'block', borderBottom: '1px solid #eee'}}>
                       <FaSignInAlt style={{marginRight: '8px'}}/> Login
                    </Link>
                    <Link to="/register" className="dropdown-item" style={{color: '#333', padding: '12px 16px', textDecoration: 'none', display: 'block'}}>
                       Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
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
            <img src={s} alt={`Banner ${i}`} className="banner-img" />
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