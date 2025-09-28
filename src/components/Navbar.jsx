import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  // Theme persistence
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync role with localStorage + custom event
  useEffect(() => {
    const handleRoleChange = () => setRole(localStorage.getItem("role"));
    window.addEventListener("storage", handleRoleChange);
    window.addEventListener("roleChange", handleRoleChange); // 👈 custom event
    return () => {
      window.removeEventListener("storage", handleRoleChange);
      window.removeEventListener("roleChange", handleRoleChange);
    };
  }, []);

  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    window.dispatchEvent(new Event("roleChange")); // 👈 notify Navbar
    navigate("/login");
  };

  return (
    <header className={`navbar-rail ${open ? "expanded" : ""}`}>
      <div className="rail-inner">
        {/* Logo */}
        <Link to="/" className="brand" onClick={close} aria-label="Home">
          <span className="brand-logo">🎓</span>
          <span className="brand-text">STEM Quest</span>
        </Link>

        {/* Toggle */}
        <button
          className="rail-toggle"
          aria-label="Toggle rail"
          aria-expanded={open}
          onClick={toggle}
        >
          <span className="bar" /><span className="bar" /><span className="bar" />
        </button>

        {/* Navigation */}
        <nav className="rail-nav">
          <NavLink to="/subjects" className="rail-item" onClick={close}>
            <span className="icon">🧭</span>
            <span className="label">Explore Subjects</span>
          </NavLink>

          <NavLink to="/quiz" className="rail-item" onClick={close}>
            <span className="icon">❓</span>
            <span className="label">Take a Quiz</span>
          </NavLink>

          {role === "student" && (
            <NavLink to="/student-dashboard" className="rail-item" onClick={close}>
              <span className="icon">🎒</span>
              <span className="label">Student Dashboard</span>
            </NavLink>
          )}

          {role === "teacher" && (
            <NavLink to="/teacher-dashboard" className="rail-item" onClick={close}>
              <span className="icon">📚</span>
              <span className="label">Teacher Dashboard</span>
            </NavLink>
          )}

          {!role ? (
            <NavLink to="/login" className="rail-item" onClick={close}>
              <span className="icon">🔐</span>
              <span className="label">Login</span>
            </NavLink>
          ) : (
            <button onClick={handleLogout} className="rail-item logout-btn">
              <span className="icon">🚪</span>
              <span className="label">Logout</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
