import styles from './Introduction.module.css';
import featureImgCar from '../../assets/porsche.svg';
import featureImgCloud from '../../assets/cloud.svg';

function Introduction() {
  return (
    <div className={styles.featuresSection}>
      <div className={styles.outerIntroduction}>
        <div className={styles.innerIntroduction}>
          <span>[01] Introduction</span>
          <span>Singula / Features</span>
        </div>
      </div>
      <div className={styles.outerFeatureText}>
        <div className={styles.outerInnerText}>
          <h2>
            Singula gives you on-demand and live resume <br />
            creations. Step up your job-application game.
          </h2>
        </div>
      </div>
      <div className={styles.wrapperFeatures}>
        <div className={styles.outerFeature}>
          <div className={styles.innerFeature}>
            <h3>
              Instanly create your <br /> resume.
            </h3>
            <p>
              Making a resume never been this fast! With a simple and intuitive user experience you
              will export your CV within minutes.
            </p>
            <img src={featureImgCar} />
          </div>
        </div>
        <div className={styles.outerFeature}>
          <div className={styles.innerFeature}>
            <h3>Access it everywhere.</h3>
            <p>
              Our fast & live platform enables real-time editing and viewing from multiple devices
            </p>
            <img src={featureImgCloud} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
