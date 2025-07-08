import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { AppRoutes } from '../../routes/routes';

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const  {tokens, logout}  = useAuth();
  const navigate = useNavigate();


  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const handleLogout = () =>{
    logout();
    navigate(AppRoutes.HOME);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        {/* Brand */}
        <Link to={AppRoutes.HOME} className={styles.brand}>
          AI Consult
        </Link>

        {/* Desktop Links */}
        <nav className={styles.navLinks} aria-label={t('nav.mainNav')}>
          <NavLink to={AppRoutes.HOME} className={linkClass}>
            {t('nav.home')}
          </NavLink>

          {tokens ? (
            <>
              <NavLink to={AppRoutes.REVIEW_CASES} className={linkClass}>
                {t('nav.reviewCases')}
              </NavLink>
              <button onClick={handleLogout} className={styles.linkButton}>
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <NavLink to={AppRoutes.LOGIN} className={linkClass}>
                {t('nav.login')}
              </NavLink>
              <NavLink to={AppRoutes.REGISTER} className={linkClass}>
                {t('nav.register')}
              </NavLink>
            </>
          )}
        </nav>

        {/* Language Switcher */}
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
          <NavLink
            to={AppRoutes.HOME}
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.home')}
          </NavLink>

          {tokens ? (
            <>
              <NavLink
                to={AppRoutes.REVIEW_CASES}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.reviewCases')}
              </NavLink>
              <button
                onClick={handleLogout}
                className={styles.linkButton}
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={AppRoutes.LOGIN}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.login')}
              </NavLink>
              <NavLink
                to={AppRoutes.REGISTER}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.register')}
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
