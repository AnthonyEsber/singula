import LoginForm from '../components/Forms/LoginForm';
import styles from '../styles/Userland.module.css';

function Login() {
  return (
    <div className={styles.userlandScreen}>
      <LoginForm />
    </div>
  );
}

export default Login;
