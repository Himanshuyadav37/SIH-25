import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

const fallbackDict = {
  hero_headline: "Gamify Your STEM Learning 🚀",
  hero_subtitle: "Quests, rewards & progress tracking — all in one futuristic platform.",
  cta_get_started: "Start Learning",
  cta_view_rewards: "View Rewards",
  stats_title: "Our Impact in Numbers",
  section_quests: "🔥 Hot Quests Today",
  link_view_all: "View All Quests",
  label_estimated_time: "{{mins}} mins",
  cta_start: "Start Quest",
  label_offline_ready: "Offline-ready",
  cta_big: "Ready to start your STEM journey?",
  cta_join_now: "Join Now 🚀"
};

const demoQuests = [
  { id: "q1", subject: "Math", titleKey: "Fractions Mastery", xp: 50, estMins: 10, offline: true },
  { id: "q2", subject: "Physics", titleKey: "Motion Basics", xp: 80, estMins: 15, offline: true },
  { id: "q3", subject: "Chemistry", titleKey: "Atomic Structure", xp: 60, estMins: 12, offline: false },
];

function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.ceil(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}{suffix}</span>;
}

export default function Home() {
  const { t: i18nT } = useTranslation?.() || {};
  const navigate = useNavigate();

  const translate = (key, vars) => {
    const def = fallbackDict[key] ?? key;
    if (typeof i18nT === "function") return i18nT(key, { defaultValue: def, ...(vars || {}) });
    let s = def;
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{{${k}}}`, String(v)); });
    return s;
  };

  const totalXP = 190, nextLevelXP = 300;
  const progress = Math.min((totalXP / nextLevelXP) * 100, 100);

  return (
    <div className="home-root">
      <div className="container py-5">
        {/* Hero */}
        <section className="card hero-wrap p-4 p-md-5 mb-4">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <h1 className="hero-title">{translate("hero_headline")}</h1>
              <p className="hero-subtitle">{translate("hero_subtitle")}</p>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-primary" onClick={() => navigate("/subjects")}>
                  {translate("cta_get_started")}
                </button>
                <button className="btn btn-ghost" onClick={() => navigate("/rewards")}>
                  {translate("cta_view_rewards")}
                </button>
              </div>
              <div className="xp-bar mt-4">
                <div className="xp-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="xp-text mt-1">{totalXP} / {nextLevelXP} XP</p>
            </div>
            <div className="col-12 col-lg-6">
              <div className="hero-visual card inner p-2">
                <img src="/assets/hero-graphic.png" alt="STEM Illustration" />
              </div>
            </div>
          </div>
        </section>

        {/* Quests */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="section-title">{translate("section_quests")}</h2>
            <button className="btn btn-ghost" onClick={() => navigate("/quiz")}>
              {translate("link_view_all")}
            </button>
          </div>
          <div className="row g-3">
            {demoQuests.map((q) => (
              <div className="col-12 col-md-6 col-lg-4" key={q.id}>
                <article className="card quest-card p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex gap-2">
                      <span className="chip">{q.subject}</span>
                      {q.offline && <span className="chip chip-soft">{translate("label_offline_ready")}</span>}
                    </div>
                    <span className="xp-badge">⭐ {q.xp} XP</span>
                  </div>
                  <h4 className="mb-1">{q.titleKey}</h4>
                  <p className="muted mb-3">⏱ {translate("label_estimated_time", { mins: q.estMins })}</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={() => navigate("/quiz")}>
                      {translate("cta_start")}
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="card p-4 mb-5">
          <h2 className="section-title mb-3">{translate("stats_title")}</h2>
          <div className="row g-3">
            {[{ id: 1, end: 10000, label: "Students Enrolled", suf: "+" },
              { id: 2, end: 500, label: "Teachers Onboard", suf: "+" },
              { id: 3, end: 2000, label: "Quests Completed", suf: "+" },
              { id: 4, end: 1000000, label: "XP Earned", suf: "+" },
              { id: 5, end: 120, label: "Students Tracked", suf: "+" },
              { id: 6, end: 85, label: "Avg. Quest Completion", suf: "%" },
              { id: 7, end: 24, label: "Real-time Insights", suf: "/7" }
            ].map((s) => (
              <div className="col-6 col-md-4 col-lg-3" key={s.id}>
                <div className="stat-box card inner p-3 text-center">
                  <h4 className="mb-1"><CountUp end={s.end} suffix={s.suf} /></h4>
                  <p className="muted mb-0">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card p-4 text-center mb-5">
          <h2 className="mb-3">{translate("cta_big")}</h2>
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            {translate("cta_join_now")}
          </button>
        </section>

        {/* Footer */}
        <footer className="footer card p-3 d-flex justify-content-between align-items-center">
          <p className="mb-0">© {new Date().getFullYear()} STEM Quest. All rights reserved.</p>
          <div className="footer-links d-flex gap-3">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
