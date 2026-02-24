import styles from './Forms.module.css';

function LoginForm() {
  return (
    <div className={styles.formContainer}>
      <h1>Login into your account.</h1>
      <form>
        <input type="text" placeholder="john.doe@email.com" />
        <input type="password" placeholder="********" />
        <div className={styles.forgotPassword}>Forgot password? Click here.</div>
        <div className={styles.fromButton}>
          <button>Login</button>
        </div>
        <div className={styles.switchFormModeAsk}>Not a user? Click here to register.</div>
      </form>
    </div>
  );
}

export default LoginForm;
