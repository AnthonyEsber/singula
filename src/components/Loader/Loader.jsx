import { useEffect, useState } from 'react';
import styles from './Loader.module.css';
const FRAMES = Array.from({ length: 7 }, (_, i) => `/loader/step${i + 1}.png`);
const FRAME_INTERVAL = 30;

function Loader() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.overlay}>
      <img src={FRAMES[frame]} alt="" className={styles.logo} />
    </div>
  );
}

export default Loader;
