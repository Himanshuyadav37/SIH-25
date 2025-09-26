import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Subject from './pages/Subjects.jsx';
import LoginPage from './pages/Login.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/subject" element={<Subject />} />
         <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
