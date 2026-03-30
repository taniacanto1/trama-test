import type { ReactNode } from 'react';
import styles from './NavbarFull.module.css';

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
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

interface NavLink {
  label: string;
  page: string;
  icon: ReactNode;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Mi Biblioteca', page: 'biblioteca', icon: <BookIcon /> },
  { label: 'Explorar',      page: 'explorar',   icon: <SearchIcon /> },
  { label: 'Comunidad',     page: 'comunidad',  icon: <PeopleIcon /> },
];

const activePage = (current: string) => current === 'libro' ? 'explorar' : current;

interface NavbarFullProps {
  hidden: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function NavbarFull({ hidden, currentPage, onNavigate }: NavbarFullProps) {
  const active = activePage(currentPage);
  return (
    <nav className={`${styles.navbar} ${hidden ? styles.hidden : ''}`}>
      <a className={styles.logo} href="#" onClick={e => { e.preventDefault(); onNavigate('explorar'); }}>
        <span className={styles.logoIcon}><BookIcon /></span>
        <span className={styles.logoText}>Trama</span>
      </a>

      <ul className={styles.navLinks}>
        {NAV_LINKS.map(({ label, page, icon }) => (
          <li key={page}>
            <a
              href="#"
              className={active === page ? styles.active : ''}
              onClick={e => { e.preventDefault(); onNavigate(page); }}
            >
              {icon}
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.navActions}>
        <button className={styles.registerBtn}>
          <PlusIcon />
          Registrar lectura
        </button>
        <button className={styles.iconBtn}><BellIcon /></button>
        <div className={styles.avatar}>T</div>
      </div>
    </nav>
  );
}
