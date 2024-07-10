import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { Language } from './components/Header/LangToggle';

const initialLanguage = window.localStorage.getItem('app-lang');

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({ debug: true, fallbackLng: initialLanguage || Language.UK });

export default i18n;
