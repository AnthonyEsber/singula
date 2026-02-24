import styles from './ResumePreview.module.css';

function ResumePreview({ content }) {
  if (!content) {
    return <div className={styles.placeholder}>No preview available</div>;
  }

  const { fullName, phoneNumber, location, email, sections = [] } = content;

  const profile = sections.find((s) => s.sectionId === 'profile' && !s.isHidden);
  const education = sections.find((s) => s.sectionId === 'education' && !s.isHidden);
  const skills = sections.find((s) => s.sectionId === 'skills' && !s.isHidden);
  const experience = sections.find((s) => s.sectionId === 'experience' && !s.isHidden);

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') ?? '';

  return (
    <div className={styles.previewWrapper}>
      <div className={styles.previewContent}>
        <div className={styles.header}>
          <h3 className={styles.name}>{stripHtml(fullName)}</h3>
          <div className={styles.contactRow}>
            {phoneNumber && <span>{phoneNumber}</span>}
            {location && <span>{location}</span>}
            {email && <span>{email}</span>}
          </div>
        </div>

        {profile && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Profile</h4>
            <p className={styles.profileText}>{stripHtml(profile.text)}</p>
          </div>
        )}

        {experience && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Experience</h4>
            <div className={styles.expItem}>
              <span className={styles.role}>{experience.experience}</span>
              <span className={styles.company}>{experience.company}</span>
            </div>
            {experience.description && <p className={styles.expDesc}>{experience.description}</p>}
          </div>
        )}

        {education && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Education</h4>
            <span className={styles.degree}>{education.degree}</span>
            {education.period && <span className={styles.period}>{education.period}</span>}
          </div>
        )}

        {skills && skills.skills?.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Skills</h4>
            <div className={styles.skillsList}>
              {skills.skills.slice(0, 6).map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
              {skills.skills.length > 6 && (
                <span className={styles.skillTag}>+{skills.skills.length - 6}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
