import { useNavigate } from 'react-router';
import ResumePreview from '../ResumePreview/ResumePreview';
import styles from './ResumeCard.module.css';
import Globe from '../../assets/ReactSVGIcons/Globe';

function ResumeCard({ resume }) {
  const navigate = useNavigate();
  const formattedDate = new Date(resume.created_at).toLocaleDateString('en-GB', {
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
        <div className={styles.nameRow}>
          <p className={styles.itemName}>{resume.item_name}</p>
          {resume.is_public && (
            <span className={styles.globeIcon} title="Public">
              <Globe />
            </span>
          )}
        </div>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </div>
  );
}

export default ResumeCard;
