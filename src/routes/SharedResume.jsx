import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { supabase } from '../lib/supabase';
import styles from '../styles/ResumeShared.module.css';
import ResumePreview from '../components/ResumePreview/ResumePreview';

function SharedResume() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('is_public', true)
        .single();
      if (error || !data) {
        setNotFound(true);
      } else {
        setResume(data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.center}>
        <p>Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className={styles.center}>
        <p className={styles.message}>This resume is not publicly shared.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ResumePreview content={resume.content} />
      </main>
      <footer className={styles.footer}>
        <span>
          Made with Singula. <Link to={'/'}>Try it now.</Link>
        </span>
      </footer>
    </div>
  );
}

export default SharedResume;
