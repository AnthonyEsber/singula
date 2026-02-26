import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createResume, fetchResumes } from '../../store/resumeSlice';
import ResumeCard from '../ResumeCard/ResumeCard';
import styles from './ResumeItemsGrid.module.css';

function ResumeItemsGrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumes = useSelector((s) => s.resumes.list);
  const resumeStatus = useSelector((s) => s.resumes.status);
  const profile = useSelector((s) => s.auth.profile);
  const { searchText, sortBy, sortDir, showPublicOnly } = useSelector((s) => s.ui.resumeFilters);

  const isFree = profile?.tier !== 'pro';
  const atLimit = isFree && resumes.length >= 1;

  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const filtersKey = `${searchText}|${sortBy}|${sortDir}|${showPublicOnly}`;
  const [lastFiltersKey, setLastFiltersKey] = useState(filtersKey);

  if (filtersKey !== lastFiltersKey) {
    setLastFiltersKey(filtersKey);
    setCurrentPage(1);
  }

  const filtered = resumes
    .filter((r) => r.item_name.toLowerCase().includes(searchText.toLowerCase()))
    .filter((r) => !showPublicOnly || r.is_public)
    .sort((a, b) => {
      const cmp =
        sortBy === 'name'
          ? a.item_name.localeCompare(b.item_name)
          : new Date(a.updated_at) - new Date(b.updated_at);
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  async function handleCreate() {
    if (atLimit) return;
    const result = await dispatch(createResume());
    if (result.meta.requestStatus === 'fulfilled') {
      navigate(`/dashboard/edit/${result.payload.id}`);
    }
  }

  const isEmpty = resumeStatus === 'idle' && resumes.length === 0;

  return (
    <div className={styles.grid}>
      {isEmpty && <p className={styles.emptyState}>No resumes yet — create your first one.</p>}

      {paginated.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}

      <div
        className={`${styles.newCard} ${atLimit ? styles.newCardDisabled : ''}`}
        onClick={handleCreate}
        title={atLimit ? 'Upgrade to Pro to create more resumes' : 'Create new resume'}
      >
        <div className={styles.newThumbnail}>
          <span className={styles.newIcon}>+</span>
        </div>
        <div className={styles.newCardInfo}>
          <p className={styles.newCardLabel}>{atLimit ? 'Upgrade to Pro' : 'New Resume'}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumeItemsGrid;
