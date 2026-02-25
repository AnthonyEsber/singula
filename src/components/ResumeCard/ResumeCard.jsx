import { useNavigate } from 'react-router';
import ResumePreview from '../ResumePreview/ResumePreview';
import styles from './ResumeCard.module.css';

function ResumeCard({ resume }) {
  const navigate = useNavigate();
  const formattedDate = new Date(resume.dateCreated).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={styles.card} onClick={() => navigate(`/dashboard/edit/${resume.id}`)}>
      <div className={styles.thumbnailArea}>
        <ResumePreview content={resume.content} isThumbnail={true} />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.itemName}>{resume.itemName}</p>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </div>
  );
}

export default ResumeCard;
