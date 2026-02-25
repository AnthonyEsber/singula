import { useState } from 'react';
import SectionCard from '../SectionCard/SectionCard';
import styles from './SectionsPanel.module.css';

const SECTION_LABELS = {
  profile: 'Profile',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
};

function SectionsPanel({
  sections,
  missingSectionIds,
  onUpdate,
  onToggleHidden,
  onDelete,
  onAddSection,
  onAddSkill,
  onRemoveSkill,
}) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [skillInputs, setSkillInputs] = useState({});

  function handleSkillInputChange(sectionId, value) {
    setSkillInputs((prev) => ({ ...prev, [sectionId]: value }));
  }

  function handleAddSkill(sectionIndex, sectionId) {
    const val = (skillInputs[sectionId] ?? '').trim();
    if (!val) return;
    onAddSkill(sectionIndex, val);
    setSkillInputs((prev) => ({ ...prev, [sectionId]: '' }));
  }

  function handleAddSection(sectionId) {
    onAddSection(sectionId);
    setShowAddMenu(false);
  }

  return (
    <section className={styles.panel}>
      <h2 className={styles.heading}>Sections</h2>

      {sections.map((section, index) => (
        <SectionCard
          key={`${section.sectionId}-${index}`}
          section={section}
          onUpdate={(updates) => onUpdate(index, updates)}
          onToggleHidden={() => onToggleHidden(index)}
          onDelete={() => onDelete(index)}
          skillInput={skillInputs[section.sectionId]}
          onSkillInputChange={(value) => handleSkillInputChange(section.sectionId, value)}
          onAddSkill={() => handleAddSkill(index, section.sectionId)}
          onRemoveSkill={(si) => onRemoveSkill(index, si)}
        />
      ))}

      {missingSectionIds.length > 0 && (
        <div className={styles.addWrapper}>
          <button className={styles.addBtn} onClick={() => setShowAddMenu((prev) => !prev)}>
            + Add Section
          </button>
          {showAddMenu && (
            <div className={styles.addMenu}>
              {missingSectionIds.map((sectionId) => (
                <button
                  key={sectionId}
                  className={styles.addMenuItem}
                  onClick={() => handleAddSection(sectionId)}
                >
                  {SECTION_LABELS[sectionId]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SectionsPanel;
