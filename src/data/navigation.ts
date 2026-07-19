// Szépít-Lak – Navigáció struktúra

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export const navItems: NavItem[] = [
  {
    label: 'Főoldal',
    href: '/',
  },
  {
    label: 'Szolgáltatásaink',
    href: '/szolgaltatasaink',
    children: [
      { label: 'Nyílászárók', href: '/szolgaltatasaink/nyilaszaro' },
      { label: 'Árnyékolók', href: '/szolgaltatasaink/arnyekolok' },
      { label: 'Beltéri ajtók', href: '/szolgaltatasaink/belteri-ajtok' },
      { label: 'Szúnyoghálók', href: '/szolgaltatasaink/szunyoghalok' },
    ],
  },
  {
    label: 'Kapcsolat',
    href: '/kapcsolat',
  },
];

export const PHONE_NUMBER = '+36 30 210 2581';
export const PHONE_LINK = 'tel:+36302102581';
export const EMAIL = 'szepitlakinfo@gmail.com';
export const SERVICE_AREA = 'Tatabánya és környéke';
