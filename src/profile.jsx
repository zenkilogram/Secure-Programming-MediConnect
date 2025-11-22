import { useEffect, useState } from "react";
import api from "./api";
import "./Profile.css";
import doctorImg from "./assets/dokter.jpg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState({ name: "", email: "" });
  const [appointments, setAppointments] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        try {
          const userRes = await api.get("/me");
          const userData = userRes.data;
          setUser({
            name: userData.name || "User",
            email: userData.email || "No email",
          });
          
          localStorage.setItem("user_name", userData.name || "User");
          localStorage.setItem("user_email", userData.email || "No email");
          localStorage.setItem("user_id", userData.id || "");
        } catch (userErr) {
          console.error("Failed fetching user:", userErr);
          const userName = localStorage.getItem("user_name");
          const userEmail = localStorage.getItem("user_email");
          setUser({
            name: userName || "User",
            email: userEmail || "No email",
          });
        }

        try {
          const appointmentsRes = await api.get("/appointments");
          if (appointmentsRes.data && Array.isArray(appointmentsRes.data)) {
            const activeAppointments = appointmentsRes.data.filter(
              apt => apt.status && apt.status !== "Completed" && apt.status !== "Cancelled"
            );
            setAppointments(activeAppointments);
            
            const historyData = appointmentsRes.data.filter(
              apt => apt.status && (apt.status === "Completed" || apt.status === "Cancelled")
            );
            setHistoryList(historyData);
          }
        } catch (appointmentErr) {
          console.error("Failed fetching appointments:", appointmentErr);
          setAppointments([]);
          setHistoryList([]);
        }

      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReschedule = (appointment) => {
    localStorage.setItem('reschedule_data', JSON.stringify({
      hospital_id: appointment.hospital_id,
      specialty_id: appointment.specialty_id, 
      doctor_id: appointment.doctor_id,
      appointment_id: appointment.id
    }));
    
    navigate("/booking");
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await api.put(`/appointments/${appointmentId}/cancel`);
      
      const cancelledAppointment = appointments.find(apt => apt.id === appointmentId);
      if (cancelledAppointment) {
        setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading profile data...</div>;
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
            </div>
            <div className="profile-item">
              <div>
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>
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
                    src={apt.doctor?.photo || doctorImg} 
                    alt="Doctor" 
                    className="appointment-photo" 
                  />

                  <div className="appointment-info">
                    <div className="info-row">
                      <b>Doctor</b>
                      <span>{apt.doctor?.name || apt.doctorName || "Doctor"}</span>
                    </div>
                    <div className="info-row">
                      <b>Hospital</b>
                      <span>{apt.hospital?.name || apt.hospitalName || "Hospital"}</span>
                    </div>
                    <div className="info-row">
                      <b>Specialty</b>
                      <span>{apt.specialty?.name || apt.specialtyName || apt.doctor?.specialty || "Specialty"}</span>
                    </div>
                  </div>

                  <div className="appointment-side">
                    <div className="info-row">
                      <b>Date</b>
                      <span>{formatDate(apt.date)} — {formatTime(apt.time)}</span>
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
                      <strong>{item.doctor?.name || item.doctorName || "Doctor"}</strong>
                      <span>{item.specialty?.name || item.specialtyName || item.doctor?.specialty || "Specialty"}</span>
                    </div>
                    <span className={`status-badge ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="history-details">
                    <div className="history-info">
                      <span className="hospital">{item.hospital?.name || item.hospitalName || "Hospital"}</span>
                      <span className="date-time">{formatDate(item.date)} at {formatTime(item.time)}</span>
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
    localStorage.removeItem("reschedule_data");
    localStorage.removeItem("user_id");
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