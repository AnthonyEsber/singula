import { useDispatch, useSelector } from 'react-redux';
import { clearContactDraft, setContactDraft } from '../../store/uiSlice';
import styles from './Contact.module.css';

function Contact() {
  const dispatch = useDispatch();
  const draft = useSelector((s) => s.ui.contactDraft);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(clearContactDraft());
  }

  return (
    <div className={styles.contactSection}>
      <div className={styles.outerContact}>
        <div className={styles.innerContact}>
          <span>[03] Contact</span>
          <span>Singula / Inquiry</span>
        </div>
      </div>
      <div className={styles.outerForm}>
        <div className={styles.innerForm}>
          <form onSubmit={handleSubmit}>
            <h2>Leave us a message.</h2>
            <div className={styles.formDetails}>
              <input
                type="text"
                placeholder="FULL NAME"
                value={draft.fullName}
                onChange={(e) => dispatch(setContactDraft({ fullName: e.target.value }))}
              />
              <input
                type="text"
                placeholder="EMAIL ADDRESS"
                value={draft.email}
                onChange={(e) => dispatch(setContactDraft({ email: e.target.value }))}
              />
            </div>
            <div className={styles.formMessage}>
              <textarea
                placeholder="YOUR MESSAGE"
                value={draft.message}
                onChange={(e) => dispatch(setContactDraft({ message: e.target.value }))}
              />
            </div>
            <div className={styles.formSubmit}>
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
