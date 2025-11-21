import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import api from "./api"; 

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login success!");

      window.location.href = "/";
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-title">Book Your Everyday<br />Healthcare.</h1>
      </div>

      <div className="login-right">
        <h2 className="welcome-title">Welcome to MediConnect!</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}