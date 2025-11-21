import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // Tambah useNavigate
import api from "./api"; 

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook untuk redirect

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

      // 1. Simpan Token & User Info
      localStorage.setItem("token", res.data.access_token);
      
      // Asumsi backend mengirim object user yang punya kolom 'role'
      // Sesuaikan 'res.data.user.role' dengan respon asli backendmu jika berbeda
      const userRole = res.data.user.role; 
      localStorage.setItem("role", userRole); 
      localStorage.setItem("user_name", res.data.user.name);

      alert("Login success!");

      // 2. Logika Redirect Berdasarkan Role
      if (userRole === 'admin') {
        navigate("/admin/doctors"); // Admin ke Dashboard
      } else {
        navigate("/"); // User biasa ke Home
      }

    } catch (err) {
      alert("Login failed. Cek email/password.");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-title">Book Your Everyday<br />Healthcare.</h1>
      </div>

      <div className="login-right">
        <h2 className="welcome-title">Welcome back!</h2>

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