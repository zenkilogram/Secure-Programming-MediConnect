import { useEffect, useState } from "react";
import api from "./api";
import "./Profile.css";
import doctorImg from "./assets/dokter.jpg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState({ name: "", email: "" }); // HAPUS PHONE DARI STATE
  const [appointments, setAppointments] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data ketika page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch user data
        try {
          const userRes = await api.get("/api/user/profile");
          setUser({
            name: userRes.data.fullName || userRes.data.name || "User",
            email: userRes.data.email || "No email",
          });
        } catch (userErr) {
          console.error("Failed fetching user:", userErr);
          // Fallback: ambil dari localStorage
          const userName = localStorage.getItem("user_name");
          const userEmail = localStorage.getItem("user_email");
          setUser({
            name: userName || "User",
            email: userEmail || "No email",
          });
        }

        // 2. Fetch appointments (current/upcoming)
        try {
          const appointmentsRes = await api.get("/api/appointments/my-appointments");
          setAppointments(appointmentsRes.data);
        } catch (appointmentErr) {
          console.error("Failed fetching appointments:", appointmentErr);
          // Fallback data untuk testing
          setAppointments([
            {
              id: 1,
              doctor: "Dr. Albert",
              hospital: "Primaya Hospital", 
              specialty: "Cardiology",
              date: "2024-01-20",
              time: "10:00",
              status: "Upcoming"
            }
          ]);
        }

        // 3. Fetch history (completed/cancelled appointments)
        try {
          const historyRes = await api.get("/api/appointments/history");
          setHistoryList(historyRes.data);
        } catch (historyErr) {
          console.error("Failed fetching history:", historyErr);
          // Fallback data untuk testing
          setHistoryList([
            {
              id: 2,
              doctor: "Dr. Sari Dewi",
              hospital: "Hermina Hospital",
              specialty: "Dermatology",
              date: "2024-01-10",
              time: "14:00",
              status: "Completed"
            },
            {
              id: 3,
              doctor: "Dr. Budi Santoso",
              hospital: "Siloam Hospital",
              specialty: "Cardiology", 
              date: "2024-01-05",
              time: "09:00",
              status: "Cancelled"
            }
          ]);
        }

      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Reschedule - redirect ke booking page
  const handleReschedule = (appointment) => {
    // Simpan data appointment ke localStorage atau state management
    // untuk pre-fill form di booking page
    localStorage.setItem('reschedule_data', JSON.stringify({
      hospital_id: appointment.hospital_id,
      specialty_id: appointment.specialty_id, 
      doctor_id: appointment.doctor_id
    }));
    
    navigate("/booking");
  };

  // Handle Cancel Appointment
  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await api.put(`/api/appointments/${appointmentId}/cancel`);
      
      // Update local state
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      
      // Add to history
      const cancelledAppointment = appointments.find(apt => apt.id === appointmentId);
      if (cancelledAppointment) {
        setHistoryList(prev => [{
          ...cancelledAppointment,
          status: "Cancelled"
        }, ...prev]);
      }
      
      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    switch (activeTab) {
      case "account":
        return (
          <>
            <h3>My Profile</h3>
            <div className="profile-item">
              <div>
                <strong>Name</strong>
                <p>{user.name}</p>
              </div>
              <span className="change-text">Change</span>
            </div>
            <div className="profile-item">
              <div>
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>
              <span className="change-text">Change</span>
            </div>
          </>
        );

      case "password":
        return (
          <>
            <h3>Change Password</h3>
            <div className="password-item">
              <label>Current Password</label>
              <input type="password" placeholder="Enter Current Password" />
            </div>
            <div className="password-item-new">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="password-item-confirm">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <button className="save-btn">Save</button>
          </>
        );

      case "appointment":
        if (!appointments || appointments.length === 0) {
          return (
            <div className="no-appointment">
              <div className="no-appointment-icon">📅</div>
              <h3>No Upcoming Appointments</h3>
              <p>You don't have any scheduled appointments yet.</p>
              <button 
                className="book-now-btn"
                onClick={() => navigate("/booking")}
              >
                Book an Appointment
              </button>
            </div>
          );
        }
        return (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <div key={apt.id} className="appointment-wrapper">

                <div className="appointment-card">

                  <img 
                    src={doctorImg} 
                    alt="Doctor" 
                    className="appointment-photo" 
                  />

                  <div className="appointment-info">
                    <div className="info-row">
                      <b>Doctor</b>
                      <span>{apt.doctor}</span>
                    </div>
                    <div className="info-row">
                      <b>Hospital</b>
                      <span>{apt.hospital}</span>
                    </div>
                    <div className="info-row">
                      <b>Specialty</b>
                      <span>{apt.specialty}</span>
                    </div>
                  </div>

                  <div className="appointment-side">
                    <div className="info-row">
                      <b>Date</b>
                      <span>{apt.date} — {apt.time}</span>
                    </div>
                    <div className="info-row">
                      <b>Status</b>
                      <span className={`status-text ${apt.status?.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="appointment-actions">
                  <button 
                    className="appointment-btn reschedule-btn"
                    onClick={() => handleReschedule(apt)}
                  >
                    Reschedule
                  </button>

                  <button 
                    className="appointment-btn cancel-btn"
                    onClick={() => handleCancel(apt.id)}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            ))}
          </div>
        );

      case "history":
        if (!historyList || historyList.length === 0) {
          return (
            <div className="no-history">
              <div className="no-history-icon">📋</div>
              <h3>No Appointment History</h3>
              <p>Your appointment history will appear here.</p>
            </div>
          );
        }
        return (
          <div className="history-section">
            <h3>Appointment History</h3>
            <div className="history-cards">
              {historyList.map((item) => (
                <div className="history-card" key={item.id}>
                  <div className="history-header">
                    <div className="history-doctor">
                      <strong>{item.doctor}</strong>
                      <span>{item.specialty}</span>
                    </div>
                    <span className={`status-badge ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="history-details">
                    <div className="history-info">
                      <span className="hospital">{item.hospital}</span>
                      <span className="date-time">{item.date} at {item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Account</h2>

      <div className="profile-wrapper">
        <div className="profile-sidebar">
          <ul>
            <li
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              Account
            </li>
            <li
              className={activeTab === "password" ? "active" : ""}
              onClick={() => setActiveTab("password")}
            >
              Change Password
            </li>
            <li
              className={activeTab === "appointment" ? "active" : ""}
              onClick={() => setActiveTab("appointment")}
            >
              My Appointment
            </li>
            <li
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              History
            </li>
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>

        <div className="profile-content">{renderContent()}</div>
      </div>
    </div>
  );
}