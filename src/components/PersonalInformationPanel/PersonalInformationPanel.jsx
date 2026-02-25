import styles from './PersonalInformationPanel.module.css';

function PersonalInformationPanel({ personalInfo, onChange }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.heading}>Personal Information</h2>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="Full Name"
          value={personalInfo.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={personalInfo.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Phone Number"
          value={personalInfo.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Location"
          value={personalInfo.location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </div>
    </section>
  );
}

export default PersonalInformationPanel;
