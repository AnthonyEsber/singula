import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 14,
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 8,
    color: '#555555',
  },
  contactItem: {
    fontSize: 8,
    color: '#555555',
  },
  headerDivider: {
    borderBottomWidth: 1.5,
    marginTop: 6,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    marginBottom: 6,
  },
  profileText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#333333',
  },
  expItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  role: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  company: {
    fontSize: 9,
    fontFamily: 'Helvetica-Oblique',
    color: '#555555',
  },
  expDesc: {
    fontSize: 8.5,
    color: '#444444',
    lineHeight: 1.4,
    marginTop: 2,
  },
  degree: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  period: {
    fontSize: 8.5,
    color: '#777777',
    marginTop: 1,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#eef2f7',
    color: '#333333',
  },
});

function ResumePDF({ content }) {
  if (!content) return null;

  const { fullName, phoneNumber, location, email, sections = [], customization = {} } = content;
  const accent = customization.accentColor ?? '#1a1a1a';

  const profile = sections.find((s) => s.sectionId === 'profile' && !s.isHidden);
  const experience = sections.find((s) => s.sectionId === 'experience' && !s.isHidden);
  const education = sections.find((s) => s.sectionId === 'education' && !s.isHidden);
  const skills = sections.find((s) => s.sectionId === 'skills' && !s.isHidden);

  const contactItems = [phoneNumber, location, email].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {fullName ? <Text style={styles.name}>{fullName}</Text> : null}
          {contactItems.length > 0 && (
            <View style={styles.contactRow}>
              {contactItems.map((item) => (
                <Text key={item} style={styles.contactItem}>
                  {item}
                </Text>
              ))}
            </View>
          )}
          <View style={[styles.headerDivider, { borderBottomColor: accent }]} />
        </View>

        {profile && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent, borderBottomColor: accent }]}>
              Profile
            </Text>
            <Text style={styles.profileText}>{profile.text}</Text>
          </View>
        )}
        {experience && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent, borderBottomColor: accent }]}>
              Experience
            </Text>
            <View style={styles.expItem}>
              {experience.experience ? (
                <Text style={styles.role}>{experience.experience}</Text>
              ) : null}
              {experience.company ? <Text style={styles.company}>{experience.company}</Text> : null}
            </View>
            {experience.description ? (
              <Text style={styles.expDesc}>{experience.description}</Text>
            ) : null}
          </View>
        )}

        {education && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent, borderBottomColor: accent }]}>
              Education
            </Text>
            {education.degree ? <Text style={styles.degree}>{education.degree}</Text> : null}
            {education.period ? <Text style={styles.period}>{education.period}</Text> : null}
          </View>
        )}

        {skills && skills.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent, borderBottomColor: accent }]}>
              Skills
            </Text>
            <View style={styles.skillsList}>
              {skills.skills.map((skill) => (
                <Text key={skill} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}

export default ResumePDF;
