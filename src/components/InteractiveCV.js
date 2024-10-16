const CV = {
  summary:
    'Experienced full-stack developer with a passion for cybersecurity and innovative technologies.',
  education: [
    {
      degree: 'BSc in Computer Science',
      institution: 'Tech University',
      year: '2018-2022',
    },
  ],
  experience: [
    {
      title: 'Senior Developer',
      company: 'Innovative Tech Solutions',
      period: '2022-Present',
      responsibilities: [
        'Lead development of cutting-edge web applications',
        'Implemented robust security measures across all projects',
        'Mentored junior developers in best practices and new technologies',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Nexus',
      period: '2020-2022',
      responsibilities: [
        'Developed and maintained multiple client websites',
        'Collaborated in an Agile team environment',
        'Contributed to open-source projects',
      ],
    },
  ],
  skills: [
    'JavaScript (React, Node.js)',
    'Python',
    'SQL',
    'NoSQL',
    'RESTful APIs',
    'GraphQL',
    'Docker',
    'AWS',
    'Cybersecurity fundamentals',
    'Agile methodologies',
  ],
  projects: [
    {
      name: 'SecureChat',
      description: 'End-to-end encrypted messaging application',
    },
    {
      name: 'BlockchainVote',
      description: 'Decentralized voting system using blockchain technology',
    },
  ],
};

class InteractiveCV {
  static getSummary() {
    return CV.summary;
  }

  static getEducation() {
    return CV.education.map((edu) => `${edu.degree} - ${edu.institution} (${edu.year})`).join('\n');
  }

  static getExperience() {
    return CV.experience
      .map(
        (exp) =>
          `${exp.title} at ${exp.company} (${exp.period})\n` +
          exp.responsibilities.map((r) => `  - ${r}`).join('\n')
      )
      .join('\n\n');
  }

  static getSkills() {
    return CV.skills.join(', ');
  }

  static getProjects() {
    return CV.projects.map((proj) => `${proj.name}: ${proj.description}`).join('\n');
  }

  static getAll() {
    return (
      `Summary:\n${this.getSummary()}\n\n` +
      `Education:\n${this.getEducation()}\n\n` +
      `Experience:\n${this.getExperience()}\n\n` +
      `Skills:\n${this.getSkills()}\n\n` +
      `Projects:\n${this.getProjects()}`
    );
  }
}

export default InteractiveCV;
