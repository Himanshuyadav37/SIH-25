import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Subject from "./pages/Subjects.jsx";
import LoginPage from "./pages/Login.jsx";
import StudentDashboard from "./pages/Studentdashboard.jsx";
import Teacher from "./pages/TeacherDashboard.jsx";
import LearningGame from "./pages/MathGame.jsx";
import GameHome from "./pages/GameHome.jsx";

// 🔹 Protected Route component (uses localStorage only)
function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role"); // read role directly from localStorage

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1, width: "100%", background: "#fff" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<GameHome />} />
            <Route path="/subjects" element={<Subject />} />
            <Route path="/login" element={<LoginPage />} />
  
          {/* Role-based Protected Routes */} 
             <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher-dashboard"
              element={
                <ProtectedRoute allowedRole="teacher">
                  <Teacher />
                </ProtectedRoute>
              }
            />
          </Routes> 
          
        </div>
      </div>
    </Router>
  );
}

export default App;
