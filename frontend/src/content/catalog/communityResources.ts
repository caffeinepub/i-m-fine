import { CommunityInfoSection } from './types';

export const communityGuidance: CommunityInfoSection[] = [
  {
    title: 'Finding Safe Support Groups',
    description: 'How to locate and evaluate support groups that are right for you.',
    content: [
      'Look for groups led by trained facilitators or licensed professionals',
      'Check if the group has clear guidelines and boundaries',
      'Start with established organizations like NAMI, SMART Recovery, or local mental health centers',
      'Consider online options if in-person groups aren\'t accessible',
      'Try a few different groups to find the right fit',
      'Trust your instincts - if something feels off, it\'s okay to leave',
    ],
    externalLinks: [
      { label: 'NAMI Support Groups', url: 'https://www.nami.org/Support-Education/Support-Groups' },
      { label: 'Psychology Today Group Finder', url: 'https://www.psychologytoday.com/us/groups' },
    ],
  },
  {
    title: 'Vetting Online Communities Safely',
    description: 'Guidelines for protecting yourself in online mental health spaces.',
    content: [
      'Never share identifying personal information (full name, address, workplace)',
      'Be cautious of anyone offering "cures" or asking for money',
      'Look for moderated communities with clear rules',
      'Report harmful content or concerning behavior to moderators',
      'Remember that peer support is not a replacement for professional help',
      'Take breaks if online spaces become overwhelming',
      'Use privacy settings and consider using a separate username',
    ],
  },
  {
    title: 'What to Expect from Peer Support',
    description: 'Understanding the benefits and limitations of peer support.',
    content: [
      'Peer support offers shared experiences and mutual understanding',
      'It\'s not therapy - peers aren\'t trained mental health professionals',
      'You may find validation, hope, and practical coping strategies',
      'Boundaries are important - you don\'t have to share everything',
      'It\'s okay to take what helps and leave what doesn\'t',
      'Some days you\'ll give support, other days you\'ll receive it',
      'Progress isn\'t linear - everyone\'s healing journey is different',
    ],
  },
  {
    title: 'Crisis Resources - When You Need Immediate Help',
    description: 'Professional crisis support is available 24/7.',
    content: [
      '988 Suicide & Crisis Lifeline: Call or text 988 (available 24/7)',
      'Crisis Text Line: Text HOME to 741741',
      'SAMHSA National Helpline: 1-800-662-4357 (free, confidential, 24/7)',
      'National Domestic Violence Hotline: 1-800-799-7233',
      'RAINN Sexual Assault Hotline: 1-800-656-4673',
      'Veterans Crisis Line: Call 988 and press 1',
      'If you\'re in immediate danger, call 911 or go to your nearest emergency room',
    ],
    externalLinks: [
      { label: '988 Lifeline', url: 'https://988lifeline.org/' },
      { label: 'Crisis Text Line', url: 'https://www.crisistextline.org/' },
    ],
  },
  {
    title: 'Building Healthy Online Connections',
    description: 'Tips for forming meaningful, supportive relationships online.',
    content: [
      'Start slowly - you don\'t have to share your whole story immediately',
      'Look for people who respect boundaries and practice reciprocity',
      'Healthy connections feel supportive, not draining or demanding',
      'It\'s okay to step back from connections that don\'t feel right',
      'Consider moving supportive connections to more private channels over time',
      'Remember that online friends can be real friends',
      'Balance online connection with in-person relationships when possible',
    ],
  },
  {
    title: 'Red Flags in Support Communities',
    description: 'Warning signs that a community may not be safe or helpful.',
    content: [
      'Discouraging professional treatment or medication',
      'Promoting harmful behaviors or "pro" communities (pro-ana, etc.)',
      'Lack of moderation or tolerance of abusive behavior',
      'Pressure to share personal information or meet in person',
      'Cult-like dynamics or a single charismatic leader',
      'Shaming or judging members for their choices',
      'Romanticizing mental illness or trauma',
      'Anyone offering to "cure" you or selling products/services',
    ],
  },
];
