import { useState } from 'react';
import { useBookSection } from '../hooks/useOpenLibrary';
import type { Book } from '../data/books';
import NoResults from '../components/NoResults';
import { searchMatch } from '../utils/search';
import styles from './EstanteriaCompleta.module.css';

/* ── Icons ── */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);

/* ── Shelf config (same queries as MiBiblioteca → shared cache) ── */
const SHELF_CONFIG = [
  { label: 'Quiero leer', query: 'historical fiction novel',          tag: 'Histórica', delay: 200 },
  { label: 'Leyendo',     query: 'fantasy magic adventure',           tag: 'Fantasía',  delay: 0   },
  { label: 'Acabado',     query: 'literary drama fiction classic',    tag: 'Drama',     delay: 100 },
  { label: 'No acabado',  query: 'science fiction dystopian thriller', tag: 'Otros',    delay: 300 },
] as const;

type ShelfLabel = typeof SHELF_CONFIG[number]['label'];

const SKELETON_COUNT = 14;

/* ── Page ── */
interface EstanteriaCompletaProps {
  onNavigate?: (page: string, book?: Book) => void;
}

export default function EstanteriaCompleta({ onNavigate }: EstanteriaCompletaProps) {
  const [activeFilter, setActiveFilter] = useState<ShelfLabel>(SHELF_CONFIG[0].label);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all 4 shelf sections — identical args to MiBiblioteca, so cache is reused
  const { books: booksQuiero,    loading: lQ } = useBookSection(SHELF_CONFIG[0].query, SHELF_CONFIG[0].tag, 14, SHELF_CONFIG[0].delay);
  const { books: booksLeyendo,   loading: lL } = useBookSection(SHELF_CONFIG[1].query, SHELF_CONFIG[1].tag, 14, SHELF_CONFIG[1].delay);
  const { books: booksAcabado,   loading: lA } = useBookSection(SHELF_CONFIG[2].query, SHELF_CONFIG[2].tag, 14, SHELF_CONFIG[2].delay);
  const { books: booksNoAcabado, loading: lN } = useBookSection(SHELF_CONFIG[3].query, SHELF_CONFIG[3].tag, 14, SHELF_CONFIG[3].delay);

  const shelfBooksMap: Record<ShelfLabel, Book[]> = {
    'Quiero leer': booksQuiero,
    'Leyendo':     booksLeyendo,
    'Acabado':     booksAcabado,
    'No acabado':  booksNoAcabado,
  };

  const loadingMap: Record<ShelfLabel, boolean> = {
    'Quiero leer': lQ,
    'Leyendo':     lL,
    'Acabado':     lA,
    'No acabado':  lN,
  };

  const isSearching = searchQuery.trim().length > 0;
  const allBooks = [...booksQuiero, ...booksLeyendo, ...booksAcabado, ...booksNoAcabado];
  const activeLoading = loadingMap[activeFilter];

  const displayBooks = isSearching
    ? allBooks.filter(b =>
        searchMatch(searchQuery, b.title) ||
        searchMatch(searchQuery, b.author)
      )
    : shelfBooksMap[activeFilter] ?? [];

  const hasResults = displayBooks.length > 0;

  function handleFilterChange(label: ShelfLabel) {
    setActiveFilter(label);
    setSearchQuery('');
  }

  function clearSearch() {
    setSearchQuery('');
  }

  return (
    <main className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Estantería</h1>
        <button className={styles.ocultarBtn} onClick={() => onNavigate?.('biblioteca')}>
          Ocultar
        </button>
      </div>

      {/* ── Tools bar ── */}
      <div className={styles.tools}>

        {/* Shelf filter tabs */}
        <div className={styles.filterTabs}>
          {SHELF_CONFIG.map(({ label }) => (
            <button
              key={label}
              className={`${styles.filterTab} ${!isSearching && activeFilter === label ? styles.filterTabActive : ''}`}
              onClick={() => handleFilterChange(label)}
            >
              {label}
              <span className={styles.filterCount}>{shelfBooksMap[label]?.length ?? 0}</span>
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <span className={styles.searchDivider} />
          <input
            type="text"
            placeholder="Busca por título, autor o ISBN"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <button className={styles.clearBtn} onClick={clearSearch} aria-label="Limpiar búsqueda">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Filter button — disabled until future implementation */}
        <button className={styles.filterBtn} disabled aria-label="Filtros (próximamente)">
          <FilterIcon />
        </button>

      </div>

      {/* ── Results count header (when searching) ── */}
      {isSearching && (
        <div className={styles.resultsPanelHeader}>
          <p className={styles.resultsCount}>
            {displayBooks.length} resultado{displayBooks.length !== 1 ? 's' : ''} para &ldquo;{searchQuery}&rdquo;
          </p>
          <span className={styles.hideSearchBtn} onClick={clearSearch}>
            Ocultar búsqueda
          </span>
        </div>
      )}

      {/* ── Content ── */}
      {isSearching && !hasResults ? (
        <NoResults onNavigate={onNavigate} />
      ) : activeLoading && !isSearching ? (
        <div className={styles.booksGrid}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className={styles.bookItemSkeleton}>
              <div className={styles.skeletonCover} />
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonAuthor} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.booksGrid}>
          {displayBooks.map(book => (
            <div
              key={book.id}
              className={styles.bookItem}
              onClick={() => onNavigate?.('libro', book)}
            >
              <img className={styles.bookCover} src={book.cover} alt={book.title} />
              <p className={styles.bookTitle}>{book.title}</p>
              <p className={styles.bookAuthor}>{book.author}</p>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}
