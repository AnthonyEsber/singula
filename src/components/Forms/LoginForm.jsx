import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../../store/authSlice';
import styles from './Forms.module.css';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);
  const lastPage = useSelector((s) => s.ui.lastViewedPage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate(lastPage);
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>Login into your account.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="john.doe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="**"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.fromButton}>
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <div onClick={() => navigate('/register')} className={styles.switchFormModeAsk}>
          Not a user? Click here to register.
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
