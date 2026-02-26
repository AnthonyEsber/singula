import { useNavigate, useParams } from 'react-router';
import CustomisePanel from '../components/CustomisePanel/CustomisePanel';
import PersonalInformationPanel from '../components/PersonalInformationPanel/PersonalInformationPanel';
import PreviewPanel from '../components/PreviewPanel/PreviewPanel';
import SectionsPanel from '../components/SectionsPanel/SectionsPanel';
import styles from '../styles/Userland.module.css';
import { DUMMY_RESUME } from '../utils/mockResume';
import { useEffect, useState } from 'react';
import {
  clearCurrentResume,
  deleteResume,
  fetchResumeById,
  renameResume,
  saveResume,
} from '../store/resumeSlice';
import { useDispatch, useSelector } from 'react-redux';

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

const DEFAULT_CUSTOMIZATION = {
  accentColor: '#1a1a1a',
  fontFamily: 'Makira, sans-serif',
  fontSize: 'medium',
};
function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentResume, status, saveStatus } = useSelector((s) => s.resumes);
  const user = useSelector((s) => s.auth.user);
  const [itemName, setItemName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fetchSettledFor, setFetchSettledFor] = useState(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [formData, setFormData] = useState({
    sections: [],
    customization: DEFAULT_CUSTOMIZATION,
    personalInfo: { fullName: '', email: '', phoneNumber: '', location: '' },
  });
  const { sections, customization, personalInfo } = formData;
  const [syncedResumeId, setSyncedResumeId] = useState(null);

  if (currentResume && currentResume.id !== syncedResumeId) {
    setSyncedResumeId(currentResume.id);
    setItemName(currentResume.item_name);
    const content = currentResume.content ?? {};
    setFormData({
      sections: content.sections ?? [],
      customization: content.customization ?? DEFAULT_CUSTOMIZATION,
      personalInfo: {
        fullName: content.fullName ?? '',
        email: content.email ?? '',
        phoneNumber: content.phoneNumber ?? '',
        location: content.location ?? '',
      },
    });
  }

  const setSections = (updater) =>
    setFormData((prev) => ({
      ...prev,
      sections: typeof updater === 'function' ? updater(prev.sections) : updater,
    }));

  const setCustomization = (updater) =>
    setFormData((prev) => ({
      ...prev,
      customization: typeof updater === 'function' ? updater(prev.customization) : updater,
    }));

  const setPersonalInfo = (updater) =>
    setFormData((prev) => ({
      ...prev,
      personalInfo: typeof updater === 'function' ? updater(prev.personalInfo) : updater,
    }));

  useEffect(() => {
    dispatch(fetchResumeById(id)).then(() => setFetchSettledFor(id));
    return () => {
      dispatch(clearCurrentResume());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!currentResume || !user) return;
    if (currentResume.owner_id !== user.id) {
      navigate('/dashboard');
    }
  }, [currentResume, user, navigate]);

  if (fetchSettledFor !== id || status === 'loading') return null;
  if (!currentResume) {
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

  function handleNameUpdate() {
    const trimmed = itemName.trim();

    if (trimmed && trimmed !== currentResume.item_name) {
      dispatch(renameResume({ id, itemName: trimmed }));
    }
    setEditingName(false);
  }

  function handleDelete() {
    if (confirmDelete) {
      const resumeId = String(id);
      dispatch(deleteResume(resumeId)).then(() => {
        dispatch(clearCurrentResume());
        navigate('/dashboard');
      });
    } else {
      setConfirmDelete(true);
      return;
    }
  }

  function handleSave() {
    dispatch(
      saveResume({
        id,
        itemName: currentResume.item_name ?? 'Untitled Resume',
        content: {
          ...personalInfo,
          sections,
          customization,
        },
      })
    );
  }
  return (
    <div className={`${styles.editorPage} ${showMobilePreview ? styles.mobilePreviewOpen : ''}`}>
      <div className={styles.composerPanel}>
        <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1 className={styles.composerTitle}>
          Editing{' '}
          {editingName ? (
            <input
              className={styles.editableTitle}
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onBlur={handleNameUpdate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.target.blur();
                if (e.key === 'Escape') setEditingName(false);
              }}
            />
          ) : (
            <span
              className={styles.displayTitle}
              onClick={() => {
                setItemName(currentResume.item_name ?? 'Untitled Resume');
                setEditingName(true);
              }}
            >
              {' '}
              {currentResume.item_name ?? 'Untitled Resume'}
            </span>
          )}
        </h1>
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
        <div className={styles.saveBar}>
          <button className={styles.deleteButton} onClick={handleDelete}>
            {confirmDelete ? 'Click again to Delete.' : 'Delete'}
          </button>
          <button className={styles.previewButton} onClick={() => setShowMobilePreview(true)}>
            Preview
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>
      <div className={styles.previewWrapper}>
        <PreviewPanel content={previewContent} onBack={() => setShowMobilePreview(false)} />
      </div>
    </div>
  );
}

export default Editor;
