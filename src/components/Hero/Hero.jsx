import styles from './Hero.module.css';
import herobg from '../../assets/hero.png';
import LiquidBubble from '../LiquidBubble/LiquidBubble';
import cvimg from '../../assets/cv.png';
function Hero() {
  return (
    <div className={styles.outerHero}>
      <div className={styles.introText}>
        <h1>
          Create <span>Resumes</span> that <br /> help you <span>grow</span>.
        </h1>
      </div>
      <div className={styles.heroImage}>
        <img src={herobg} />
        <div className={`${styles.overlay} ${styles.topLeft}`}>
          <LiquidBubble text={'On demand Resume builder'} />
          <LiquidBubble text={'Fully customisable layouts '} />
          <LiquidBubble text={'Real-Time  cloud edits'} />
        </div>
        {/* <div className={`${styles.overlay} ${styles.center}`}><img src={cvimg} /></div> */}
      </div>
    </div>
  );
}

export default Hero;
