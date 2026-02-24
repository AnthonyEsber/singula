import styles from './Footer.module.css';
import logo_dark from '../../assets/footer_logo_dark.svg';
function Footer() {
  return (
    <>
      <div className={styles.outerFooter}>
        <div className={styles.innerFooter}>
          <img src={logo_dark} />
          <p>Copyright 2026 Esber Anthony. All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
