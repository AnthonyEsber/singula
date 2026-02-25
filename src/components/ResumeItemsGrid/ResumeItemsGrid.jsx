import { DUMMY_RESUME } from '../../utils/mockResume';
import ResumeCard from '../ResumeCard/ResumeCard';
import styles from './ResumeItemsGrid.module.css';

function ResumeItemsGrid() {
  const resumes = DUMMY_RESUME;

  return (
    <div className={styles.grid}>
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
}

export default ResumeItemsGrid;
