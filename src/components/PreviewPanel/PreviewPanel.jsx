import ResumePreview from '../ResumePreview/ResumePreview';
import styles from './PreviewPanel.module.css';

function PreviewPanel({ content }) {
  return (
    <div className={styles.panel}>
      <div className={styles.topBar}>
        <span className={styles.label}>[Live Preview]</span>
      </div>
      <div className={styles.container}>
        <ResumePreview content={content} />
      </div>
    </div>
  );
}

export default PreviewPanel;
