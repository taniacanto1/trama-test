import { useState, type ReactNode } from 'react';
import styles from './MiBiblioteca.module.css';
import ProgressModal from './ProgressModal';
import { useBookSection } from '../hooks/useOpenLibrary';
import type { Book } from '../data/books';
import type { NavigateProps } from '../types/common';

/* ── Static non-book data ── */

const READING_PROGRESS = { streak: 12, currentPage: 233, totalPages: 550 };

const lists = [
  { id: 1, name: 'Muyyy recomendados', count: 12 },
  { id: 2, name: 'Drama',              count: 15 },
  { id: 3, name: 'Escritos por mujeres', count: 9 },
];

interface Genre { name: string; pct: number; color: string; }

const genres: Genre[] = [
  { name: 'Fantasía',  pct: 42, color: '#8B5CF6' },
  { name: 'Drama',     pct: 20, color: '#3B82F6' },
  { name: 'Histórica', pct: 18, color: '#F59E0B' },
  { name: 'Otros',     pct: 12, color: '#10B981' },
];

interface WeekDay { day: string; pages: number; today?: boolean; }

const weekActivity: WeekDay[] = [
  { day: 'LU', pages: 22 },
  { day: 'MA', pages: 38 },
  { day: 'MI', pages: 14 },
  { day: 'JU', pages: 54 },
  { day: 'VI', pages: 30 },
  { day: 'SÁ', pages: 46 },
  { day: 'DO', pages: 18, today: true },
];

/* ── Shelf labels ── */
const SHELF_LABELS = ['Quiero leer', 'Leyendo', 'Acabado', 'No acabado'] as const;
type ShelfLabel = typeof SHELF_LABELS[number];

/* ── Sub-components ── */

function FlameIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

function SectionCard({ children, className = '' }: SectionCardProps) {
  return <div className={`${styles.sectionCard} ${className}`}>{children}</div>;
}

interface DonutChartProps {
  genres: Genre[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}

interface Seg extends Genre { start: number; end: number; }

function DonutChart({ genres, selected, onSelect }: DonutChartProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const total = genres.reduce((s, g) => s + g.pct, 0);
  const cx = 56, cy = 56, R = 44, r = 26;
  let angle = -90;
  const segs: Seg[] = genres.map(g => {
    const sweep = (g.pct / total) * 360;
    const seg: Seg = { ...g, start: angle, end: angle + sweep - 1.5 };
    angle += sweep;
    return seg;
  });
  function pt(deg: number, radius: number): [number, number] {
    const rad = deg * Math.PI / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  }
  function arcPath(start: number, end: number): string {
    const [x1, y1] = pt(start, R);
    const [x2, y2] = pt(end, R);
    const [x3, y3] = pt(end, r);
    const [x4, y4] = pt(start, r);
    const large = end - start > 180 ? 1 : 0;
    return `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${large} 0 ${x4},${y4}Z`;
  }
  const hoveredGenre = genres.find(g => g.name === hovered);
  return (
    <div className={styles.donutWrap}>
      <svg viewBox="0 0 112 112" className={styles.donutSvg}>
        {segs.map(seg => {
          const midAngle = (seg.start + seg.end) / 2;
          const midR = (R + r) / 2;
          const [tx, ty] = pt(midAngle, midR);
          const sweep = seg.end - seg.start;
          return (
            <g key={seg.name}>
              <path
                d={arcPath(seg.start, seg.end)}
                fill={seg.color}
                opacity={!selected || selected === seg.name ? 1 : 0.65}
                className={styles.donutSegment}
                onClick={() => onSelect(selected === seg.name ? null : seg.name)}
                onMouseEnter={() => setHovered(seg.name)}
                onMouseLeave={() => setHovered(null)}
              />
              {sweep > 18 && (
                <text
                  x={tx} y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={styles.donutLabel}
                  style={{ opacity: !selected || selected === seg.name ? 1 : 0.3 }}
                  pointerEvents="none"
                >
                  {seg.pct}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className={styles.donutTooltip} style={{ visibility: hoveredGenre ? 'visible' : 'hidden' }}>
        {hoveredGenre && (
          <>
            <span className={styles.donutTooltipDot} style={{ background: hoveredGenre.color }} />
            <span className={styles.donutTooltipName}>{hoveredGenre.name}</span>
            <span className={styles.donutTooltipPct}>{hoveredGenre.pct}%</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Sections ── */

interface EstoyLeyendoProps extends NavigateProps {
  book: Book | null;
  loading: boolean;
}

function EstoyLeyendo({ book, loading, onNavigate }: EstoyLeyendoProps) {
  const [progressOpen, setProgressOpen] = useState(false);
  const totalPages = book?.pages ?? READING_PROGRESS.totalPages;
  const progress = Math.round((READING_PROGRESS.currentPage / totalPages) * 100);

  const progressBook = {
    cover: book?.cover ?? '',
    title: book?.title ?? '',
    author: book?.author ?? '',
    currentPage: READING_PROGRESS.currentPage,
    totalPages,
  };

  return (
    <section className={`${styles.section} ${styles.readingSection}`}>
      <h2 className={styles.sectionTitle}>Estoy leyendo...</h2>
      <SectionCard className={styles.readingCard}>
        {loading || !book ? (
          <div className={styles.coverPlaceholder} />
        ) : (
          <img
            className={styles.bookCover}
            src={book.cover}
            alt={book.title}
            onClick={() => onNavigate?.('libro')}
            style={{ cursor: 'pointer' }}
          />
        )}

        <div className={styles.bookInfo}>
          <div className={styles.bookHeader}>
            <div>
              <h3 className={styles.bookTitle}>
                {(loading || !book) ? <span className={styles.skeletonText} style={{ width: '160px' }} /> : book.title}
              </h3>
              <p className={styles.bookAuthor}>
                {(loading || !book) ? <span className={styles.skeletonText} style={{ width: '100px' }} /> : book.author}
              </p>
            </div>
            <div className={styles.streakBadge}>
              <FlameIcon />
              <span>{READING_PROGRESS.streak} días seguidos</span>
            </div>
          </div>

          <div className={styles.progressBox}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Progreso</span>
              <span className={styles.progressPages}>
                {READING_PROGRESS.currentPage}/{totalPages} págs.
              </span>
            </div>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }}>
                <span className={styles.progressPct}>{progress}%</span>
              </div>
            </div>
          </div>

          <div className={styles.bookActions}>
            <button className={styles.btnOutline}>Ver historial</button>
            <button className={styles.btnFill} onClick={() => setProgressOpen(true)}>Actualizar progreso</button>
          </div>
        </div>

        <button className={styles.chevronBtn}><ChevronRightIcon /></button>
      </SectionCard>

      {progressOpen && (
        <ProgressModal book={progressBook} onClose={() => setProgressOpen(false)} />
      )}
    </section>
  );
}

const PAGE_SIZE = 7;

interface EstanteriaProps extends NavigateProps {
  onVerTodo?: () => void;
  shelfBooksMap: Record<ShelfLabel, Book[]>;
  loadingMap: Record<ShelfLabel, boolean>;
}

function Estanteria({ onNavigate, onVerTodo, shelfBooksMap, loadingMap }: EstanteriaProps) {
  const [activeFilter, setActiveFilter] = useState<ShelfLabel>(SHELF_LABELS[0]);
  const [page, setPage] = useState(0);

  const filtered = shelfBooksMap[activeFilter as ShelfLabel] ?? [];
  const loading = loadingMap[activeFilter as ShelfLabel] ?? false;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function handleFilterChange(label: ShelfLabel) {
    setActiveFilter(label);
    setPage(0);
  }

  const isLastPage = page >= totalPages - 1;
  const padded = loading
    ? Array(PAGE_SIZE).fill(null) as null[]
    : [...visible, ...Array(Math.max(0, PAGE_SIZE - visible.length)).fill(null)] as (Book | null)[];

  function handlePageBtn() {
    setPage((p: number) => isLastPage ? 0 : p + 1);
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Estantería</h2>
      <div className={styles.shelfSubHeader}>
        <div className={styles.filterTabs}>
          {SHELF_LABELS.map(label => (
            <button
              key={label}
              className={`${styles.filterTab} ${activeFilter === label ? styles.filterTabActive : ''}`}
              onClick={() => handleFilterChange(label)}
            >
              {label}
              <span className={styles.filterCount}>{shelfBooksMap[label]?.length ?? 0}</span>
            </button>
          ))}
        </div>
        <button className={styles.verTodo} onClick={() => onVerTodo?.()}>Ver todo <ChevronRightIcon /></button>
      </div>
      <SectionCard className={styles.shelfCard}>
        <div className={styles.shelfGrid}>
          {padded.map((book, idx) => book ? (
            <div key={book.id} className={styles.shelfBook} onClick={() => onNavigate?.('libro')} style={{ cursor: 'pointer' }}>
              <img className={styles.shelfCover} src={book.cover} alt={book.title} />
              <p className={styles.shelfTitle}>{book.title}</p>
              <p className={styles.shelfAuthor}>{book.author}</p>
            </div>
          ) : (
            <div key={`ph-${idx}`} className={`${styles.shelfBookPlaceholder} ${loading ? styles.shelfBookSkeleton : ''}`} />
          ))}
        </div>
        {!loading && totalPages > 1 && (
          <button
            className={`${styles.chevronBtn} ${isLastPage ? styles.chevronBtnLeft : ''}`}
            onClick={handlePageBtn}
            title={isLastPage ? 'Volver al inicio' : `Página ${page + 1} de ${totalPages}`}
          >
            <ChevronRightIcon />
          </button>
        )}
      </SectionCard>
    </section>
  );
}

interface ListasProps {
  collageBooks: Book[];
}

function Listas({ collageBooks }: ListasProps) {
  const covers = collageBooks.slice(0, 4);
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Listas</h2>
        <a href="#" className={styles.verTodo}>Ver todo <ChevronRightIcon /></a>
      </div>
      <div className={styles.listasCard}>
        {lists.map(list => (
          <div key={list.id} className={styles.listaItem}>
            <div className={styles.listaCollage}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={styles.listaCollageImg}>
                  {covers[i] ? (
                    <img src={covers[i].cover} alt="" />
                  ) : (
                    <div className={styles.listaCollagePlaceholder} />
                  )}
                </div>
              ))}
            </div>
            <div className={styles.listaText}>
              <p className={styles.listaName}>{list.name}</p>
              <p className={styles.listaCount}>{list.count} libros</p>
            </div>
          </div>
        ))}
        <div className={styles.listaNueva}>
          <div className={styles.listaNuevaIcon}><PlusIcon /></div>
          <p className={styles.listaNuevaText}>Crear nueva lista</p>
        </div>
      </div>
    </section>
  );
}

interface ProgresosProps {
  genreBooks: Record<string, Book[]>;
}

function Progresos({ genreBooks }: ProgresosProps) {
  const maxPages = Math.max(...weekActivity.map(d => d.pages));
  const totalWeekPages = weekActivity.reduce((sum, d) => sum + d.pages, 0);
  const todayIdx = weekActivity.findIndex(d => d.today);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const displayDay = hoveredIdx !== null ? weekActivity[hoveredIdx] : weekActivity[todayIdx];

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Progresos</h2>
      <div className={styles.progresosGrid}>

        {/* Meta anual */}
        <SectionCard className={styles.progresosCard}>
          <p className={styles.progresosColTitle}>Meta anual</p>
          <div className={styles.goalCircleOuter}>
            <div className={styles.goalCircleInner}>
              <span className={styles.goalNumber}>20/20</span>
              <span className={styles.goalLabel}>libros</span>
            </div>
          </div>
          <p className={styles.goalCompleted}>¡Completado!</p>
        </SectionCard>

        {/* Actividad semanal */}
        <SectionCard className={styles.progresosCard}>
          <p className={styles.progresosColTitle}>Actividad semanal</p>
          <div className={styles.barChart}>
            {weekActivity.map(({ day, pages, today }, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <div
                  key={day}
                  className={styles.barCol}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className={`${styles.bar} ${isHovered ? styles.barActive : today ? styles.barToday : ''}`}
                    style={{ height: `${(pages / maxPages) * 64}px` }}
                  />
                  <span className={`${styles.barLabel} ${isHovered ? styles.barLabelActive : today ? styles.barLabelToday : ''}`}>{day}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.chartStats}>
            <div className={styles.chartStat}>
              <span className={styles.chartStatNum}>{totalWeekPages}</span>
              <span className={styles.chartStatLabel}>págs. semana</span>
            </div>
            <div className={styles.chartStat}>
              <span className={styles.chartStatNum}>{displayDay?.pages}</span>
              <span className={styles.chartStatLabel}>págs. {displayDay?.day.toLowerCase()}</span>
            </div>
            <div className={styles.chartStat}>
              <span className={`${styles.chartStatNum} ${styles.chartStatGreen}`}>↑12%</span>
              <span className={styles.chartStatLabel}>semana pasada</span>
            </div>
          </div>
        </SectionCard>

        {/* Géneros favoritos */}
        <SectionCard className={`${styles.progresosCard} ${styles.progresosCardGenre}`}>
          <p className={styles.progresosColTitle}>Géneros favoritos</p>
          <div className={styles.genreChartLayout}>
            <div className={styles.genreLegendSide}>
              <div className={styles.donutLegend}>
                {genres.map(g => (
                  <div
                    key={g.name}
                    className={`${styles.donutLegendItem} ${selectedGenre === g.name ? styles.donutLegendItemActive : ''}`}
                    onClick={() => setSelectedGenre(selectedGenre === g.name ? null : g.name)}
                  >
                    <span className={styles.donutLegendDot} style={{ background: g.color }} />
                    <span className={styles.donutLegendName}>{g.name}</span>
                    <span className={styles.donutLegendPct}>{g.pct}%</span>
                  </div>
                ))}
              </div>
              {selectedGenre && (
                <div className={styles.genreBooksPanel}>
                  {(genreBooks[selectedGenre] ?? []).slice(0, 6).map(book => (
                    <div key={book.id} className={styles.genreBookItem}>
                      <img className={styles.genreBookCover} src={book.cover} alt={book.title} />
                      <div className={styles.genreBookInfo}>
                        <p className={styles.genreBookTitle}>{book.title}</p>
                        <p className={styles.genreBookAuthor}>{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DonutChart genres={genres} selected={selectedGenre} onSelect={setSelectedGenre} />
          </div>
        </SectionCard>

      </div>
    </section>
  );
}

/* ── Page ── */
export default function MiBiblioteca({ onNavigate }: NavigateProps) {
  // Fetch each shelf category from Open Library
  // Each query maps to a genre name used in the Progresos chart
  const { books: booksLeyendo,   loading: loadingL } = useBookSection('fantasy magic adventure',          'Fantasía',  14, 0);
  const { books: booksAcabado,   loading: loadingA } = useBookSection('literary drama fiction classic',   'Drama',     14, 100);
  const { books: booksQuiero,    loading: loadingQ } = useBookSection('historical fiction novel',         'Histórica', 14, 200);
  const { books: booksNoAcabado, loading: loadingN } = useBookSection('science fiction dystopian thriller','Otros',    14, 300);

  const shelfBooksMap: Record<ShelfLabel, Book[]> = {
    'Leyendo':     booksLeyendo,
    'Acabado':     booksAcabado,
    'Quiero leer': booksQuiero,
    'No acabado':  booksNoAcabado,
  };

  const loadingMap: Record<ShelfLabel, boolean> = {
    'Leyendo':     loadingL,
    'Acabado':     loadingA,
    'Quiero leer': loadingQ,
    'No acabado':  loadingN,
  };

  const genreBooks: Record<string, Book[]> = {
    'Fantasía':  booksLeyendo,
    'Drama':     booksAcabado,
    'Histórica': booksQuiero,
    'Otros':     booksNoAcabado,
  };

  // First book from the "Leyendo" section is the currently-reading book
  const currentBook = booksLeyendo[0] ?? null;
  const collageBooks = [...booksAcabado, ...booksLeyendo].slice(0, 4);

  return (
    <main className={styles.page}>
      <EstoyLeyendo book={currentBook} loading={loadingL} onNavigate={onNavigate} />
      <Estanteria
        shelfBooksMap={shelfBooksMap}
        loadingMap={loadingMap}
        onNavigate={onNavigate}
        onVerTodo={() => onNavigate?.('estanteria')}
      />
      <Listas collageBooks={collageBooks} />
      <Progresos genreBooks={genreBooks} />
    </main>
  );
}
