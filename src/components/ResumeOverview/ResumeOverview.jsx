import FilterableResumeGrid from '../FilterableResumeGrid/FilterableResumeGrid';
import styles from './ResumeOverview.module.css';

function ResumeOverview() {
  return (
    <div className={styles.overviewSection}>
      <h1 className={styles.overviewTitle}>
        My <span>Resumes</span>
      </h1>
      <FilterableResumeGrid />
    </div>
  );
}

export default ResumeOverview;
