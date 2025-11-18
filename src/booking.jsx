import { useState } from "react";
import "./Booking.css";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospital: "",
    speciality: "",
    doctor: "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <div className="booking-page">

      <div className="booking-content">
        <h2>Book an Appointment</h2>

        <form class="appointment-form"
          onSubmit={handleSubmit}

        >
          {step === 1 && (
            <>
              <div className="hospital-form">
                <label>Choose Hospital</label>
                <select
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                >
                  <option value="">Select Hospital</option>
                  <option value="Primaya Hospital">Primaya Hospital</option>
                  <option value="Hermina Hospital">Hermina Hospital</option>
                  <option value="Siloam Hospital">Siloam Hospital</option>
                  <option value="Mayapada Hospital">Mayapada Hospital</option>
                  <option value="Mitra Keluarga Hospital">Mitra Keluarga Hospital</option>
                </select>
              </div>

              <div className="date-form">
                <label>Booking Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="speciality-form">
                <label>Choose Speciality</label>
                <select
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                >
                  <option value="">Select Speciality</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Oncology">Oncology</option>
                </select>
              </div>

              <div className="time-form">
                <label>Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="">Select Time</option>
                  <option value="09:00">09:00 - 12:00</option>
                  <option value="13:00">13:00 - 15:00</option>
                </select>
              </div>

              <div className="doctor-form">
                <label>Choose Doctor</label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Sarah Wijaya">Dr. Sarah Wijaya</option>
                  <option value="Dr. Budi Santoso">Dr. Budi Santoso</option>
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
            <div
              className="form-step"
              style={{ gridColumn: "span 2", textAlign: "left" }}
            >

              <div className="name-form">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="number-form">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="dob-form">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="form-buttons">
                <button type="button" className="button-back" onClick={prevStep}>Back</button>
                <button className="button-submit">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>

      {showSuccess && (
        <div className="success-popup">
        <div className="success-box">
        <div className="check-icon">✅</div>
          <h3>Appointment Booked!</h3>
          <p>Your appointment has been successfully created.</p>
        <button onClick={() => {setShowSuccess(false); navigate("/");}} className="success-btn">OK</button>
        </div>
      </div>
      )}

    </div>
  );
}
export default Booking;