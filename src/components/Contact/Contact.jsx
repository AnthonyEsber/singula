import styles from './Contact.module.css';

function Contact() {
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
          <form>
            <h2>Leave us a message.</h2>
            <div className={styles.formDetails}>
              <input type="text" placeholder="FULL NAME"></input>
              <input type="text" placeholder="EMAIL ADDRESS"></input>
            </div>
            <div className={styles.formMessage}>
              <textarea placeholder="YOUR MESSAGE"></textarea>
            </div>
            <div className={styles.formSubmit}>
              <button>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
