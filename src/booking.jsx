import { useState, useEffect } from "react";
import "./Booking.css";
import { useNavigate, Link } from "react-router-dom";
import api from "./api";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaCog } from "react-icons/fa";

function Booking() {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  // Static specialties data
  const specialties = [
    { id: 1, name: "Allergy & Immunology" },
    { id: 2, name: "Cardiology" },
    { id: 3, name: "Dental" },
    { id: 4, name: "Dermatology" },
    { id: 5, name: "Endocrinology" },
    { id: 6, name: "ENT (Ear Nose Throat)" },
    { id: 7, name: "General" },
    { id: 8, name: "Hematology" },
    { id: 9, name: "Neurology" },
    { id: 10, name: "OBGYN" },
    { id: 11, name: "Ophthalmology" },
    { id: 12, name: "Orthopedics" },
    { id: 13, name: "Pediatrics" },
    { id: 14, name: "Pulmonology" },
    { id: 15, name: "Psychiatry" },
    { id: 16, name: "Rehabilitation" }
  ];

  const [formData, setFormData] = useState({
    hospital_id: "",
    specialty_id: "",
    doctor_id: "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    dob: "",
  });

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      if (role === "admin") setIsAdmin(true);
    } else {
      // Redirect ke login jika belum login
      alert("Please login first to book an appointment");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch hospitals dari backend
  useEffect(() => {
    if (isLoggedIn) {
      fetchHospitals();
    }
  }, [isLoggedIn]);

  // Fetch doctors ketika specialty atau hospital berubah
  useEffect(() => {
    if (formData.specialty_id && formData.hospital_id && isLoggedIn) {
      fetchDoctors(formData.specialty_id, formData.hospital_id);
    }
  }, [formData.specialty_id, formData.hospital_id, isLoggedIn]);

  // Fetch available times ketika doctor dan date berubah
  useEffect(() => {
    if (formData.doctor_id && formData.date && isLoggedIn) {
      fetchAvailableTimes(formData.doctor_id, formData.date);
    }
  }, [formData.doctor_id, formData.date, isLoggedIn]);

  const fetchHospitals = async () => {
    try {
      const response = await api.get("/api/hospitals");
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setHospitals([
        { id: 1, name: "Primaya Hospital" },
        { id: 2, name: "Hermina Hospital" },
        { id: 3, name: "Siloam Hospital" },
      ]);
    }
  };

  const fetchDoctors = async (specialtyId, hospitalId) => {
    try {
      const response = await api.get(`/api/doctors?specialty_id=${specialtyId}&hospital_id=${hospitalId}`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      const dummyDoctors = getDummyDoctors(specialtyId);
      setDoctors(dummyDoctors);
    }
  };

  const fetchAvailableTimes = async (doctorId, date) => {
    try {
      const response = await api.get(`/api/available-times?doctor_id=${doctorId}&date=${date}`);
      setAvailableTimes(response.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([
        { time: "09:00", status: "available" },
        { time: "10:00", status: "available" },
        { time: "11:00", status: "available" },
        { time: "13:00", status: "available" },
        { time: "14:00", status: "booked" },
        { time: "15:00", status: "available" },
      ]);
    }
  };

  const getDummyDoctors = (specialtyId) => {
    const specialty = specialties.find(s => s.id == specialtyId);
    if (!specialty) return [];
    
    const doctorNames = {
      1: ["Dr. Ahmad Rizki", "Dr. Sari Dewi"],
      2: ["Dr. Budi Santoso", "Dr. Maya Sari"],
      3: ["Dr. Citra Lestari", "Dr. Doni Pratama"],
      4: ["Dr. Eka Putri", "Dr. Farhan Maulana"],
      5: ["Dr. Gita Santoso", "Dr. Hendra Wijaya"],
      6: ["Dr. Indra Kurniawan", "Dr. Julia Anastasia"],
      7: ["Dr. Kevin Pratama", "Dr. Lina Marlina"],
      8: ["Dr. Muhammad Ali", "Dr. Nina Sari"],
      9: ["Dr. Oscar Wijaya", "Dr. Putri Anggraini"],
      10: ["Dr. Queen Alexandria", "Dr. Rudi Hermawan"],
      11: ["Dr. Siti Rahayu", "Dr. Toni Setiawan"],
      12: ["Dr. Umar Faruq", "Dr. Vera Indah"],
      13: ["Dr. William Tan", "Dr. Xena Alexandra"],
      14: ["Dr. Yuni Sartika", "Dr. Zaki Ahmad"],
      15: ["Dr. Anna Maria", "Dr. Benny Kurniawan"],
      16: ["Dr. Clara Putri", "Dr. David Lee"]
    };

    return doctorNames[specialtyId]?.map((name, index) => ({
      id: parseInt(`${specialtyId}${index + 1}`),
      name: name,
      specialty: specialty.name,
      hospital_id: formData.hospital_id
    })) || [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "specialty_id" || name === "hospital_id") {
      setFormData({
        ...formData,
        [name]: value,
        doctor_id: "",
        time: ""
      });
      setDoctors([]);
      setAvailableTimes([]);
    } else if (name === "doctor_id") {
      setFormData({
        ...formData,
        [name]: value,
        time: ""
      });
      setAvailableTimes([]);
    } else if (name === "date") {
      setFormData({
        ...formData,
        [name]: value,
        time: ""
      });
      setAvailableTimes([]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const nextStep = () => {
    if (!formData.hospital_id || !formData.specialty_id || !formData.doctor_id || !formData.date || !formData.time) {
      alert("Please fill all fields before proceeding");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation - pastikan user sudah login
    if (!isLoggedIn) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/appointments", formData);
      
      if (response.status === 201) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  // Jika belum login, tampilkan loading atau redirect
  if (!isLoggedIn) {
    return (
      <div className="loading">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">MediConnect</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/booking">Book an Appointment</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/profile">Profile</Link>
        </div>

        {/* USER DROPDOWN */}
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
                    <Link className="dropdown-item" to="/admin/doctors">
                      <FaCog /> Dashboard
                    </Link>
                  )}

                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="dropdown-item" to="/login">
                    <FaSignInAlt /> Login
                  </Link>

                  <Link className="dropdown-item" to="/register">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* BOOKING CONTENT */}
      <div className="booking-page">
        <div className="booking-content">
          <h2>Book an Appointment</h2>

          <form className="appointment-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="hospital-form">
                  <label>Choose Hospital</label>
                  <select
                    name="hospital_id"
                    value={formData.hospital_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Hospital</option>
                    {hospitals.map(hospital => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="specialty-form">
                  <label>Choose Specialty</label>
                  <select
                    name="specialty_id"
                    value={formData.specialty_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Specialty</option>
                    {specialties.map(specialty => (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="doctor-form">
                  <label>Choose Doctor</label>
                  <select
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleChange}
                    required
                    disabled={!formData.specialty_id || !formData.hospital_id}
                  >
                    <option value="">
                      {!formData.specialty_id || !formData.hospital_id 
                        ? "Select hospital and specialty first" 
                        : "Select Doctor"}
                    </option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="date-form">
                  <label>Booking Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="time-form">
                  <label>Available Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    disabled={!formData.doctor_id || !formData.date || availableTimes.length === 0}
                  >
                    <option value="">
                      {!formData.doctor_id || !formData.date 
                        ? "Select doctor and date first" 
                        : availableTimes.length === 0 
                          ? "No available times" 
                          : "Select Time"}
                    </option>
                    {availableTimes.map((timeSlot, index) => (
                      <option key={index} value={timeSlot.time} disabled={timeSlot.status === 'booked'}>
                        {timeSlot.time} {timeSlot.status === 'booked' ? '(Booked)' : '(Available)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-buttons">
                  <button
                    type="button"
                    className="button-next"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="form-step">
                <div className="name-form">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="number-form">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="dob-form">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-buttons">
                  <button type="button" className="button-back" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="button-submit" disabled={loading}>
                    {loading ? "Booking..." : "Submit Booking"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {showSuccess && (
          <div className="success-popup">
            <div className="success-box">
              <div className="check-icon">✅</div>
              <h3>Appointment Booked Successfully!</h3>
              <p>Your appointment has been confirmed.</p>
              <button 
                onClick={() => {
                  setShowSuccess(false); 
                  navigate("/");
                }} 
                className="success-btn"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
}

export default Booking;