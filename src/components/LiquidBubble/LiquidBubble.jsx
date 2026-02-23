import styles from './LiquidBubble.module.css';

function LiquidBubble({ text }) {
  return (
    <div className={styles.glassBubble}>
      <p> {text} </p>
    </div>
  );
}

export default LiquidBubble;
