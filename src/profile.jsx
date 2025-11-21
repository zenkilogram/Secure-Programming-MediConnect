import { useState } from "react";
import "./Profile.css";
import doctorImg from "./assets/dokter.jpg";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <>
            <h3>My Profile</h3>
            <div className="profile-item">
              <div>
                <strong>Name</strong>
                <p>James Stephen</p>
              </div>
              <span className="change-text">Change</span>
            </div>
            <div className="profile-item">
              <div>
                <strong>Email</strong>
                <p>james@gmail.com</p>
              </div>
              <span className="change-text">Change</span>
            </div>
            <div className="profile-item">
              <div>
                <strong>Phone Number</strong>
                <p>08xx-xxxx-xxxx</p>
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
        return (
          <div className="appointment">
            <h3>My Appointment</h3>
            <img src={doctorImg} alt="Doctor" className="doctor-photo" />

            <div className="appointment-1">
                <strong>Doctor</strong> 
                <p>Dr. Angel Chandra</p>
                <strong>Hospital</strong>
                <p> Daun Hospital</p>
                <strong>Speciality</strong> 
                <p>Cardiology</p>
            </div>
            <div className="appointment-2">
                <strong>Date</strong> 
                <p>12 Agustus 2025</p>
                <strong>Time</strong> 
                <p>09:00 - 12:00</p>
                <strong>Status</strong> 
                <p>Upcoming</p>
            </div>
            <div className="appointment-actions">
            <button className="reschedule-btn">Reschedule</button>
            <button className="cancel-btn">Cancel</button>
            </div>
            </div>
        );

      case "history":
        const historyList = [
          {
            doctor: "Dr. Alan Halim",
            specialty: "Cardiology",
            hospital: "Daun Hospital",
            date: "01/10/2025",
            status: "Cancelled"
          }
];
        return (
          <div className="history">
            <h3>History</h3>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Speciality</th>
                  <th>Hospital</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {historyList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.doctor}</td>
                    <td>{item.specialty}</td>
                    <td>{item.hospital}</td>
                    <td>{item.date}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ); 

      default:
        return null;
    }
  };

  return (
    <>
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
              <li className="logout">Logout</li>
            </ul>
          </div>

          <div className="profile-content">{renderContent()}</div>
        </div>
      </div>
    </>
  );
}