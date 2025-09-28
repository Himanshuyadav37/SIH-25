import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
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
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
