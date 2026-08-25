export interface QuickLinkCategory {
  title: string;
  links: { label: string; href: string }[];
}

export const bottomQuickLinks: QuickLinkCategory[] = [
  {
    title: 'Report',
    links: [
      { label: 'Financial Fraud (1930)', href: '/report/financial' },
      { label: 'Cyber Harassment & Threats', href: '/report/harassment' },
      { label: 'Compromised Device / Account', href: '/report/hacked' },
      { label: 'Anonymous Crime Tip', href: '/report/anonymous' },
      { label: 'Report Suspicious Identifiers', href: '/verify' },
    ],
  },
  {
    title: 'Track',
    links: [
      { label: 'Track Existing Complaint', href: '/track' },
      { label: 'Add Additional Evidence', href: '/track#evidence' },
      { label: 'Understand Complaint Timeline', href: '/track#timeline' },
      { label: 'Escalate Unresolved Grievance', href: '/help#escalations' },
    ],
  },
  {
    title: 'Get Help',
    links: [
      { label: 'National Helpline: Call 1930', href: 'tel:1930' },
      { label: 'Find Nearest Cyber Police Station', href: '/help#police-stations' },
      { label: 'Nodal Bank Officer Directory', href: '/help#bank-assistance' },
      { label: 'Citizen Support Center', href: '/help' },
    ],
  },
  {
    title: 'Stay Informed',
    links: [
      { label: 'Cyber Hygiene Best Practices', href: '/safety-guide#hygiene' },
      { label: 'Recognizing UPI & QR Scams', href: '/safety-guide#financial-safety' },
      { label: 'Securing Social Media Accounts', href: '/safety-guide#account-security' },
      { label: 'Official Advisories & Alerts', href: '/safety-guide#advisories' },
    ],
  },
];
