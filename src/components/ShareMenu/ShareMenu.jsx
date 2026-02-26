import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShareResume } from '../../store/resumeSlice';

import styles from './ShareMenu.module.css';
import Globe from '../../assets/ReactSVGIcons/Globe';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../ResumePDF/ResumePDF';

function ShareMenu({ resumeId, isPublic }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const [copyFeedback, setCopyFeedback] = useState('');
  const containerRef = useRef(null);
  const currentResume = useSelector((s) => s.resumes.currentResume);

  useEffect(() => {
    function handleMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  function copyLink() {
    const url = `${window.location.origin}/share/${resumeId}`;
    navigator.clipboard.writeText(url);
    setCopyFeedback('Copied!');
    setTimeout(() => setCopyFeedback(''), 2000);
  }

  async function handleGetLink() {
    if (!isPublic) {
      await dispatch(toggleShareResume({ id: resumeId, isPublic: true }));
    }
    copyLink();
  }

  async function handleDisable() {
    dispatch(toggleShareResume({ id: resumeId, isPublic: false }));
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button className={styles.shareButton} onClick={() => setOpen((o) => !o)} title="Share">
        Share
      </button>
      {open && (
        <div className={styles.dropdown}>
          <PDFDownloadLink
            document={<ResumePDF content={currentResume.content} />}
            fileName={`${currentResume.item_name?.replace(/\s+/g, '_') || 'resume'}.pdf`}
          >
            {({ loading }) => (
              <button className={styles.dropdownItem} disabled={loading}>
                {loading ? 'Preparing...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
          <button className={styles.dropdownItem} onClick={handleGetLink}>
            {copyFeedback || 'Get shareable link'}
          </button>
          {isPublic && (
            <p className={styles.statusLine}>
              Link active - {'  '}
              <button className={styles.disableButton} onClick={handleDisable}>
                Disable
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShareMenu;
