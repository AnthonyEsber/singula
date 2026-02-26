import styles from './Footer.module.css';
import logo_dark from '../../assets/footer_logo_dark.svg';
import logo_light from '../../assets/footer_logo_light.svg';
import { useSelector } from 'react-redux';
function Footer() {
  const theme = useSelector((s) => s.ui.theme);

  const isLightMode =
    theme === 'light' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

  return (
    <footer>
      <div className={styles.outerFooter}>
        <div className={styles.innerFooter}>
          {isLightMode ? <img src={logo_light} /> : <img src={logo_dark} />}

          <p>Copyright 2026 Esber Anthony. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
