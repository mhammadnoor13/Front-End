import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const switchTo = (lang: 'en' | 'ar') => {
    if (current !== lang) i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => switchTo('en')}
        className={current === 'en' ? styles.active : ''}
      >
        EN
      </button>
      <button
        onClick={() => switchTo('ar')}
        className={current === 'ar' ? styles.active : ''}
      >
        AR
      </button>
    </div>
  );
}
