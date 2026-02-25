import styles from './SectionCard.module.css';

const SECTION_LABELS = {
  profile: 'Profile',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
};

const SECTION_BODY = {
  profile: ({ section, onUpdate }) => (
    <textarea
      className={styles.textarea}
      placeholder="Write your profile summary..."
      value={section.text ?? ''}
      onChange={(e) => onUpdate({ text: e.target.value })}
    />
  ),
  experience: ({ section, onUpdate }) => (
    <>
      <input
        className={styles.input}
        placeholder="Role / Position"
        value={section.experience ?? ''}
        onChange={(e) => onUpdate({ experience: e.target.value })}
      />
      <input
        className={styles.input}
        placeholder="Company"
        value={section.company ?? ''}
        onChange={(e) => onUpdate({ company: e.target.value })}
      />
      <textarea
        className={styles.input}
        placeholder="Description"
        value={section.description ?? ''}
        onChange={(e) => onUpdate({ description: e.target.value })}
      />
    </>
  ),
  education: ({ section, onUpdate }) => (
    <>
      <input
        className={styles.input}
        placeholder="Degree / Programme"
        value={section.degree ?? ''}
        onChange={(e) => onUpdate({ degree: e.target.value })}
      />
      <input
        className={styles.input}
        placeholder="Period (Year Start - Year End)"
        onChange={(e) => onUpdate({ period: e.target.value })}
      />
    </>
  ),
  skills: ({ section, skillInput, onSkillInputChange, onAddSkill, onRemoveSkill }) => (
    <>
      <div className={styles.skillsTags}>
        {(section.skills ?? []).map((skill, skillIndex) => (
          <span key={skillIndex} className={styles.skillTag}>
            {skill}
            <button className={styles.skillRemove} onClick={() => onRemoveSkill(skillIndex)}>
              x
            </button>
          </span>
        ))}
      </div>
      <input
        className={styles.input}
        placeholder="Enter skill and press ENTER"
        value={skillInput ?? ''}
        onChange={(e) => onSkillInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAddSkill();
          }
        }}
      />
    </>
  ),
};

function SectionCard({
  section,
  onUpdate,
  onToggleHidden,
  onDelete,
  skillInput,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
}) {
  const renderBody = SECTION_BODY[section.sectionId];
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>
          {SECTION_LABELS[section.sectionId] ?? section.sectionId}
        </span>
        <div className={styles.cardActions}>
          <button className={styles.actionBtn} onClick={onToggleHidden}>
            {section.isHidden ? 'Show' : 'Hide'}
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnDelete}`} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      {!section.isHidden && renderBody && (
        <div className={styles.cardBody}>
          {renderBody({
            section,
            onUpdate,
            skillInput,
            onSkillInputChange,
            onAddSkill,
            onRemoveSkill,
          })}
        </div>
      )}
    </div>
  );
}

export default SectionCard;
