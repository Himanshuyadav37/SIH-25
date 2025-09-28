import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container container-fluid py-4">
      {/* Header */}
      <div className="dashboard-header d-flex align-items-center p-4 mb-5 shadow-lg rounded-4">
        <img
          src="https://via.placeholder.com/70"
          alt="Profile"
          className="profile-pic rounded-circle me-3"
        />
        <div>
          <h2 className="mb-1 fw-bold">Welcome back, Code Crafter's👋</h2>
          <small className="text-light">Class 10 | STEM Quest</small>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {[
          { title: "📘 Quizzes Completed", value: "12" },
          { title: "🎯 Progress", value: "76%" },
          { title: "📂 Resources", value: "24" },
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

      {/* Subjects Section */}
      <div className="subjects-section mb-5">
        <h4 className="mb-4 fw-bold">📚 Your Subjects</h4>
        <div className="row g-4">
          {[
            { name: "Math", icon: "➗" },
            { name: "Physics", icon: "⚡" },
            { name: "Chemistry", icon: "🧪" },
            { name: "Biology", icon: "🔬" },
          ].map((subj, i) => (
            <div key={i} className="col-md-3">
              <div className="card subject-card h-100 text-center p-3">
                <div className="subject-icon">{subj.icon}</div>
                <h5 className="mt-3">{subj.name}</h5>
                <a
                  href={`/resources/${subj.name.toLowerCase()}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light mt-3"
                >
                  📥 Download Notes
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="progress-chart">
  <h4 className="mb-4 fw-bold">📊 Learning Progress</h4>
  <div className="chart-box shadow-lg rounded-4 p-4">
    {[
      { subject: "Math", progress: 85, color: "linear-gradient(90deg,#3b82f6,#06b6d4)" },
      { subject: "Physics", progress: 70, color: "linear-gradient(90deg,#22c55e,#84cc16)" },
      { subject: "Chemistry", progress: 60, color: "linear-gradient(90deg,#f59e0b,#f97316)" },
      { subject: "Biology", progress: 90, color: "linear-gradient(90deg,#a855f7,#6366f1)" },
    ].map((item, i) => (
      <div key={i} className="mb-3">
        <div className="d-flex justify-content-between mb-1">
          <span className="fw-semibold ">{item.subject}</span>
          <span className="fw-bold text-light">{item.progress}%</span>
        </div>
        <div className="custom-progress ">
          <div
            className="custom-progress-bar"
            style={{
              width: `${item.progress}%`,
              background: item.color,
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default StudentDashboard;
