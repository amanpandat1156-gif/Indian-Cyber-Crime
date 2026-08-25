export interface IntentCardItem {
  id: string;
  title: string;
  description: string;
  iconType: 'rupee' | 'shield' | 'lock' | 'user' | 'search' | 'lifebuoy';
  iconBg: string;
  iconColor: string;
  href: string;
}

export const primaryIntentCards: IntentCardItem[] = [
  {
    id: 'lost-money',
    title: 'I Lost Money',
    description: 'Report financial fraud and get guidance on what to do next.',
    iconType: 'rupee',
    iconBg: 'bg-[#D6EFE4]',
    iconColor: 'text-[#1B7754]',
    href: '/report/financial',
  },
  {
    id: 'harassment-threats',
    title: 'Someone Is Harassing / Threatening Me',
    description: 'Get help with blackmail, extortion, impersonation and more.',
    iconType: 'shield',
    iconBg: 'bg-[#DCECF8]',
    iconColor: 'text-[#1D60A1]',
    href: '/report/harassment',
  },
  {
    id: 'hacked-account',
    title: 'My Account or Device Was Hacked',
    description: 'Secure your account and report the incident.',
    iconType: 'lock',
    iconBg: 'bg-[#E3E8F4]',
    iconColor: 'text-[#3E5381]',
    href: '/report/hacked',
  },
  {
    id: 'report-anonymous',
    title: 'I Want to Report Anonymously',
    description: 'Share what you know, without revealing your identity.',
    iconType: 'user',
    iconBg: 'bg-[#FCE8DC]',
    iconColor: 'text-[#C55E27]',
    href: '/report/anonymous',
  },
  {
    id: 'verify-suspicious',
    title: 'I Want to Check / Report a Suspicious Number, UPI ID or Website',
    description: 'Verify before you trust.',
    iconType: 'search',
    iconBg: 'bg-[#D9EFF9]',
    iconColor: 'text-[#1875A4]',
    href: '/verify',
  },
  {
    id: 'need-help',
    title: 'I Need Help',
    description: 'Find the right contact, police station or support service.',
    iconType: 'lifebuoy',
    iconBg: 'bg-[#FCE0DA]',
    iconColor: 'text-[#C94D33]',
    href: '/help',
  },
];
