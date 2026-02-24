import RegisterForm from '../components/Forms/RegisterForm';
import styles from './Userland.module.css';

function Register() {
  return (
    <div className={styles.userlandScreen}>
      <RegisterForm />
    </div>
  );
}

export default Register;
