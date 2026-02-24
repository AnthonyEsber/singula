import ResumeCard from '../ResumeCard/ResumeCard';
import styles from './ResumeItemsGrid.module.css';

function ResumeItemsGrid() {
  const resumes = [
    {
      id: 1,
      itemName: 'Resume No. 1',
      dateCreated: '2025-02-13T12:20:03.291Z',
      owner: '123abc',
      content: {
        fullName: `<p>Anthony-Charbel Esber</p>`,
        phoneNumber: `+40 757 023 758`,
        location: 'Timisoara, Timis',
        email: 'chary.esber@yahoo.com',
        sections: [
          {
            text: `<p>I am a fresh graduate seeking opportunities to <b>create</b> but also advance my skills in the fields of Full
Stack Development. I have deep passion for creating both working and beautiful looking software.
Whether it is Web oriented or Mobile targeted, I have accumulated along the years a good foundation
for software relevant to this field. I enjoy creating applications that are high performing, highly
available, responsive and maintainable while using emerging new technologies.
Personal Skills
Analytical Problem-Solver, Engager in Teams, Fast Learner, Curious about Approaches</p>`,
            sectionId: 'profile',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },

          {
            degree: 'Computer Engineering (Computers and Information Technology - English)',
            period: '2021-2025',
            sectionId: 'education',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },
          {
            skills: [
              'Java',
              'JavaScript',
              'Swift',
              'TypeScript',
              'Dart',
              'Python',
              'C/ C++',
              'Bash',
              'HTML',
              'CSS',
            ],
            sectionId: 'skills',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },
          {
            experience: 'Programmer Trainee',
            company: 'Cognizant',
            description: 'Worked on various mockup projects',
            sectionId: 'experience',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },
        ],
      },
    },
    {
      id: 2,
      itemName: 'Resume No. 2',
      dateCreated: '2025-02-13T12:20:03.291Z',
      owner: '123abc',
      content: {
        fullName: `<p>Anthony-Charbel Esber</p>`,
        phoneNumber: `+40 757 023 758`,
        location: 'Timisoara, Timis',
        email: 'chary.esber@yahoo.com',
        sections: [
          {
            text: `<p>I am a fresh graduate seeking opportunities to create but also advance my skills in the fields of Full
Stack Development. I have deep passion for creating both working and beautiful looking software.
Whether it is Web oriented or Mobile targeted, I have accumulated along the years a good foundation
for software relevant to this field. I enjoy creating applications that are high performing, highly
available, responsive and maintainable while using emerging new technologies.
Personal Skills
Analytical Problem-Solver, Engager in Teams, Fast Learner, Curious about Approaches</p>`,
            sectionId: 'profile',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },

          {
            degree: 'Computer Engineering (Computers and Information Technology - English)',
            period: '2021-2025',
            sectionId: 'education',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },
          {
            skills: [
              'Java',
              'JavaScript',
              'Swift',
              'TypeScript',
              'Dart',
              'Python',
              'C/ C++',
              'Bash',
              'HTML',
              'CSS',
            ],
            sectionId: 'skills',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },
          {
            experience: 'Programmer Trainee',
            company: 'Cognizant',
            description: 'Worked on various mockup projects',
            sectionId: 'experience',
            updatedAt: '2025-02-13T12:20:03.291Z',
            createdAt: '2025-02-13T12:20:03.291Z',
            isHidden: false,
          },
        ],
      },
    },
  ];

  return (
    <div className={styles.grid}>
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
}

export default ResumeItemsGrid;
