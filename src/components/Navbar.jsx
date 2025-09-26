// import React, { useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import "./Navbar.css";

// // Optional: Bootstrap icons
// // npm i bootstrap bootstrap-icons
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "bootstrap-icons/font/bootstrap-icons.css";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const toggle = () => setOpen((v) => !v);
//   const close = () => setOpen(false);

//   return (
//     <>
//       {/* Side rail for md+ screens, bottom dock for mobile */}
//       <header className={`navbar-rail ${open ? "expanded" : ""}`}>
//         <div className="rail-inner">
//           {/* Brand */}
//           <Link to="/" className="brand" onClick={close} aria-label="Home">
//             <span className="brand-logo">🎓</span>
//             <span className="brand-text">STEM Quest</span>
//           </Link>

//           {/* Collapse/expand button (desktop) */}
//           <button
//             className="rail-toggle"
//             aria-label="Toggle rail"
//             aria-expanded={open}
//             onClick={toggle}
//           >
//             <span className="bar" />
//             <span className="bar" />
//             <span className="bar" />
//           </button>

//           {/* Links */}
//           <nav className="rail-nav">
//             <NavLink
//               to="/subject"
//               className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`}
//               onClick={close}
//             >
//               <i className="bi bi-compass" />
//               <span className="label">Explore Subjects</span>
//             </NavLink>
//             <NavLink
//               to="/quiz"
//               className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`}
//               onClick={close}
//             >
//               <i className="bi bi-patch-question" />
//               <span className="label">Take a Quiz</span>
//             </NavLink>
//             <NavLink
//               to="/rewards"
//               className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`}
//               onClick={close}
//             >
//               <i className="bi bi-stars" />
//               <span className="label">View Rewards</span>
//             </NavLink>
//             <NavLink
//               to="/teacher"
//               className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`}
//               onClick={close}
//             >
//               <i className="bi bi-mortarboard" />
//               <span className="label">Teacher Dashboard</span>
//             </NavLink>
//           </nav>
//         </div>

//         {/* Mobile bottom dock (shown via CSS at <768px) */}
//         <nav className="dock-nav">
//           <NavLink to="/subject" className={({ isActive }) => `dock-item ${isActive ? "active" : ""}`} onClick={close}>
//             <i className="bi bi-compass" />
//             <span>Subjects</span>
//           </NavLink>
//           <NavLink to="/quiz" className={({ isActive }) => `dock-item ${isActive ? "active" : ""}`} onClick={close}>
//             <i className="bi bi-patch-question" />
//             <span>Quiz</span>
//           </NavLink>
//           <NavLink to="/rewards" className={({ isActive }) => `dock-item ${isActive ? "active" : ""}`} onClick={close}>
//             <i className="bi bi-stars" />
//             <span>Rewards</span>
//           </NavLink>
//           <NavLink to="/teacher" className={({ isActive }) => `dock-item ${isActive ? "active" : ""}`} onClick={close}>
//             <i className="bi bi-mortarboard" />
//             <span>Teacher</span>
//           </NavLink>
//         </nav>
//       </header>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <header className={`navbar-rail ${open ? "expanded" : ""}`}>
        <div className="rail-inner">
          <Link to="/" className="brand" onClick={close} aria-label="Home">
            <span className="brand-logo">🎓</span>
            <span className="brand-text">STEM Quest</span>
          </Link>

          

          <button className="rail-toggle" aria-label="Toggle rail" aria-expanded={open} onClick={toggle}>
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>

          <nav className="rail-nav">
            <NavLink to="/subject" className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`} onClick={close}>
              <span className="icon">🧭</span>
              <span className="label">Explore Subjects</span>
            </NavLink>
            <NavLink to="/quiz" className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`} onClick={close}>
              <span className="icon">❓</span>
              <span className="label">Take a Quiz</span>
            </NavLink>
            <NavLink to="/rewards" className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`} onClick={close}>
              <span className="icon">⭐</span>
              <span className="label">View Rewards</span>
            </NavLink>
            <NavLink to="/teacher" className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`} onClick={close}>
              <span className="icon">🎓</span>
              <span className="label">Teacher Dashboard</span>
            </NavLink>

             <NavLink to="/login" className={({ isActive }) => `rail-item ${isActive ? "active" : ""}`} onClick={close}>
              <span className="icon">🎓</span>
              <span className="label">Login</span>
            </NavLink>
          </nav>
        </div>

        
      </header>
    </>
  );
} 