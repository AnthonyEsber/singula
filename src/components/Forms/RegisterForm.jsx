import styles from './Forms.module.css';

function RegisterForm() {
  return (
    <div className={styles.formContainer}>
      <h1>Create your account.</h1>
      <form>
        <input type="text" placeholder="John Doe" />
        <input type="text" placeholder="john.doe@mail.com" />
        <input type="password" placeholder="********" />
        <input type="password" placeholder="******** (Repeat)" />
        <div className={styles.termsAndConditions}>
          <input type="checkbox" id="terms" className={styles.chk} />
          <label htmlFor="terms">I agree with the terms & conditions.</label>
        </div>
        <div className={styles.fromButton}>
          <button>Get Started</button>
        </div>
        <div className={styles.switchFormModeAsk}>Already a user? Click here to login.</div>
      </form>
    </div>
  );
}

export default RegisterForm;
