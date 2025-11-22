import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Attempting registration...");

      // SIMPLE FETCH - tanpa CSRF, tanpa credentials
      const response = await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
          // Hapus DOB sementara untuk simplify
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        // Coba parse error message
        try {
          const errorData = await response.json();
          setError(errorData.message || `Error: ${response.status}`);
        } catch {
          setError(`Server error: ${response.status}`);
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("✅ Registration success:", data);

      setSuccess("Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("❌ Registration error:", err);
      
      if (err.message.includes("Failed to fetch") || err.message.includes("Network Error")) {
        setError("Cannot connect to server. Please ensure Laravel is running on port 8000.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Test server connection
  const testServer = async () => {
    try {
      const response = await fetch("http://localhost:8000");
      if (response.ok) {
        alert("✅ Laravel server is running!");
      } else {
        alert("❌ Laravel server returned error");
      }
    } catch (error) {
      alert("❌ Cannot connect to Laravel server!\n\nRun: php artisan serve");
    }
  };

  // Mock registration for testing
  const mockRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem("user_name", form.name);
    localStorage.setItem("user_email", form.email);
    localStorage.setItem("role", "user");
    
    setSuccess("MOCK: Account created! Redirecting...");
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
    
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1 className="register-title">Book Your Everyday Healthcare.</h1>
        
        {/* Debug Panel */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <p style={{margin: '0 0 10px 0', fontSize: '14px', color: '#856404'}}>
            ⚠️ <strong>Server Connection Issues</strong>
          </p>
          <button 
            onClick={testServer}
            style={{
              padding: '8px 12px',
              margin: '5px',
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Test Server
          </button>
          <button 
            onClick={mockRegister}
            style={{
              padding: '8px 12px',
              margin: '5px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Use Mock Register
          </button>
        </div>
      </div>

      <div className="register-right">
        <h2 className="register-welcome">Welcome to MediConnect!</h2>

        <form className="register-form" onSubmit={handleRegister}>
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label>Date of Birth (Optional)</label>
          <div className="dob-row">
            <input
              type="text"
              name="day"
              placeholder="DD"
              value={form.day}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="text"
              name="month"
              placeholder="MM"
              value={form.month}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="text"
              name="year"
              placeholder="YYYY"
              value={form.year}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <label>Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label>Confirm Password *</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={handleChange}
            required
            disabled={loading}
          />

          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '10px',
              borderRadius: '5px',
              margin: '10px 0'
            }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{
              background: '#efe',
              color: '#363',
              padding: '10px',
              borderRadius: '5px',
              margin: '10px 0'
            }}>
              ✅ {success}
            </div>
          )}

          <button 
            type="submit" 
            className="register-button" 
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}