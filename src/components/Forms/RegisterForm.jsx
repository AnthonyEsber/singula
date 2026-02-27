import { useDispatch, useSelector } from 'react-redux';
import styles from './Forms.module.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { registerUser } from '../../store/authSlice';

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [localError, setLocalError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match!');
      return;
    }
    if (!termsAccepted) {
      setLocalError('You must accept the terms & conditions!');
      return;
    }

    const result = await dispatch(registerUser({ email, password, fullName }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  }

  const displayError = localError || error;

  return (
    <div className={styles.formContainer}>
      <h1>Create your account.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="john.doe@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="******** (Repeat)"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {displayError && <div className={styles.errorMessage}>{displayError}</div>}
        <div className={styles.termsAndConditions}>
          <input
            type="checkbox"
            id="terms"
            className={styles.chk}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms">I agree with the terms & conditions.</label>
        </div>
        <div className={styles.fromButton}>
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Creating account...' : 'Get started'}
          </button>
        </div>
        <div onClick={() => navigate('/login')} className={styles.switchFormModeAsk}>
          Already a user? Click here to login.
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
