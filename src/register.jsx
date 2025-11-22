import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    password_confirmation: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          dob: `${form.year}-${form.month}-${form.day}`,
          password: form.password,
          password_confirmation: form.password_confirmation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Account created!");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      console.log(err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1 className="register-title">Book Your Everyday Healthcare.</h1>
      </div>

      <div className="register-right">
        <h2 className="register-welcome">Welcome to MediConnect!</h2>

        <form className="register-form" onSubmit={handleRegister}>
          <label className="fullname-label">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="register-input"
          />

          <label className="email-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="register-input"
          />

          <label className="register-label">Date of Birth</label>
          <div className="dob-row">
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={form.day}
              onChange={handleChange}
              className="dob-input"
            />
            <input
              type="text"
              name="month"
              placeholder="Month"
              value={form.month}
              onChange={handleChange}
              className="dob-input"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              className="dob-input"
            />
          </div>

          <label className="password-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="register-input"
          />

          <label className="confimpass-label">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={handleChange}
            className="register-input"
          />

          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}

          <button className="register-button" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </button>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}