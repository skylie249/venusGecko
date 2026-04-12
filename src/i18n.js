import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationKO from './locales/ko/translation.json';
import translationEN from './locales/en/translation.json';
import translationJA from './locales/ja/translation.json';
import translationZH from './locales/zh/translation.json';

const resources = {
  ko: {
    translation: translationKO
  },
  en: {
    translation: translationEN
  },
  ja: {
    translation: translationJA
  },
  zh: {
    translation: translationZH
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    supportedLngs: ['ko', 'en', 'ja', 'zh'], // Explicitly define supported languages
    load: 'languageOnly', // e.g. en-US -> en
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
