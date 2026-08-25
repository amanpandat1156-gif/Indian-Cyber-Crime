export interface NavItem {
  label: string;
  labelHi?: string;
  href: string;
  isExternal?: boolean;
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', labelHi: 'होम', href: '/' },
  { label: 'Track Complaint', labelHi: 'शिकायत ट्रैक करें', href: '/track' },
  { label: 'Check & Verify', labelHi: 'जाँच और सत्यापन', href: '/verify' },
  { label: 'Get Help', labelHi: 'सहायता प्राप्त करें', href: '/help' },
  { label: 'Volunteer', labelHi: 'स्वयंसेवक बनें', href: '/volunteer' },
];

export const footerQuickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Contact Us', href: '/help' },
  { label: 'Cyber Safety Tips', href: '/safety-guide' },
];

export const emergencyLinks = [
  { label: 'Find my cyber police station', href: '/help#police-stations' },
  { label: 'Bank-related assistance', href: '/help#bank-assistance' },
  { label: 'Complaint escalation', href: '/help#escalations' },
  { label: 'Official contacts', href: '/help#contacts' },
];
