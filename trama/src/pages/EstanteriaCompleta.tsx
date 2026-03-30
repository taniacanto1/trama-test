import { useState } from 'react';
import { shelfBooks, SHELF_FILTERS } from '../data/shelfBooks';
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

/* ── Page ── */
interface EstanteriaCompletaProps {
  onNavigate?: (page: string) => void;
}

export default function EstanteriaCompleta({ onNavigate }: EstanteriaCompletaProps) {
  const [activeFilter, setActiveFilter] = useState(SHELF_FILTERS[0].label);
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.trim().length > 0;

  /* When searching: across all shelves. When browsing: filter by active tab. */
  const displayBooks = isSearching
    ? shelfBooks.filter(b =>
        searchMatch(searchQuery, b.title) ||
        searchMatch(searchQuery, b.author)
      )
    : shelfBooks.filter(b => b.shelf === activeFilter);

  const hasResults = displayBooks.length > 0;

  function handleFilterChange(label: string) {
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
          {SHELF_FILTERS.map(({ label, count }) => (
            <button
              key={label}
              className={`${styles.filterTab} ${!isSearching && activeFilter === label ? styles.filterTabActive : ''}`}
              onClick={() => handleFilterChange(label)}
            >
              {label}
              <span className={styles.filterCount}>{count}</span>
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
      ) : (
        <div className={styles.booksGrid}>
          {displayBooks.map(book => (
            <div
              key={book.id}
              className={styles.bookItem}
              onClick={() => onNavigate?.('libro')}
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
