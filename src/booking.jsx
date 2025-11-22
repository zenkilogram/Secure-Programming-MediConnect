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
  const [specialties, setSpecialties] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospital_id: "",
    specialty_id: "",
    doctor_id: "",
    date: "",
    time: "",
    notes: "", // tambahkan notes
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      if (role === "admin") setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
    fetchSpecialties();
  }, []);

  useEffect(() => {
    if (formData.specialty_id && formData.hospital_id) {
      fetchDoctors(formData.specialty_id, formData.hospital_id);
    } else {
      setDoctors([]);
    }
  }, [formData.specialty_id, formData.hospital_id]);

  useEffect(() => {
    if (formData.doctor_id && formData.date) {
      fetchAvailableTimes(formData.doctor_id, formData.date);
    } else {
      setAvailableTimes([]);
    }
  }, [formData.doctor_id, formData.date]);

  // Fetch real hospitals from database
  const fetchHospitals = async () => {
    try {
      const response = await api.get("/hospitals");
      console.log("🏥 Hospitals from DB:", response.data);
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      alert("Failed to load hospitals");
    }
  };

  // Fetch real specialties from database (jika ada endpoint-nya)
  const fetchSpecialties = async () => {
    try {
      // Jika ada endpoint specialties, gunakan itu
      const response = await api.get("/specialties");
      setSpecialties(response.data);
    } catch (error) {
      console.log("No specialties endpoint, using default");
      // Fallback ke default specialties
      setSpecialties([
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
      ]);
    }
  };

  // Fetch real doctors from database based on specialty and hospital
  const fetchDoctors = async (specialtyId, hospitalId) => {
  try {
    const specialtyName = specialties.find(s => s.id == specialtyId)?.name;
    console.log(`🔍 Fetching doctors for specialty: ${specialtyName}, hospital: ${hospitalId}`);
    
    const response = await api.get(`/doctors?hospital_id=${hospitalId}&specialty=${specialtyName}`);
    console.log("👨‍⚕️ Doctors from DB:", response.data);
    setDoctors(response.data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    setDoctors([]);
  }
};

  const fetchAvailableTimes = async (doctorId, date) => {
    try {
      const response = await api.get(`/available-times?doctor_id=${doctorId}&date=${date}`);
      setAvailableTimes(response.data);
    } catch (error) {
      console.error("Error fetching available times:", error);
      // Default available times
      setAvailableTimes([
        { time: "09:00", status: "available" },
        { time: "10:00", status: "available" },
        { time: "11:00", status: "available" },
        { time: "13:00", status: "available" },
        { time: "14:00", status: "available" },
        { time: "15:00", status: "available" },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Sending appointment data:", formData);
      
      // Hanya kirim data yang diperlukan backend
      const appointmentData = {
        hospital_id: formData.hospital_id,
        doctor_id: formData.doctor_id,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || "Appointment booking"
      };
      
      const response = await api.post("/appointments", appointmentData);
      
      console.log("✅ Appointment created:", response.data);
      
      if (response.status === 201) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("❌ Booking error:", error);
      console.log("Status:", error.response?.status);
      console.log("Error data:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || "Failed to book appointment. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <>

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
                        : doctors.length === 0
                          ? "No doctors available"
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
                  <button type="button" className="button-next" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="form-step">
                <div className="confirmation-details">
                  <h3>Appointment Summary</h3>
                  <p><strong>Hospital:</strong> {hospitals.find(h => h.id == formData.hospital_id)?.name}</p>
                  <p><strong>Specialty:</strong> {specialties.find(s => s.id == formData.specialty_id)?.name}</p>
                  <p><strong>Doctor:</strong> {doctors.find(d => d.id == formData.doctor_id)?.name}</p>
                  <p><strong>Date:</strong> {formData.date}</p>
                  <p><strong>Time:</strong> {formData.time}</p>
                  {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
                </div>

                <div className="form-buttons">
                  <button type="button" className="button-back" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="button-submit" disabled={loading}>
                    {loading ? "Booking..." : "Confirm Booking"}
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
                  navigate("/profile");
                }} 
                className="success-btn"
              >
                View My Appointments
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Booking;