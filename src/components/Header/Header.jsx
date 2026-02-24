import { NavLink } from 'react-router';
import logo from '../../assets/dark.svg';
import styles from './Header.module.css';
/* TODO: Finish menu */
function Header() {
  return (
    <>
      <nav>
        <div className={styles.headerOuter}>
          <div className={styles.divImg}>
            <img src={logo} className={styles.logo} alt="Singula Logo" />
          </div>
          <div className={styles.localMenu}>
            <p>Home</p>
            <p>About</p>
            <p>Pricing</p>
          </div>
          <div className={styles.externalMenu}>
            <NavLink className={styles.navLinkSecondary}>Login</NavLink>
            <NavLink className={styles.navLinkPrimary}>Register</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
