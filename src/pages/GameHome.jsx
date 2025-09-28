// GameHome.jsx
import React, { useState } from "react";
import MathGame from "./MathGame.jsx";
import PhysicsGame from "./PhysicsGame.jsx";
import ChemistryGame from "./ChemistryGame.jsx";
import BiologyGame from "./BiologyGame.jsx";
import ComputerScience from "./ComputerScience.jsx";
import "./GameHome.css";

const SUBJECT_META = {
  Math: { color: "info", icon: "∑" },
  Physics: { color: "warning", icon: "⚡" },
  Chemistry: { color: "danger", icon: "⚗️" },
  Biology: { color: "success", icon: "🧬" },
  "Computer Science": { color: "primary", icon: "💻" },
};

export default function GameHome() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const goBack = () => setSelectedSubject(null);

  if (selectedSubject) {
    switch (selectedSubject) {
      case "Math":
        return <MathGame className={selectedClass} goBack={goBack} />;
      case "Physics":
        return <PhysicsGame className={selectedClass} goBack={goBack} />;
      case "Chemistry":
        return <ChemistryGame className={selectedClass} goBack={goBack} />;
      case "Biology":
       return <BiologyGame className={selectedClass} goBack={goBack} />;
      case "Computer Science":
         return <ComputerScience className={selectedClass} goBack={goBack} />;
      default:
        return <div className="container py-5 text-center">Subject not found</div>;
    }
  }

  const classes = ["6", "7", "8", "9", "10", "11", "12"];
  const subjects = ["Math", "Physics", "Chemistry", "Biology", "Computer Science"];

  return (
    <div className="gamehome-root">
      <div className="container py-5">
        <header className="text-center mb-4">
          <h1 className="display-6 fw-semibold text-light">Learning Arcade</h1>
          <p className="text-muted mb-0">
            Pick a class for tailored difficulty, then choose a subject to start playing.
          </p>
          <div className="mt-3 d-flex justify-content-center align-items-center gap-2">
            {selectedClass ? (
              <>
                <span className="badge bg-cyan text-dark px-3 py-2">
                  Class {selectedClass}
                </span>
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => setSelectedClass(null)}
                >
                  Clear
                </button>
              </>
            ) : (
              <span className="badge bg-secondary-subtle text-secondary px-3 py-2">
                Class not selected
              </span>
            )}
          </div>
        </header>

        <section className="glassy-card p-4 mb-4">
          <h5 className="text-info mb-3">Choose Class</h5>
          <div className="d-flex flex-wrap gap-2">
            {classes.map((cls) => (
              <button
                key={cls}
                className={`btn class-chip ${selectedClass === cls ? "btn-chip-active" : ""}`}
                onClick={() => setSelectedClass((cur) => (cur === cls ? null : cls))}
              >
                {cls}
              </button>
            ))}
            <button className="btn btn-outline-secondary ms-auto" onClick={() => setSelectedClass(null)}>
              Reset
            </button>
          </div>
        </section>

        <section>
          <h5 className="text-info mb-3">Pick a Subject</h5>
          <div className="row g-3">
            {subjects.map((subj) => {
              const meta = SUBJECT_META[subj];
              return (
                <div key={subj} className="col-12 col-sm-6 col-lg-4">
                  <button
                    className={`subject-card w-100 glassy-card text-start border-0 p-3 subject-${meta.color}`}
                    onClick={() => setSelectedSubject(subj)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="subject-icon">{meta.icon}</div>
                      <div>
                        <div className="h5 mb-1">{subj}</div>
                        <div className="text-muted small">
                          {selectedClass ? `Class ${selectedClass} • ` : ""}Arcade quiz and practice
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
