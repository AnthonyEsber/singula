import ResumePreview from '../ResumePreview/ResumePreview';
import styles from './PreviewPanel.module.css';

function PreviewPanel({ content, onBack }) {
  return (
    <div className={styles.panel}>
      <div className={styles.topBar}>
        <span className={styles.label}>[Live Preview]</span>
        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            ← Back
          </button>
        )}
      </div>
      <div className={styles.container}>
        <ResumePreview content={content} isThumbnail={false} />
      </div>
    </div>
  );
}

export default PreviewPanel;
