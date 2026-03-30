import { useState } from 'react';
import styles from './MiBiblioteca.module.css';
import ProgressModal from './ProgressModal';
import { shelfBooks, SHELF_FILTERS } from '../data/shelfBooks';
import type { ShelfBook } from '../data/shelfBooks';
import type { NavigateProps } from '../types/common';

/* ── Data ── */
const currentBook = {
  cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg',
  title: 'El nombre del viento',
  author: 'Patrick Rothfuss',
  streak: 12,
  currentPage: 233,
  totalPages: 550,
};

const lists = [
  { id: 1, name: 'Muyyy recomendados', count: 12 },
  { id: 2, name: 'Drama',              count: 15 },
  { id: 3, name: 'Escritos por mujeres', count: 9 },
];

interface Genre {
  name: string;
  pct: number;
  color: string;
}

const genres: Genre[] = [
  { name: 'Fantasía',  pct: 42, color: '#8B5CF6' },
  { name: 'Drama',     pct: 20, color: '#3B82F6' },
  { name: 'Histórica', pct: 18, color: '#F59E0B' },
  { name: 'Otros',     pct: 12, color: '#10B981' },
];

const genreBookIds: Record<string, number[]> = {
  'Fantasía':  [7, 8, 9],
  'Drama':     [10, 11, 35, 38, 40],
  'Histórica': [37, 39],
  'Otros':     [12, 33, 34, 36],
};

const bookById = Object.fromEntries(shelfBooks.map(b => [b.id, b])) as Record<number, ShelfBook>;

interface WeekDay {
  day: string;
  pages: number;
  today?: boolean;
}

const weekActivity: WeekDay[] = [
  { day: 'LU', pages: 22 },
  { day: 'MA', pages: 38 },
  { day: 'MI', pages: 14 },
  { day: 'JU', pages: 54 },
  { day: 'VI', pages: 30 },
  { day: 'SÁ', pages: 46 },
  { day: 'DO', pages: 18, today: true },
];


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
  children: React.ReactNode;
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

interface Seg extends Genre {
  start: number;
  end: number;
}

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

function EstoyLeyendo({ onNavigate }: NavigateProps) {
  const [progressOpen, setProgressOpen] = useState(false);
  const progress = Math.round((currentBook.currentPage / currentBook.totalPages) * 100);

  return (
    <section className={`${styles.section} ${styles.readingSection}`}>
      <h2 className={styles.sectionTitle}>Estoy leyendo...</h2>
      <SectionCard className={styles.readingCard}>
        <img
          className={styles.bookCover}
          src={currentBook.cover}
          alt={currentBook.title}
          onClick={() => onNavigate?.('libro')}
          style={{ cursor: 'pointer' }}
        />

        <div className={styles.bookInfo}>
          <div className={styles.bookHeader}>
            <div>
              <h3 className={styles.bookTitle}>{currentBook.title}</h3>
              <p className={styles.bookAuthor}>{currentBook.author}</p>
            </div>
            <div className={styles.streakBadge}>
              <FlameIcon />
              <span>{currentBook.streak} días seguidos</span>
            </div>
          </div>

          <div className={styles.progressBox}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Progreso</span>
              <span className={styles.progressPages}>
                {currentBook.currentPage}/{currentBook.totalPages} págs.
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
        <ProgressModal book={currentBook} onClose={() => setProgressOpen(false)} />
      )}
    </section>
  );
}

const PAGE_SIZE = 7;

interface EstanteriaProps extends NavigateProps {
  onVerTodo?: () => void;
}

function Estanteria({ onNavigate, onVerTodo }: EstanteriaProps) {
  const [activeFilter, setActiveFilter] = useState(SHELF_FILTERS[0].label);
  const [page, setPage] = useState(0);

  const filtered = shelfBooks.filter(b => b.shelf === activeFilter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function handleFilterChange(label: string) {
    setActiveFilter(label);
    setPage(0);
  }

  const isLastPage = page === totalPages - 1;
  const padded = [...visible, ...Array(Math.max(0, PAGE_SIZE - visible.length)).fill(null)] as (ShelfBook | null)[];

  function handlePageBtn() {
    setPage(p => isLastPage ? 0 : p + 1);
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Estantería</h2>
      <div className={styles.shelfSubHeader}>
        <div className={styles.filterTabs}>
          {SHELF_FILTERS.map(({ label, count }) => (
            <button
              key={label}
              className={`${styles.filterTab} ${activeFilter === label ? styles.filterTabActive : ''}`}
              onClick={() => handleFilterChange(label)}
            >
              {label}
              <span className={styles.filterCount}>{count}</span>
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
            <div key={`ph-${idx}`} className={styles.shelfBookPlaceholder} />
          ))}
        </div>
        {totalPages > 1 && (
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

function Listas() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Listas</h2>
        <a href="#" className={styles.verTodo}>Ver todo <ChevronRightIcon /></a>
      </div>
      <SectionCard className={styles.listasCard}>
        {lists.map(list => (
          <div key={list.id} className={styles.listaItem}>
            <div className={styles.listaCollage}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={styles.listaCollageImg}>
                  <img src={shelfBooks[i].cover} alt="" />
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
      </SectionCard>
    </section>
  );
}

function Progresos() {
  const maxPages = Math.max(...weekActivity.map(d => d.pages));
  const totalPages = weekActivity.reduce((sum, d) => sum + d.pages, 0);
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
              <span className={styles.chartStatNum}>{totalPages}</span>
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
                  {(genreBookIds[selectedGenre] || []).slice(0, 6).map(id => {
                    const book = bookById[id];
                    if (!book) return null;
                    return (
                      <div key={book.id} className={styles.genreBookItem}>
                        <img className={styles.genreBookCover} src={book.cover} alt={book.title} />
                        <div className={styles.genreBookInfo}>
                          <p className={styles.genreBookTitle}>{book.title}</p>
                          <p className={styles.genreBookAuthor}>{book.author}</p>
                        </div>
                      </div>
                    );
                  })}
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
  return (
    <main className={styles.page}>
      <EstoyLeyendo onNavigate={onNavigate} />
      <Estanteria onNavigate={onNavigate} onVerTodo={() => onNavigate?.('estanteria')} />
      <Listas />
      <Progresos />
    </main>
  );
}
