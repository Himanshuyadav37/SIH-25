import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

// Demo data
const SUBJECTS = {
  Math: [
    { id: "q1", title: "Fractions" },
    { id: "q4", title: "Algebra Basics" },
  ],
  Physics: [
    { id: "q2", title: "Motion" },
    { id: "q5", title: "Forces" },
  ],
  Chemistry: [
    { id: "q3", title: "Atoms" },
    { id: "q6", title: "Periodic Table" },
  ],
};

// Minimal questions for demo
const QUESTION_BANK = {
  q1: [
    { q: "Which is a proper fraction?", choices: ["5/3", "3/5", "7/5", "9/4"], answer: 1 },
    { q: "What is 1/2 + 1/3?", choices: ["2/5", "5/6", "1/6", "3/5"], answer: 1 },
  ],
  q2: [
    { q: "Unit for speed?", choices: ["m/s", "kg", "N·m", "A"], answer: 0 },
    { q: "If v = d/t, doubling d and t keeps v …", choices: ["same", "double", "half", "zero"], answer: 0 },
  ],
  q3: [
    { q: "Smallest unit of matter?", choices: ["Molecule", "Compound", "Atom", "Mixture"], answer: 2 },
    { q: "Which is a noble gas?", choices: ["Oxygen", "Neon", "Nitrogen", "Hydrogen"], answer: 1 },
  ],
  q4: [{ q: "Solve 2x+3=7", choices: ["1", "2", "3", "4"], answer: 1 }],
  q5: [{ q: "Force = ?", choices: ["m*a", "m/a", "a/m", "m+a"], answer: 0 }],
  q6: [{ q: "H belongs to which group?", choices: ["1", "2", "17", "18"], answer: 0 }],
};

export default function Quiz() {
  const [step, setStep] = useState("subjects"); // subjects, quests, preview, quiz
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentQuest, setCurrentQuest] = useState(null);

  // Quiz state
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = useMemo(
    () => (currentQuest ? QUESTION_BANK[currentQuest.id] || [] : []),
    [currentQuest]
  );
  const total = questions.length;
  const currentQuestion = questions[idx];

  const goto = (next) => setStep(next);

  const answer = (choiceIndex) => {
    if (choiceIndex === currentQuestion.answer) setScore((s) => s + 1);
    if (idx + 1 < total) setIdx((i) => i + 1);
    else setDone(true);
  };

  const restart = () => {
    setIdx(0);
    setScore(0);
    setDone(false);
  };

  const resetFlow = () => {
    setCurrentSubject(null);
    setCurrentQuest(null);
    restart();
    goto("subjects");
  };

  return (
    <div className="quiz-page">
      {/* Stepper */}
      <div className="stepper" aria-label="Quiz steps">
        <div className={`step ${step !== "subjects" ? "done" : "active"}`}>
          <span>1</span><small>Subjects</small>
        </div>
        <div className={`connector ${["quests","preview","quiz"].includes(step) ? "fill" : ""}`} />
        <div className={`step ${["preview","quiz"].includes(step) ? "done" : step==="quests" ? "active" : ""}`}>
          <span>2</span><small>Quests</small>
        </div>
        <div className={`connector ${["preview","quiz"].includes(step) ? "fill" : ""}`} />
        <div className={`step ${step==="quiz" ? "done" : step==="preview" ? "active" : ""}`}>
          <span>3</span><small>Preview</small>
        </div>
        <div className={`connector ${step==="quiz" ? "fill" : ""}`} />
        <div className={`step ${step==="quiz" ? "active" : ""}`}>
          <span>4</span><small>Quiz</small>
        </div>
      </div>

      {/* Panel */}
      <section className="quiz-panel">
        {step === "subjects" && (
          <div className="panel-card animate-in">
            <h2 className="panel-title">Select a Subject</h2>
            <div className="tile-grid">
              {Object.keys(SUBJECTS).map((subj) => (
                <button
                  key={subj}
                  className="tile"
                  onClick={() => { setCurrentSubject(subj); goto("quests"); }}
                >
                  <span className="tile-emoji" aria-hidden>📘</span>
                  <span>{subj}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "quests" && currentSubject && (
          <div className="panel-card animate-in">
            <div className="panel-head">
              <h2 className="panel-title">{currentSubject} Quests</h2>
              <button className="btn btn-ghost" onClick={() => goto("subjects")}>← Back</button>
            </div>
            <div className="tile-grid">
              {SUBJECTS[currentSubject].map((q) => (
                <button
                  key={q.id}
                  className="tile"
                  onClick={() => { setCurrentQuest(q); goto("preview"); }}
                >
                  <span className="tile-emoji" aria-hidden>🎯</span>
                  <span>{q.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "preview" && currentQuest && (
          <div className="panel-card animate-in">
            <div className="panel-head">
              <h2 className="panel-title">{currentQuest.title} — Preview</h2>
              <button className="btn btn-ghost" onClick={() => goto("quests")}>← Back</button>
            </div>
            <ul className="rules">
              <li>Each question carries 1 point.</li>
              <li>No negative marking.</li>
              <li>Complete all questions to see your score.</li>
            </ul>
            <div className="actions">
              <button className="btn btn-primary" onClick={() => { goto("quiz"); restart(); }}>
                Start Quiz
              </button>
              <button className="btn btn-ghost" onClick={() => goto("quests")}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === "quiz" && currentQuest && (
          <div className="panel-card animate-in">
            {!done ? (
              <>
                <div className="panel-head">
                  <h2 className="panel-title">{currentQuest.title}</h2>
                  <div className="pill">{idx + 1} / {total}</div>
                </div>

                <div className="question">{currentQuestion.q}</div>
                <ul className="choices">
                  {currentQuestion.choices.map((c, i) => (
                    <li key={i}>
                      <button className="choice" onClick={() => answer(i)}>
                        <span className="index">{i + 1}.</span> {c}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="actions">
                  <button
                    className="btn btn-ghost"
                    disabled={idx === 0}
                    onClick={() => setIdx((i) => Math.max(0, i - 1))}
                  >
                    ← Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (idx + 1 < total) setIdx((i) => i + 1);
                      else setDone(true);
                    }}
                  >
                    {idx + 1 < total ? "Next →" : "Finish ✔"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="panel-title">Result</h2>
                <p className="result">Score: {score} / {total}</p>
                <div className="actions">
                  <button className="btn btn-primary" onClick={restart}>Restart</button>
                  <button className="btn btn-ghost" onClick={() => goto("quests")}>← Back to Quests</button>
                  <Link className="btn btn-ghost" to="/" onClick={resetFlow}>Home</Link>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
