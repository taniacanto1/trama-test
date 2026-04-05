import { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import BookCard from '../components/BookCard';
import NoResults from '../components/NoResults';
import { useClickOutside } from '../hooks/useClickOutside';
import { useBookSearch, useBookSection } from '../hooks/useOpenLibrary';
import type { Book } from '../data/books';
import styles from './Explorar.module.css';

/* ── Icons ── */
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const SHELF_OPTIONS = ['Quiero leer', 'Leyendo', 'Acabado', 'No acabado'];

/* ── Search result card ── */
interface SearchResultCardProps {
  cover: string;
  tag: string;
  title: string;
  author: string;
  rating: number;
  reviews: string;
  synopsis: string;
  onNavigate?: () => void;
}

function SearchResultCard({ cover, tag, title, author, rating, reviews, synopsis, onNavigate }: SearchResultCardProps) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));

  const handleSelect = (option: string) => {
    setSaved(saved === option ? null : option);
    setOpen(false);
  };

  return (
    <div className={`${styles.resultCard} ${open ? styles.resultCardOpen : ''}`}>
        <img className={styles.resultCover} src={cover} alt={title} />

        {/* Left column: meta + actions */}
        <div className={styles.resultLeft}>
          <span className={styles.resultTag}>{tag}</span>
          <p className={styles.resultTitle}>{title}</p>
          <p className={styles.resultAuthor}>{author}</p>
          {rating > 0 && (
            <p className={styles.resultRating}>
              <span className={styles.resultStar}>★</span>{' '}{rating}{' '}
              <span className={styles.resultCount}>({reviews})</span>
            </p>
          )}
          <div className={styles.resultActions}>
            <button className={styles.btnVer} onClick={onNavigate}>Ver libro</button>
            <div className={styles.saveWrapper} ref={ref}>
              <button
                className={`${styles.saveBtn} ${open ? styles.saveBtnActive : saved ? styles.saveBtnSaved : ''}`}
                onClick={() => setOpen(o => !o)}
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
                    {SHELF_OPTIONS.map(opt => (
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

        {/* Centre: synopsis expandable inline */}
        {synopsis && (
          <div className={`${styles.synopsisCard} ${expanded ? styles.synopsisCardExpanded : ''}`}>
            <div className={styles.synopsisText}>
              {synopsis.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {!expanded && (
              <div className={styles.synopsisGradient}>
                <button className={styles.synopsisExpand} onClick={() => setExpanded(true)}>
                  Leer más
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
            )}
            {expanded && (
              <button className={styles.synopsisCollapse} onClick={() => setExpanded(false)}>
                Leer menos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </button>
            )}
          </div>
        )}
    </div>
  );
}

/* ── Section ── */
interface SectionProps {
  title: ReactNode;
  linkText?: string;
  single?: boolean;   // true = 1-row layout (Tendencias)
  children: ReactNode;
}

function Section({ title, linkText = 'Ver más', single = false, children }: SectionProps) {
  const gridClass = single ? styles.cardGridSingle : styles.cardGrid;
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <a href="#" className={styles.sectionLink}>
          {linkText} <ChevronRight />
        </a>
      </div>
      <div className={gridClass}>{children}</div>
    </section>
  );
}

function SectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton} />
      ))}
    </>
  );
}

/* ── Page ── */
interface ExplorarProps {
  onNavigate?: (page: string, book?: Book) => void;
}

export default function Explorar({ onNavigate }: ExplorarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const { results, loading: searchLoading } = useBookSearch(searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  /* Curated sections — staggered 250 ms apart to avoid OL rate limiting */
  const tendencias      = useBookSection('popular fiction bestsellers',    'Narrativa', 3,   0);
  const porqueHasLeido  = useBookSection('contemporary literary fiction',   'Narrativa', 6, 100);
  const destacados      = useBookSection('epic fantasy magic',              'Fantasía',  6, 200);
  const lanzamientos    = useBookSection('fiction 2023 2024',               'Narrativa', 6, 300);
  const masHistorias    = useBookSection('epic fantasy adventure series',   'Fantasía',  6, 400);
  const mejorValorados  = useBookSection('literary fiction award winning',  'Narrativa', 6, 500);

  return (
    <main className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <h2>Descubre tu próxima trama</h2>
        <div className={styles.searchBar}>
          <span className={styles.searchBarIcon}><SearchIcon /></span>
          <span className={styles.searchBarDivider} />
          <input
            type="text"
            placeholder="Busca por título, autor o ISBN"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <button
              className={styles.searchClearBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Limpiar búsqueda"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <button className={styles.recomendadorBtn}>Recomendador</button>
      </div>

      {isSearching ? (
        <div className={styles.resultsPanel}>
          <div className={styles.resultsPanelHeader}>
            <p className={styles.resultsCount}>
              {searchLoading
                ? 'Buscando…'
                : `${results.length} resultado${results.length !== 1 ? 's' : ''} para \u201c${searchQuery}\u201d`}
            </p>
            <span className={styles.hideSearchBtn} onClick={() => setSearchQuery('')}>
              Ocultar búsqueda
            </span>
          </div>

          {!searchLoading && results.length > 0 && (
            <div className={styles.resultsList}>
              {results.map(b => (
                <SearchResultCard
                  key={b.id}
                  cover={b.cover}
                  tag={b.tag}
                  title={b.title}
                  author={b.author}
                  rating={b.rating}
                  reviews={b.reviews}
                  synopsis={b.synopsis}
                  onNavigate={() => onNavigate?.('libro', b)}
                />
              ))}
            </div>
          )}

          {!searchLoading && results.length === 0 && (
            <NoResults onNavigate={onNavigate} />
          )}
        </div>
      ) : (
        <>
          <Section title="Tendencias esta semana">
            {tendencias.loading
              ? <SectionSkeleton count={3} />
              : tendencias.books.map((b, i) => (
                  <BookCard key={b.id} {...b} rank={i + 1} onNavigate={() => onNavigate?.('libro', b)} />
                ))}
          </Section>

          <Section title={<>Porque has leído: <span className={styles.highlight}>Las Gratitudes</span></>}>
            {porqueHasLeido.loading ? <SectionSkeleton /> : porqueHasLeido.books.map(b => (
              <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro', b)} />
            ))}
          </Section>

          <Section title={<>Destacados de <span className={styles.highlight}>Fantasía</span></>}>
            {destacados.loading ? <SectionSkeleton /> : destacados.books.map(b => (
              <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro', b)} />
            ))}
          </Section>

          <Section title="Últimos lanzamientos">
            {lanzamientos.loading ? <SectionSkeleton /> : lanzamientos.books.map(b => (
              <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro', b)} />
            ))}
          </Section>

          <Section title="Más aventuras épicas">
            {masHistorias.loading ? <SectionSkeleton /> : masHistorias.books.map(b => (
              <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro', b)} />
            ))}
          </Section>

          <Section title="Los mejor valorados de tu estilo">
            {mejorValorados.loading ? <SectionSkeleton /> : mejorValorados.books.map(b => (
              <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro', b)} />
            ))}
          </Section>
        </>
      )}
    </main>
  );
}
