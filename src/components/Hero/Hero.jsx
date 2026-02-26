import styles from './Hero.module.css';
import herobg from '../../assets/cv_hero.svg';
import LiquidBubble from '../LiquidBubble/LiquidBubble';
function Hero() {
  return (
    <div id="hero" className={styles.outerHero}>
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
      </div>
    </div>
  );
}

export default Hero;
