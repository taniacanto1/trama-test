import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import styles from './BookCard.module.css';

const SHELF_OPTIONS = ['Quiero leer', 'Leyendo', 'Acabado', 'No acabado'];

interface BookCardProps {
  cover: string;
  tag: string;
  title: string;
  author: string;
  rating: number;
  reviews: string;
  rank?: number;
  onNavigate?: () => void;
}

export default function BookCard({ cover, tag, title, author, rating, reviews, rank, onNavigate }: BookCardProps) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [coverFailed, setCoverFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));

  const handleSelect = (option: string) => {
    setSaved(saved === option ? null : option);
    setOpen(false);
  };

  const showPlaceholder = !cover || coverFailed;

  return (
    <div className={`${styles.card} ${open ? styles.cardOpen : ''}`}>
      {rank && <div className={styles.rankClip}><span className={styles.rank}>{rank}</span></div>}
      {showPlaceholder ? (
        <div className={styles.coverPlaceholder} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      ) : (
        <img
          className={styles.cover}
          src={cover}
          alt={title}
          onError={() => setCoverFailed(true)}
        />
      )}
      <div className={styles.info}>
        <div>
          <span className={styles.tag}>{tag}</span>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>{author}</p>
          {rating > 0 && (
            <p className={styles.rating}>
              <span className={styles.star}>★</span> {rating}{' '}
              <span className={styles.count}>({reviews})</span>
            </p>
          )}
        </div>
        <div className={styles.cardActions}>
          <button className={styles.btnVer} onClick={onNavigate}>Ver libro</button>
          <div className={styles.saveWrapper} ref={ref}>
            <button
              className={`${styles.saveBtn} ${open ? styles.saveBtnActive : saved ? styles.saveBtnSaved : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Guardar libro"
            >
              {open ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
                </svg>
              ) : saved ? (
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M5 3a2 2 0 0 0-2 2v16l9-6 9 6V5a2 2 0 0 0-2-2H5z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>

            {open && (
              <div className={styles.dropdown}>
                <ul className={styles.dropdownList}>
                  {SHELF_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <button
                        className={`${styles.dropdownItem} ${saved === opt ? styles.dropdownItemActive : ''}`}
                        onClick={() => handleSelect(opt)}
                      >
                        {saved === opt && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
