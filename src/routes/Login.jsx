import LoginForm from '../components/Forms/LoginForm';
import styles from './Userland.module.css';

function Login() {
  return (
    <div className={styles.userlandScreen}>
      <LoginForm />
    </div>
  );
}

export default Login;
