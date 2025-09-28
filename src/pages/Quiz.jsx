import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

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

// 🚀 Adventure-style flat questions
const ADVENTURE_QUESTIONS = [
  { q: "2 + 3 = ?", choices: ["4", "5", "6"], answer: 1 },
  { q: "Which is a mammal?", choices: ["Shark", "Whale", "Octopus"], answer: 1 },
  { q: "Force = ?", choices: ["m*a", "m/a", "a/m"], answer: 0 },
  { q: "Water formula?", choices: ["H2O", "CO2", "O2"], answer: 0 },
  { q: "Sun rises in the …?", choices: ["West", "North", "East"], answer: 2 },
];

export default function Quiz() {
  const [mode, setMode] = useState(null); // "classic" | "adventure"
  const [step, setStep] = useState("intro");
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentQuest, setCurrentQuest] = useState(null);

  // classic quiz states
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // adventure states
  const [advStep, setAdvStep] = useState(0);
  const [advScore, setAdvScore] = useState(0);
  const [advDone, setAdvDone] = useState(false);

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
    setMode(null);
    setCurrentSubject(null);
    setCurrentQuest(null);
    restart();
    goto("intro");
    setAdvStep(0);
    setAdvScore(0);
    setAdvDone(false);
  };

  // adventure handlers
  const advCurrent = ADVENTURE_QUESTIONS[advStep];
  const advHandleAnswer = (i) => {
    if (i === advCurrent.answer) {
      setAdvScore((s) => s + 1);
      if (advStep + 1 < ADVENTURE_QUESTIONS.length) setAdvStep(advStep + 1);
      else setAdvDone(true);
    } else {
      alert("❌ Oops! Try again.");
    }
  };

  const advRestart = () => {
    setAdvStep(0);
    setAdvScore(0);
    setAdvDone(false);
  };

  return (
    <div className="quiz-page">
      {/* 🌄 Hero Intro */}
      {step === "intro" && (
        <section className="hero animate-in">
          <h1 className="hero-title">🌲 Welcome to Knowledge Quest</h1>
          <p className="hero-subtitle">
            Test skills and climb the peaks of learning. Choose a path:
          </p>
          <div className="mode-select">
            <button
              className="btn btn-primary big"
              onClick={() => {
                setMode("classic");
                goto("subjects");
              }}
            >
              🎯 Classic Quiz
            </button>
            <button
              className="btn btn-secondary big"
              onClick={() => {
                setMode("adventure");
                goto("adventure");
              }}
            >
              🌄 Adventure Mode
            </button>
          </div>
        </section>
      )}

      {/* Classic Quiz Flow */}
      {mode === "classic" && step !== "intro" && (
        <section className="quiz-panel">
          {step === "subjects" && (
            <div className="panel-card animate-in">
              <h2 className="panel-title">Choose a Subject Path</h2>
              <p className="panel-sub">Each subject is a journey — pick yours 🌄</p>
              <div className="tile-grid">
                {Object.keys(SUBJECTS).map((subj) => (
                  <button
                    key={subj}
                    className="tile"
                    onClick={() => {
                      setCurrentSubject(subj);
                      goto("quests");
                    }}
                  >
                    <span className="tile-emoji">📘</span>
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
                <button className="btn btn-ghost" onClick={() => goto("subjects")}>
                  ← Back
                </button>
              </div>
              <div className="tile-grid">
                {SUBJECTS[currentSubject].map((q) => (
                  <button
                    key={q.id}
                    className="tile"
                    onClick={() => {
                      setCurrentQuest(q);
                      goto("preview");
                    }}
                  >
                    <span className="tile-emoji">🎯</span>
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
                <button className="btn btn-ghost" onClick={() => goto("quests")}>
                  ← Back
                </button>
              </div>
              <ul className="rules">
                <li>Each question carries 1 point.</li>
                <li>No negative marking.</li>
                <li>Complete all questions to see your score.</li>
              </ul>
              <div className="actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    goto("quiz");
                    restart();
                  }}
                >
                  Start Quiz 🚀
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
                    <div className="pill">
                      {idx + 1} / {total}
                    </div>
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
                  <h2 className="panel-title">🎉 Result</h2>
                  <p className="result">You scored {score} / {total}</p>
                  <div className="actions">
                    <button className="btn btn-primary" onClick={restart}>
                      Restart
                    </button>
                    <button className="btn btn-ghost" onClick={() => goto("quests")}>
                      ← Back
                    </button>
                    <Link className="btn btn-ghost" to="/" onClick={resetFlow}>
                      🏡 Home
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      )}

      {/* Adventure Mode */}
      {mode === "adventure" && step === "adventure" && (
        <section className="adventure-container animate-in">
          <h2>🌄 Adventure Quest</h2>
          <div className="map">
            {ADVENTURE_QUESTIONS.map((_, i) => (
              <div key={i} className={`checkpoint ${i <= advStep ? "active" : ""}`}>
                {i < advStep ? "⭐" : "⚪"}
              </div>
            ))}
          </div>

          {!advDone ? (
            <div className="question-box">
              <p className="question">{advCurrent.q}</p>
              <div className="choices">
                {advCurrent.choices.map((c, i) => (
                  <button key={i} onClick={() => advHandleAnswer(i)} className="choice">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="result-box">
              <h3>🎉 Adventure Complete!</h3>
              <p>Your Score: {advScore} / {ADVENTURE_QUESTIONS.length}</p>
              <button className="btn btn-primary" onClick={advRestart}>🔄 Restart</button>
              <button className="btn btn-ghost" onClick={resetFlow}>🏡 Home</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
