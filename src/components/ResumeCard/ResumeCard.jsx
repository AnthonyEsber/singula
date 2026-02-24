import ResumePreview from '../ResumePreview/ResumePreview';
import styles from './ResumeCard.module.css';

function ResumeCard({ resume }) {
  const formattedDate = new Date(resume.dateCreated).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailArea}>
        <ResumePreview content={resume.content} />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.itemName}>{resume.itemName}</p>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </div>
  );
}

export default ResumeCard;
