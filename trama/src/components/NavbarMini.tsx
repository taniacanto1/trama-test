import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from './NavbarMini.module.css';

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

interface NavItem {
  label: string;
  page: string;
  icon: ReactNode;
}

const ITEMS: NavItem[] = [
  { label: 'Biblioteca', page: 'biblioteca', icon: <BookIcon /> },
  { label: 'Explorar',   page: 'explorar',   icon: <SearchIcon /> },
  { label: 'Comunidad',  page: 'comunidad',  icon: <PeopleIcon /> },
];

const STYLES = ['glass', 'warm', 'dark'] as const;
type PillStyle = typeof STYLES[number];
const STYLE_LABELS: Record<PillStyle, string> = {
  glass: 'A · Glass blur',
  warm:  'B · Naranja',
  dark:  'C · Oscuro',
};

const activePage = (current: string) => current === 'libro' ? 'explorar' : current;

interface NavbarMiniProps {
  visible: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function NavbarMini({ visible, currentPage, onNavigate }: NavbarMiniProps) {
  const [pillStyle, setPillStyle] = useState<PillStyle>('glass');
  const active = activePage(currentPage);

  return (
    <>
      <div className={styles.optionBar}>
        <label>Pill style</label>
        {STYLES.map(s => (
          <button
            key={s}
            className={pillStyle === s ? styles.active : ''}
            onClick={() => setPillStyle(s)}
          >
            {STYLE_LABELS[s]}
          </button>
        ))}
      </div>

      <nav className={`${styles.navbar} ${styles[pillStyle]} ${visible ? styles.visible : ''}`}>
        {ITEMS.map(({ label, page, icon }) => (
          <button
            key={page}
            className={`${styles.item} ${active === page ? styles.itemActive : ''}`}
            onClick={() => onNavigate(page)}
          >
            {icon}
            <span className={styles.label}>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
