import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. Your translation resources:
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: 'ar',               // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
