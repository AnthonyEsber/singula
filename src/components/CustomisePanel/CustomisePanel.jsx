import styles from './CustomisePanel.module.css';

function CustomisePanel({ customization, onChange }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.heading}>Customise</h2>

      <div className={styles.field}>
        <label className={styles.label}>Accent colour</label>
        <input
          type="color"
          className={styles.colorPicker}
          value={customization.accentColor}
          onChange={(e) => onChange('accentColor', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Font Family</label>
        <select className={styles.select} onChange={(e) => onChange('fontFamily', e.target.value)}>
          <option value="Makira, sans-serif">Makira (Default)</option>
          <option value="InconsolataBold, monospace">Inconsolata</option>
          <option disabled value={null}>
            More to come
          </option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Font Size</label>
        <div className={styles.sizeButtons}>
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${customization.fontSize === size ? styles.sizeBtnActive : ''}`}
              onClick={() => onChange('fontSize', size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomisePanel;
