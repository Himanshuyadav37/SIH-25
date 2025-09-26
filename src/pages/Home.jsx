import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

const fallbackDict = {
  hero_headline: "Gamify Your STEM Learning 🚀",
  hero_subtitle: "Quests, rewards & progress tracking — all in one futuristic platform.",
  cta_get_started: "Start Learning",
  cta_view_rewards: "View Rewards",
  cta_view_dashboard: "Teacher Dashboard",
  section_quests: "🔥 Hot Quests Today",
  link_view_all: "View All Quests",
  label_estimated_time: "{{mins}} mins",
  cta_start: "Start Quest",
  subject_math: "Math",
  subject_physics: "Physics",
  subject_chemistry: "Chemistry",
  label_offline_ready: "Offline-ready",
  section_teacher_insights: "📊 Teacher Insights",
};

const demoQuests = [
  { id: "q1", subject: "Math", titleKey: "Fractions Mastery", xp: 50, estMins: 10, offline: true },
  { id: "q2", subject: "Physics", titleKey: "Motion Basics", xp: 80, estMins: 15, offline: true },
  { id: "q3", subject: "Chemistry", titleKey: "Atomic Structure", xp: 60, estMins: 12, offline: false },
];

export default function Home() {
  const { t: i18nT } = useTranslation?.() || {};
  const navigate = useNavigate();

  const translate = (key, vars) => {
    const def = fallbackDict[key] ?? key;
    if (typeof i18nT === "function") {
      return i18nT(key, { defaultValue: def, ...(vars || {}) });
    }
    let s = def;
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{{${k}}}`, String(v)); });
    return s;
  };

  const totalXP = 190, nextLevelXP = 300;
  const progress = Math.min((totalXP / nextLevelXP) * 100, 100);

  // Function to check login and redirect if not logged in
  const requireLogin = (callback) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      callback?.();
    }
  };

  return (
    <div className="home-page full-bleed">
      {/* Hero */}
      <section className="hero-wrap">
        <div className="hero-text">
          <h2 className="hero-title">{translate("hero_headline")}</h2>
          <p className="hero-subtitle">{translate("hero_subtitle")}</p>
          <div className="hero-buttons">
            <button className="btn btn-glow" onClick={() => requireLogin(() => navigate("/subject"))}>
              {translate("cta_get_started")}
            </button>
            <button className="btn btn-outline" onClick={() => requireLogin(() => navigate("/rewards"))}>
              {translate("cta_view_rewards")}
            </button>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{totalXP} / {nextLevelXP} XP</p>
        </div>
        <div className="hero-visual">
          <img src="/assets/hero-graphic.png" alt="STEM Illustration" />
        </div>
      </section>

      {/* Quests */}
      <section className="quests-section full-bleed-pad">
        <div className="quests-header">
          <h3>{translate("section_quests")}</h3>
          <button className="view-all" onClick={() => requireLogin(() => navigate("/quiz"))}>
            {translate("link_view_all")}
          </button>
        </div>
        <div className="quests-grid">
          {demoQuests.map((q) => (
            <article key={q.id} className="quest-card">
              <div className="quest-tags">
                <span className="tag subject">{q.subject}</span>
                {q.offline && <span className="tag offline">{translate("label_offline_ready")}</span>}
              </div>
              <h4>{q.titleKey}</h4>
              <p>⏱ {translate("label_estimated_time", { mins: q.estMins })}</p>
              <div className="quest-footer">
                <span>⭐ {q.xp} XP</span>
                <button className="btn-sm" onClick={() => requireLogin(() => navigate(`/quiz?quest=${q.id}`))}>
                  {translate("cta_start")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Teacher Insights */}
      <section className="teacher-section full-bleed-pad">
        <div className="teacher-card">
          <div className="teacher-stat">
            <h4>120+</h4>
            <p>Students Tracked</p>
          </div>
          <div className="teacher-stat">
            <h4>85%</h4>
            <p>Avg. Quest Completion</p>
          </div>
          <div className="teacher-stat">
            <h4>24/7</h4>
            <p>Real-time Insights</p>
          </div>
        </div>
      </section>
    </div>
  );
}
