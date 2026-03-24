import { useState, useEffect, useRef } from 'react';
import styles from './BookCard.module.css';

const SHELF_OPTIONS = ['Quiero leer', 'Leyendo', 'Acabado', 'No acabado'];

export default function BookCard({ cover, tag, title, author, rating, reviews, rank, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = (option) => {
    setSaved(saved === option ? null : option);
    setOpen(false);
  };

  return (
    <div className={`${styles.card} ${rank ? styles.trending : ''} ${open ? styles.cardOpen : ''}`}>
      {rank && <div className={styles.rankClip}><span className={styles.rank}>{rank}</span></div>}
      <img className={styles.cover} src={cover} alt={title} />
      <div className={styles.info}>
        <div>
          <span className={styles.tag}>{tag}</span>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>{author}</p>
          <p className={styles.rating}>
            <span className={styles.star}>★</span> {rating}{' '}
            <span className={styles.count}>({reviews})</span>
          </p>
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
