import React, { useState } from "react";
import "./Subject.css";

const SUBJECTS = {
  6: ["Math", "Science"],
  7: ["Math", "Science"],
  8: ["Math", "Science"],
  9: ["Math", "Physics", "Chemistry", "Biology"],
  10: ["Math", "Physics", "Chemistry", "Biology"],
  11: ["Math", "Physics", "Chemistry", "Biology"],
  12: ["Math", "Physics", "Chemistry", "Biology"],
};

// Official NCERT textbook PDF links (examples / partial)
const RESOURCES = {
  Math: {
    English: "https://ncert.nic.in/textbook/pdf/iemh1ps.pdf",
    Hindi:   "https://ncert.nic.in/textbook/pdf/iemh101.pdf",
  },
  Physics: {
    English: "https://ncert.nic.in/textbook/pdf/iemh112.pdf",
    Hindi:   "", // not available yet
  },
  Chemistry: {
    English: "", // not available yet
    Hindi:   "", // not available yet
  },
  Biology: {
    English: "", // not available yet
    Hindi:   "", // not available yet
  },
};

const TEXT = {
  English: {
    title: "📘 Download & Read STEM Notes",
    selectLanguage: "🌐 Select Language:",
    selectClass: "🏫 Select Class:",
    selectSubject: "📚 Select Subject:",
    choose: "--Choose--",
    download: "⬇ Download Book",
    preview: "📖 Preview Book",
    notes: "Notes",
    backHome: "← Back to Home",
    classes: "Class",
    comingSoon: "Resources coming soon for this selection.",
    notAvailable: "Not available in the selected language.",
  },
  Hindi: {
    title: "📘 STEM नोट्स डाउनलोड व पढ़ें",
    selectLanguage: "🌐 भाषा चुनें:",
    selectClass: "🏫 कक्षा चुनें:",
    selectSubject: "📚 विषय चुनें:",
    choose: "--चुनें--",
    download: "⬇ किताब डाउनलोड करें",
    preview: "📖 पूर्वावलोकन करें",
    notes: "नोट्स",
    backHome: "← होम पर वापस जाएं",
    classes: "कक्षा",
    comingSoon: "इस चयन के लिए संसाधन जल्द आ रहे हैं।",
    notAvailable: "चयनित भाषा में उपलब्ध नहीं।",
  },
};

export default function NotesPage() {
  const [language, setLanguage] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");

  const t = language ? TEXT[language] : TEXT.English;

  const getResourceUrl = () => {
    if (!subject || !language) return "";
    const sub = RESOURCES[subject];
    if (!sub) return "";
    const url = sub[language];
    return typeof url === "string" && url.trim().length > 0 ? url : "";
  };

  const resourceUrl = getResourceUrl();
  const hasSelection = Boolean(subject && language);
  const hasResource = Boolean(resourceUrl);

  return (
    <div className="notes-bg">
      <div className="notes-page">
        <div style={{ marginBottom: "1rem" }}>
          <a href="/" className="back-btn">{t.backHome}</a>
        </div>

        <h2 className="title">{t.title}</h2>

        {/* Step 1: Language */}
        <div className="step card">
          <label>{t.selectLanguage}</label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setClassLevel("");
              setSubject("");
            }}
          >
            <option value="">{t.choose}</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Step 2: Class */}
        {language && (
          <div className="step card">
            <label>{t.selectClass}</label>
            <select
              value={classLevel}
              onChange={(e) => {
                setClassLevel(e.target.value);
                setSubject("");
              }}
            >
              <option value="">{t.choose}</option>
              {[6,7,8,9,10,11,12].map((cls) => (
                <option key={cls} value={cls}>{t.classes} {cls}</option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: Subject */}
        {classLevel && (
          <div className="step card">
            <label>{t.selectSubject}</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">{t.choose}</option>
              {SUBJECTS[classLevel]?.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
        )}

        {/* Step 4: Download / Coming Soon */}
        {hasSelection && (
          <div className="download-box card">
            <h3>{subject} {t.notes} ({language})</h3>

            {hasResource ? (
              <a
                href={resourceUrl}
                className="download-btn"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                {t.download}
              </a>
            ) : (
              <div>
                <p className="muted" style={{ marginBottom: "1rem" }}>
                  {RESOURCES[subject] && (RESOURCES[subject][language] === "" || RESOURCES[subject][language] == null)
                    ? t.comingSoon
                    : t.notAvailable}
                </p>
                <button className="download-btn" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                  {t.download}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
