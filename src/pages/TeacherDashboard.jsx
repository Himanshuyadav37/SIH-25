import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Teacher.css";

const TeacherDashboard = () => {
  const [isLight, setIsLight] = useState(false);
  const [search, setSearch] = useState("");

  const students = [
    { name: "Aarav", subject: "Math", progress: 85 },
    { name: "Ishita", subject: "Physics", progress: 72 },
    { name: "Rohan", subject: "Chemistry", progress: 64 },
    { name: "Meera", subject: "Biology", progress: 90 },
  ];

  // Filter students based on search input
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`dashboard-container container-fluid py-4 ${
        isLight ? "light-mode" : ""
      }`}
    >
      {/* Header */}
      <div className="dashboard-header d-flex align-items-center p-4 mb-5 shadow-lg rounded-4">
        <img
          src="https://via.placeholder.com/70"
          alt="Teacher"
          className="profile-pic rounded-circle me-3"
        />
        <div className="flex-grow-1">
          <h2 className="mb-1 fw-bold">Welcome, Teacher 👩‍🏫</h2>
          <small className="text-light">Class 10 | STEM Quest</small>
        </div>

        {/* Theme Toggle */}
        <button
          className="btn btn-outline-light toggle-btn"
          onClick={() => setIsLight(!isLight)}
        >
          {isLight ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-5">
        {[
          { title: "👨‍🎓 Total Students", value: "40" },
          { title: "📊 Avg Progress", value: "76%" },
          { title: "✅ Assignments Checked", value: "120" },
        ].map((card, i) => (
          <div key={i} className="col-md-4">
            <div className="card stat-card text-center h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title mb-3">{card.title}</h5>
                <p className="card-text display-6 fw-bold">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student Progress Table */}
      <div className="progress-section">
        <h4 className="mb-4 fw-bold">📚 Student Progress</h4>
        <div className="card shadow-lg rounded-4 p-4">
          <table className="table table-borderless align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => (
                <tr key={i}>
                  <td className="fw-semibold">{student.name}</td>
                  <td>{student.subject}</td>
                  <td style={{ width: "50%" }}>
                    <div className="custom-progress">
                      <div
                        className="custom-progress-bar"
                        style={{
                          width: `${student.progress}%`,
                          background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
                        }}
                      />
                    </div>
                    <small className="fw-bold">{student.progress}%</small>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center fw-semibold text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
