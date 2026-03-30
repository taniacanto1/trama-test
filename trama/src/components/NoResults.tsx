import { useState } from 'react';
import BookCard from './BookCard';
import {
  tendencias,
  porqueHasLeido,
  destacadosFantasia,
  ultimosLanzamientos,
  masHistorias,
  mejorValorados,
} from '../data/books';
import type { Book } from '../data/books';
import styles from './NoResults.module.css';

const suggestionPool: Book[] = [
  ...tendencias,
  ...porqueHasLeido,
  ...destacadosFantasia,
  ...ultimosLanzamientos,
  ...masHistorias,
  ...mejorValorados,
].reduce((acc, b) => (acc.find(x => x.isbn === b.isbn) ? acc : [...acc, b]), [] as Book[]);

const PAGE_SIZE = 3;

interface NoResultsProps {
  onNavigate?: (page: string) => void;
}

export default function NoResults({ onNavigate }: NoResultsProps) {
  const [page, setPage] = useState(0);

  const start = (page * PAGE_SIZE) % suggestionPool.length;
  const suggestions = Array.from({ length: PAGE_SIZE }, (_, i) =>
    suggestionPool[(start + i) % suggestionPool.length]
  );

  return (
    <div className={styles.noResults}>
      <div className={styles.noResultsMsg}>
        <h3 className={styles.noResultsTitle}>¡Oops! No hemos encontrado el libro que buscas</h3>
        <img src="/no-results.png" alt="" className={styles.noResultsImg} />
      </div>

      <div className={styles.suggestionsBlock}>
        <h4 className={styles.suggestionsTitle}>Creemos que te gustará</h4>
        <div className={styles.suggestionsGrid}>
          {suggestions.map((b, i) => (
            <BookCard key={`${b.id}-${page}-${i}`} {...b} onNavigate={() => onNavigate?.('libro')} />
          ))}
        </div>
        <div className={styles.generateMoreWrap}>
          <button className={styles.generateMoreBtn} onClick={() => setPage(p => p + 1)}>
            Generar más
          </button>
        </div>
      </div>
    </div>
  );
}
