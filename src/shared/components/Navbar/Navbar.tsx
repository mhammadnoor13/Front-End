import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        {/* Brand */}
        <Link to="/" className={styles.brand}>
          AI Consult
        </Link>

        {/* Desktop Links */}
        <nav className={styles.navLinks} aria-label={t('nav.mainNav')}>
          <NavLink to="/"       className={linkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/login"  className={linkClass}>{t('nav.login')}</NavLink>
          <NavLink to="/register" className={linkClass}>{t('nav.register')}</NavLink>
        </nav>

        {/* Language Switcher (always visible) */}
        <LanguageSwitcher />

        {/* Mobile Menu Toggle */}
        <button
          className={styles.toggleBtn}
          onClick={() => setMenuOpen(open => !open)}
          aria-label={t('nav.toggleMenu')}
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburger} />
        </button>

        {/* Mobile Links */}
        <nav
          className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
          aria-label={t('nav.mobileNav')}
        >
          <NavLink to="/"       className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.home')}</NavLink>
          <NavLink to="/login"  className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.login')}</NavLink>
          <NavLink to="/register" className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.register')}</NavLink>
        </nav>
      </div>
    </header>
  );
}
