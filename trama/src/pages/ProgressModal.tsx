import { useState, useRef } from 'react';
import styles from './ProgressModal.module.css';

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

interface ProgressBook {
  cover: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
}

interface ProgressModalProps {
  book: ProgressBook;
  onClose: () => void;
}

export default function ProgressModal({ book, onClose }: ProgressModalProps) {
  const [finished, setFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState(book.currentPage);
  const [note, setNote] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!panelRef.current?.contains(e.target as Node)) onClose();
  }

  function handlePageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.max(0, Math.min(Number(e.target.value), book.totalPages));
    setCurrentPage(val);
  }

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div className={styles.panel} ref={panelRef}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Registra tu progreso de hoy</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <XIcon />
          </button>
        </div>

        {/* Main */}
        <div className={styles.main}>

          {/* Left: book info */}
          <div className={styles.bookInfo}>
            <img className={styles.modalCover} src={book.cover} alt={book.title} />
            <p className={styles.modalTitle}>{book.title}</p>
            <p className={styles.modalAuthor}>{book.author}</p>
            <button className={styles.abandonBtn}>Marcar como dejado</button>
          </div>

          <div className={styles.verticalDivider} />

          {/* Right: progress fields */}
          <div className={styles.progressSection}>

            {/* ¿Has terminado? */}
            <div className={styles.row}>
              <span className={styles.rowLabel}>¿Has terminado el libro?</span>
              <button
                role="switch"
                aria-checked={finished}
                className={`${styles.toggleTrack} ${finished ? styles.toggleOn : ''}`}
                onClick={() => setFinished(f => !f)}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            {/* Página actual */}
            <div className={styles.row}>
              <span className={styles.rowLabel}>Página actual</span>
              <div className={styles.pageInputs}>
                <input
                  className={styles.pageInput}
                  type="number"
                  min="0"
                  max={book.totalPages}
                  value={currentPage}
                  onChange={handlePageChange}
                />
                <span className={styles.pageSeparator}>/</span>
                <input
                  className={`${styles.pageInput} ${styles.pageInputReadOnly}`}
                  type="number"
                  value={book.totalPages}
                  readOnly
                />
              </div>
            </div>

            {/* Notas */}
            <div className={styles.notesRow}>
              <span className={styles.notesLabel}>Añadir nota (opcional)</span>
              <textarea
                className={styles.textarea}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="¿Qué te ha parecido esta última lectura? ¿Alguna cita destacable?"
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.saveBtn} onClick={onClose}>
            Guardar lectura
          </button>
        </div>

      </div>
    </div>
  );
}
