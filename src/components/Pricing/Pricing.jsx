import { Link } from 'react-router';
import styles from './Pricing.module.css';

function Pricing() {
  return (
    <div id="pricing" className={styles.pricingSection}>
      <div className={styles.outerPricing}>
        <div className={styles.innerPricing}>
          <span>[02] Plans</span>
          <span>Singula / Pricing</span>
        </div>
      </div>
      <div className={styles.wrapperPlans}>
        <div className={styles.outerPlan}>
          <div className={styles.innerPlan}>
            <p>Free</p>
            <h2>
              0 RON<span>/month</span>
            </h2>
            <ul>
              <li>Full resume creation</li>
              <li>Customise your resume look</li>
              <li>Unlimited PDF exports</li>
            </ul>
            <div className={styles.buyPlan}>
              <Link to={'/register'}>
                <button>Get Started</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.outerPlan}>
          <div className={styles.innerPlan}>
            <p>Pro</p>
            <h2>
              4.99 RON<span>/month</span>
            </h2>
            <ul>
              <li>Full resume creation</li>
              <li>Customise your resume look</li>
              <li>Unlimited PDF exports</li>
              <li>Multiple Resumes</li>
            </ul>
            <div className={styles.buyPlan}>
              <button disabled>Start trial</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
