import React, { useState } from "react";
import "./Login.css";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "", role: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${form.email}\nPassword: ${form.password}\nRole: ${form.role}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Illustration */}
        <div className="login-illustration">
          <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Login Illustration" />
          <h3>Learn Without Limits</h3>
          <p>Join Edu-Tech and access top-quality tutors, live classes, and a global learning community.</p>
        </div>

        {/* Right Form */}
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">
            Log in to continue your learning journey with <span>Edu-Tech</span>
          </p>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-control"
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn-login">
            Login
          </button>

          {/* Extra Links */}
          <div className="login-footer">
            Don’t have an account? <span>Register here</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
