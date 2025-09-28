

// PhysicsGame.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css";

// Physics questions
const QUESTIONS = [
  { q: "H2O is?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], answer: "Water" },

  { q: "Formula of common salt?", options: ["NaCl", "KCl", "Na2CO3", "CaCl2"], answer: "NaCl" },

  { q: "Acid in vinegar?", options: ["Citric acid", "Acetic acid", "Lactic acid", "Tartaric acid"], answer: "Acetic acid" },

  { q: "Atomic number of carbon?", options: ["6", "8", "12", "14"], answer: "6" },

  { q: "pH of a neutral solution at 25°C?", options: ["0", "7", "14", "1"], answer: "7" },

  { q: "Gas used in respiration?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
];

const BOX_LABELS = ["★", "π", "∞", "∑", "42", "√", "α", "β", "γ", "δ"];
const DIFFICULTY_PRESETS = {
  Easy: { boxCount: 5, speedMin: 1.5, speedMax: 3, playerSpeed: 12 },
  Medium: { boxCount: 7, speedMin: 2.5, speedMax: 4.2, playerSpeed: 13 },
  Hard: { boxCount: 9, speedMin: 3.5, speedMax: 5.2, playerSpeed: 14 },
};

export default function PhysicsGame({ className, goBack }) {
  const canvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem("lg_highscore") || "0"));
  const [lives, setLives] = useState(3);

  const [currentQ, setCurrentQ] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const [showLevelSelector, setShowLevelSelector] = useState(true);

  // New states for session questions
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const TOTAL_QUESTIONS = 5;

  const settings = useMemo(() => DIFFICULTY_PRESETS[difficulty], [difficulty]);
  const subject = "Physics";

  const handleLevelSelect = (level) => {
    setDifficulty(level);
    setShowLevelSelector(false);
    setGameStarted(true);
  };

  // Timer (optional if you want timed questions)
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (!showModal) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimeLeft(15);
    } else {
      setTimeLeft(15);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) setGameOver(true);
              return newLives;
            });
            setCombo(0);
            setShowModal(false);
            setPaused(false);
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [showModal]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bottomBar = { x: 0, y: canvas.height - 12, w: canvas.width, h: 12 };
    const player = { x: canvas.width / 2 - 60, y: canvas.height - 80, w: 120, h: 20, speed: settings.playerSpeed };
    const boxes = Array.from({ length: settings.boxCount }, (_, idx) => ({
      x: Math.random() * (canvas.width - 50),
      y: Math.random() * -canvas.height,
      w: 50, h: 50,
      speed: settings.speedMin + Math.random() * (settings.speedMax - settings.speedMin),
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      label: BOX_LABELS[idx % BOX_LABELS.length],
    }));

    let keys = {};
    let particles = [];
    let animationFrameId;

    const handleKeyDown = (e) => (keys[e.key] = true);
    const handleKeyUp = (e) => (keys[e.key] = false);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const resetBox = (box) => {
      box.x = Math.random() * (canvas.width - box.w);
      box.y = Math.random() * -100;
      box.speed = settings.speedMin + Math.random() * (settings.speedMax - settings.speedMin);
      box.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
      box.label = BOX_LABELS[Math.floor(Math.random() * BOX_LABELS.length)];
    };

    const createParticles = (x, y, color) => {
      for (let i = 0; i < 15; i++) {
        particles.push({ x, y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, alpha: 1, radius: Math.random() * 4 + 2, color });
      }
    };

    const updateParticles = () => {
      particles = particles.filter((p) => p.alpha > 0);
      particles.forEach((p) => { p.x += p.vx; p.y += p.vy; p.alpha -= 0.03; });
    };

    const rectsOverlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    const update = () => {
      if (paused || gameOver) return;

      if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
      if (keys["ArrowRight"] && player.x < canvas.width - player.w) player.x += player.speed;

      boxes.forEach((box) => {
        box.y += box.speed;

        if (box.y + box.h >= bottomBar.y) setGameOver(true);

        if (box.y > canvas.height) {
          setLives((l) => { const newLives = l - 1; if (newLives <= 0) setGameOver(true); return newLives; });
          setCombo(0);
          resetBox(box);
        }

        // Collision triggers question modal
        if (rectsOverlap(player, box) && !showModal) {
          const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
          setCurrentQ(randomQ);
          setShowModal(true);
          setPaused(true);
          createParticles(box.x + box.w / 2, box.y + box.h / 2, box.color);
          resetBox(box);
        }
      });

      updateParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#2c5364");
      gradient.addColorStop(1, "#203a43");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => { ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); });
      ctx.globalAlpha = 1;

      // Player neon
      ctx.fillStyle = "#00fff0";
      ctx.shadowColor = "#00fff0";
      ctx.shadowBlur = 20;
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.shadowBlur = 0;

      // Boxes with glow
      boxes.forEach((box) => {
        ctx.fillStyle = box.color;
        ctx.shadowColor = box.color;
        ctx.shadowBlur = 15;
        ctx.fillRect(box.x, box.y, box.w, box.h);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#051014";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(box.label, box.x + box.w / 2, box.y + box.h / 2);
      });

      // Bottom bar
      ctx.fillStyle = "rgba(255,0,68,0.65)";
      ctx.fillRect(bottomBar.x, bottomBar.y, bottomBar.w, bottomBar.h);

      // HUD neon
      ctx.fillStyle = "#00ffea";
      ctx.font = "24px 'Orbitron', sans-serif";
      ctx.fillText(`Class ${className} - ${subject}`, 30, 40);
      ctx.fillText(`Score: ${score}`, 30, 80);
      ctx.fillText(`Lives: ${lives}`, 30, 120);

      if (gameOver) {
        ctx.fillStyle = "#ff0044";
        ctx.font = "64px 'Orbitron', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      }
      if (paused && !gameOver && !showResults) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0ff";
        ctx.font = "56px 'Orbitron', sans-serif";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
      }
    };

    const loop = () => { update(); draw(); animationFrameId = requestAnimationFrame(loop); };
    loop();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; bottomBar.w = canvas.width; bottomBar.y = canvas.height - 12; };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver, score, lives, paused, settings, soundOn, showModal, showResults]);

  // Handle answer
  const handleAnswer = (option) => {
    const correct = option === currentQ?.answer;

    if (correct) {
      setScore((s) => s + 1);
      setSessionScore((s) => s + 1);
      setCombo((c) => c + 1);
      if (combo + 1 > bestCombo) setBestCombo(combo + 1);
    } else {
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) setGameOver(true);
        return newLives;
      });
      setCombo(0);
    }

    setQuestionsAnswered((q) => q + 1);
    setShowModal(false);

    if (questionsAnswered + 1 >= TOTAL_QUESTIONS) {
      setShowResults(true);
      setPaused(true);
    } else {
      setPaused(false);
    }
  };

  return (
    <div className="game-root">

      {/* Level Selector Modal */}
      {showLevelSelector && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 question-modal neon-glass">
              <h4 className="text-center mb-3">Select Level</h4>
              <div className="d-grid gap-2">
                {Object.keys(DIFFICULTY_PRESETS).map((level) => (
                  <button key={level} className="btn btn-outline-primary btn-glow" onClick={() => handleLevelSelect(level)}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Navbar */}
      <nav className="navbar navbar-expand-md glassy-nav px-3 neon-glass">
        <span className="navbar-brand neon-brand">Class : Chemistry </span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="badge bg-info text-dark fs-6 neon-glow">Score: {score}</span>
          <span className="badge bg-warning text-dark fs-6 neon-glow">High: {highScore}</span>
          <span className="badge bg-success text-dark fs-6 neon-glow">Combo: {combo}</span>
          <span className="badge bg-light text-dark fs-6 neon-glow">Best: {bestCombo}</span>
          <button className={`btn ${soundOn?"btn-outline-success":"btn-outline-secondary"}`} onClick={()=>setSoundOn(s=>!s)}>{soundOn?"Sound On":"Sound Off"}</button>
          <button className={`btn ${paused?"btn-warning":"btn-outline-warning"}`} disabled={!gameStarted || gameOver} onClick={()=>setPaused(p=>!p)}>{paused?"Resume":"Pause"}</button>
          <button className="btn btn-outline-danger" onClick={goBack}>Quit</button>
        </div>
      </nav>

      <div className="game-stage">
        {gameStarted && <canvas ref={canvasRef} className="game-canvas" />}
      </div>

      {/* Question Modal */}
      {showModal && currentQ && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 question-modal neon-glass">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0">Solve this</h4>
                <span className={`badge ${timeLeft<=5?"bg-danger":"bg-info"} fs-6`}>{timeLeft}s</span>
              </div>
              <p className="lead text-center">{currentQ.q}</p>
              <div className="d-grid gap-2">
                {currentQ.options.map((opt,i)=><button key={i} className="btn btn-outline-info btn-glow" onClick={()=>handleAnswer(opt)}>{opt}</button>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Results */}
      {showResults && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 question-modal neon-glass text-center">
              <h4 className="mb-3">Session Complete!</h4>
              <p className="lead">You answered {sessionScore} / {TOTAL_QUESTIONS} correctly!</p>
              <div className="d-grid gap-2">
                <button className="btn btn-success btn-glow" onClick={() => {
                  setShowResults(false);
                  setQuestionsAnswered(0);
                  setSessionScore(0);
                  setPaused(false);
                }}>Play Again</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div className="bottom-controls container">
          <div className="alert alert-danger glassy-alert d-flex justify-content-between align-items-center neon-glass">
            <span>Game Over! Final Score: {score}</span>
            <button className="btn btn-success btn-glow" onClick={() => window.location.reload()}>Restart</button>
          </div>
        </div>
      )}

    </div>
  );
}
