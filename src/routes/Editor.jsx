import { useNavigate, useParams } from 'react-router';
import CustomisePanel from '../components/CustomisePanel/CustomisePanel';
import PersonalInformationPanel from '../components/PersonalInformationPanel/PersonalInformationPanel';
import PreviewPanel from '../components/PreviewPanel/PreviewPanel';
import SectionsPanel from '../components/SectionsPanel/SectionsPanel';
import styles from '../styles/Userland.module.css';
import { DUMMY_RESUME } from '../utils/mockResume';
import { useState } from 'react';

const ALL_SECTION_IDS = ['profile', 'experience', 'education', 'skills'];

const EMPTY_SECTION = {
  profile: { sectionId: 'profile', text: '', isHidden: false },
  experience: {
    sectionId: 'experience',
    experience: '',
    company: '',
    description: '',
    isHidden: false,
  },
  education: { sectionId: 'education', degree: '', period: '', isHidden: false },
  skills: { sectionId: 'skills', skills: [], isHidden: false },
};

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const found = DUMMY_RESUME.find((r) => r.id === Number(id));

  const [sections, setSections] = useState(found ? found.content.sections : []);
  const [customization, setCustomization] = useState({
    accentColor: '#1a1a1a',
    fontFamily: 'Makira, sans-serif',
    fontSize: 'medium',
  });
  const [personalInfo, setPersonalInfo] = useState({
    fullName: found ? found.content.fullName : '',
    email: found ? found.content.email : '',
    phoneNumber: found ? found.content.phoneNumber : '',
    location: found ? found.content.location : '',
  });

  if (!found) {
    return (
      <div className={styles.notFound}>
        <p>Resume not found.</p>
        <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
      </div>
    );
  }

  const previewContent = {
    fullName: personalInfo.fullName,
    email: personalInfo.email,
    phoneNumber: personalInfo.phoneNumber,
    location: personalInfo.location,
    sections,
    customization,
  };

  const existingSectionIds = sections.map((s) => s.sectionId);
  const missingSectionIds = ALL_SECTION_IDS.filter((sid) => !existingSectionIds.includes(sid));

  function updatePersonalInfo(field, value) {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  }

  function updateSection(index, updates) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  }

  function toggleHidden(index) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, isHidden: !s.isHidden } : s)));
  }

  function deleteSection(index) {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  function addSection(sectionId) {
    setSections((prev) => [...prev, { ...EMPTY_SECTION[sectionId] }]);
  }

  function addSkill(sectionIndex, value) {
    setSections((prev) =>
      prev.map((s, i) => (i === sectionIndex ? { ...s, skills: [...(s.skills ?? []), value] } : s))
    );
  }

  function removeSkill(sectionIndex, skillIndex) {
    setSections((prev) =>
      prev.map((s, i) =>
        i === sectionIndex ? { ...s, skills: s.skills.filter((_, si) => si !== skillIndex) } : s
      )
    );
  }

  function updateCustomization(key, value) {
    setCustomization((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <div className={styles.editorPage}>
      <div className={styles.composerPanel}>
        <PersonalInformationPanel personalInfo={personalInfo} onChange={updatePersonalInfo} />
        <SectionsPanel
          sections={sections}
          missingSectionIds={missingSectionIds}
          onUpdate={updateSection}
          onToggleHidden={toggleHidden}
          onDelete={deleteSection}
          onAddSection={addSection}
          onAddSkill={addSkill}
          onRemoveSkill={removeSkill}
        />
        <CustomisePanel customization={customization} onChange={updateCustomization} />
      </div>
      <PreviewPanel content={previewContent} />
    </div>
  );
}

export default Editor;
