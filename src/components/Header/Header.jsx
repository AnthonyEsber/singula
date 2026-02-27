import { NavLink, useMatch, useNavigate } from 'react-router';
import logo from '../../assets/dark.svg';
import logoLight from '../../assets/light.svg';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setTheme } from '../../store/uiSlice';
import { logoutUser } from '../../store/authSlice';
import ShareMenu from '../ShareMenu/ShareMenu';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile } = useSelector((s) => s.auth);
  const theme = useSelector((s) => s.ui.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const editorMatch = useMatch('/dashboard/edit/:id');
  const currentResume = useSelector((s) => s.resumes.currentResume);

  function handleThemeToggle() {
    const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    dispatch(setTheme(next));
    if (next === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', next);
    }
  }

  const themeIcon = theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System';

  const isLightMode =
    theme === 'light' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

  function scrollToSection(id) {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }

  async function handleLogout() {
    setDropdownOpen(false);
    await dispatch(logoutUser());
    navigate('/');
  }
  return (
    <>
      <nav>
        <div className={styles.headerOuter}>
          <div className={styles.divImg}>
            {!isLightMode ? (
              <img
                src={logo}
                className={styles.logo}
                alt="Singula Logo"
                onClick={() => navigate('/')}
              />
            ) : (
              <img
                src={logoLight}
                className={styles.logo}
                alt="Singula Logo"
                onClick={() => navigate('/')}
              />
            )}
          </div>
          <div className={styles.localMenu}>
            <button className={styles.navItem} onClick={() => scrollToSection('hero')}>
              Home
            </button>
            <button className={styles.navItem} onClick={() => scrollToSection('about')}>
              About
            </button>
            <button className={styles.navItem} onClick={() => scrollToSection('pricing')}>
              Pricing
            </button>
          </div>
          <div className={styles.externalMenu}>
            {editorMatch && (
              <ShareMenu
                resumeId={editorMatch.params.id}
                isPublic={currentResume?.is_public ?? false}
              />
            )}

            <button className={styles.themeToggle} onClick={handleThemeToggle} title="Toggle theme">
              {themeIcon}
            </button>

            {user ? (
              <div className={styles.userMenu}>
                <button className={styles.userButton} onClick={() => setDropdownOpen((o) => !o)}>
                  <span className={styles.userName}>{profile?.full_name ?? user.email}</span>
                  <span
                    className={`${styles.tierBadge} ${profile?.tier === 'pro' ? styles.tierPro : styles.tierFree}`}
                  >
                    {profile?.tier ?? 'free'}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    <button className={styles.dropdownItem} onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </button>
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to={'/login'} className={styles.navLinkSecondary}>
                  Login
                </NavLink>
                <NavLink to={'/register'} className={styles.navLinkPrimary}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
