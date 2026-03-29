import { useState } from 'react';
import styles from './MiBiblioteca.module.css';
import ProgressModal from './ProgressModal';

/* ── Data ── */
const currentBook = {
  cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg',
  title: 'El nombre del viento',
  author: 'Patrick Rothfuss',
  streak: 12,
  currentPage: 233,
  totalPages: 550,
};

const OL = 'https://covers.openlibrary.org/b/isbn';
const shelfBooks = [
  /* ── Leyendo ── */
  { id:  1, cover: `${OL}/0756404738-L.jpg`,      title: 'El nombre del viento',               author: 'Patrick Rothfuss',         shelf: 'Leyendo' },
  { id:  2, cover: `${OL}/9780441013593-L.jpg`,   title: 'Dune',                               author: 'Frank Herbert',             shelf: 'Leyendo' },
  { id:  3, cover: `${OL}/9780062316110-L.jpg`,   title: 'Sapiens',                            author: 'Yuval Noah Harari',         shelf: 'Leyendo' },
  { id:  4, cover: `${OL}/9780060850524-L.jpg`,   title: 'Un mundo feliz',                     author: 'Aldous Huxley',             shelf: 'Leyendo' },
  { id:  5, cover: `${OL}/9780141441146-L.jpg`,   title: 'Jane Eyre',                          author: 'Charlotte Brontë',          shelf: 'Leyendo' },
  { id:  6, cover: `${OL}/9780143107637-L.jpg`,   title: 'Crimen y castigo',                   author: 'Fiódor Dostoyevski',        shelf: 'Leyendo' },
  { id: 25, cover: `${OL}/9780812550702-L.jpg`,   title: 'El juego de Ender',                  author: 'Orson Scott Card',          shelf: 'Leyendo' },
  { id: 26, cover: `${OL}/9780553293357-L.jpg`,   title: 'Fundación',                          author: 'Isaac Asimov',              shelf: 'Leyendo' },
  { id: 27, cover: `${OL}/9780061935466-L.jpg`,   title: 'Matar a un ruiseñor',                author: 'Harper Lee',                shelf: 'Leyendo' },
  { id: 28, cover: `${OL}/9780439023481-L.jpg`,   title: 'Los juegos del hambre',              author: 'Suzanne Collins',           shelf: 'Leyendo' },
  { id: 29, cover: `${OL}/9780141439570-L.jpg`,   title: 'El retrato de Dorian Gray',          author: 'Oscar Wilde',               shelf: 'Leyendo' },
  { id: 30, cover: `${OL}/9780156329350-L.jpg`,   title: 'Flores para Algernon',               author: 'Daniel Keyes',              shelf: 'Leyendo' },
  { id: 31, cover: `${OL}/9780553208849-L.jpg`,   title: 'Siddhartha',                         author: 'Hermann Hesse',             shelf: 'Leyendo' },
  { id: 32, cover: `${OL}/9780140386326-L.jpg`,   title: 'La historia interminable',           author: 'Michael Ende',              shelf: 'Leyendo' },
  /* ── Acabado ── */
  { id:  7, cover: `${OL}/9780547928227-L.jpg`,   title: 'El hobbit',                          author: 'J.R.R. Tolkien',           shelf: 'Acabado' },
  { id:  8, cover: `${OL}/9780439708180-L.jpg`,   title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling',             shelf: 'Acabado' },
  { id:  9, cover: `${OL}/9780544003415-L.jpg`,   title: 'El señor de los anillos',            author: 'J.R.R. Tolkien',           shelf: 'Acabado' },
  { id: 10, cover: `${OL}/9780743273565-L.jpg`,   title: 'El gran Gatsby',                     author: 'F. Scott Fitzgerald',      shelf: 'Acabado' },
  { id: 11, cover: `${OL}/9780141439518-L.jpg`,   title: 'Orgullo y prejuicio',                author: 'Jane Austen',              shelf: 'Acabado' },
  { id: 12, cover: `${OL}/9780062315007-L.jpg`,   title: 'El alquimista',                      author: 'Paulo Coelho',             shelf: 'Acabado' },
  { id: 33, cover: `${OL}/9781451673319-L.jpg`,   title: 'Fahrenheit 451',                     author: 'Ray Bradbury',              shelf: 'Acabado' },
  { id: 34, cover: `${OL}/9780385504201-L.jpg`,   title: 'El código Da Vinci',                 author: 'Dan Brown',                 shelf: 'Acabado' },
  { id: 35, cover: `${OL}/9780141439556-L.jpg`,   title: 'Cumbres borrascosas',                author: 'Emily Brontë',              shelf: 'Acabado' },
  { id: 36, cover: `${OL}/9780393312836-L.jpg`,   title: 'La naranja mecánica',                author: 'Anthony Burgess',           shelf: 'Acabado' },
  { id: 37, cover: `${OL}/9781400033416-L.jpg`,   title: 'Beloved',                            author: 'Toni Morrison',             shelf: 'Acabado' },
  { id: 38, cover: `${OL}/9780684801223-L.jpg`,   title: 'El viejo y el mar',                  author: 'Ernest Hemingway',          shelf: 'Acabado' },
  { id: 39, cover: `${OL}/9780451419439-L.jpg`,   title: 'Los miserables',                     author: 'Victor Hugo',               shelf: 'Acabado' },
  { id: 40, cover: `${OL}/9780143035008-L.jpg`,   title: 'Anna Karénina',                      author: 'León Tolstói',              shelf: 'Acabado' },
  /* ── Quiero leer ── */
  { id: 13, cover: `${OL}/9780451524935-L.jpg`,   title: '1984',                               author: 'George Orwell',            shelf: 'Quiero leer' },
  { id: 14, cover: `${OL}/9780060883287-L.jpg`,   title: 'Cien años de soledad',               author: 'Gabriel García Márquez',   shelf: 'Quiero leer' },
  { id: 15, cover: `${OL}/9780316769174-L.jpg`,   title: 'El guardián entre el centeno',       author: 'J.D. Salinger',            shelf: 'Quiero leer' },
  { id: 16, cover: `${OL}/9780553213690-L.jpg`,   title: 'La metamorfosis',                    author: 'Franz Kafka',              shelf: 'Quiero leer' },
  { id: 17, cover: `${OL}/9780008117498-L.jpg`,   title: 'La sombra del viento',               author: 'Carlos Ruiz Zafón',        shelf: 'Quiero leer' },
  { id: 18, cover: `${OL}/9780060934347-L.jpg`,   title: 'Don Quijote de la Mancha',           author: 'Miguel de Cervantes',      shelf: 'Quiero leer' },
  { id: 41, cover: `${OL}/9780140449266-L.jpg`,   title: 'El conde de Montecristo',            author: 'Alexandre Dumas',           shelf: 'Quiero leer' },
  { id: 42, cover: `${OL}/9780142437247-L.jpg`,   title: 'Moby Dick',                          author: 'Herman Melville',           shelf: 'Quiero leer' },
  { id: 43, cover: `${OL}/9781400079988-L.jpg`,   title: 'Guerra y paz',                       author: 'León Tolstói',              shelf: 'Quiero leer' },
  { id: 44, cover: `${OL}/9780805209990-L.jpg`,   title: 'El proceso',                         author: 'Franz Kafka',               shelf: 'Quiero leer' },
  { id: 45, cover: `${OL}/9780679720201-L.jpg`,   title: 'Lolita',                             author: 'Vladimir Nabokov',          shelf: 'Quiero leer' },
  { id: 46, cover: `${OL}/9780141439549-L.jpg`,   title: 'Middlemarch',                        author: 'George Eliot',              shelf: 'Quiero leer' },
  { id: 47, cover: `${OL}/9780375724732-L.jpg`,   title: 'El señor de las moscas',             author: 'William Golding',           shelf: 'Quiero leer' },
  { id: 48, cover: `${OL}/9780062316097-L.jpg`,   title: 'Breve historia del tiempo',          author: 'Stephen Hawking',           shelf: 'Quiero leer' },
  /* ── No acabado ── */
  { id: 19, cover: `${OL}/9780156012195-L.jpg`,   title: 'El principito',                      author: 'Antoine de Saint-Exupéry', shelf: 'No acabado' },
  { id: 20, cover: `${OL}/9781594633669-L.jpg`,   title: 'La chica del tren',                  author: 'Paula Hawkins',            shelf: 'No acabado' },
  { id: 21, cover: `${OL}/9780756407124-L.jpg`,   title: 'El temor de un hombre sabio',        author: 'Patrick Rothfuss',         shelf: 'No acabado' },
  { id: 22, cover: `${OL}/9780385490818-L.jpg`,   title: 'El túnel',                           author: 'Ernesto Sabato',           shelf: 'No acabado' },
  { id: 23, cover: `${OL}/9788408163435-L.jpg`,   title: 'La catedral del mar',                author: 'Ildefonso Falcones',       shelf: 'No acabado' },
  { id: 24, cover: `${OL}/9780307474278-L.jpg`,   title: 'Crónica de una muerte anunciada',    author: 'Gabriel García Márquez',   shelf: 'No acabado' },
  { id: 49, cover: `${OL}/9780143108078-L.jpg`,   title: 'El maestro y Margarita',             author: 'Mijaíl Bulgákov',           shelf: 'No acabado' },
  { id: 50, cover: `${OL}/9788437604183-L.jpg`,   title: 'Pedro Páramo',                       author: 'Juan Rulfo',                shelf: 'No acabado' },
  { id: 51, cover: `${OL}/9780553383805-L.jpg`,   title: 'La casa de los espíritus',           author: 'Isabel Allende',            shelf: 'No acabado' },
  { id: 52, cover: `${OL}/9780385420174-L.jpg`,   title: 'Como agua para chocolate',           author: 'Laura Esquivel',            shelf: 'No acabado' },
  { id: 53, cover: `${OL}/9780802130303-L.jpg`,   title: 'Ficciones',                          author: 'Jorge Luis Borges',         shelf: 'No acabado' },
  { id: 54, cover: `${OL}/9780375725845-L.jpg`,   title: 'El perfume',                         author: 'Patrick Süskind',           shelf: 'No acabado' },
  { id: 55, cover: `${OL}/9780060932138-L.jpg`,   title: 'La insoportable levedad del ser',    author: 'Milan Kundera',             shelf: 'No acabado' },
  { id: 56, cover: `${OL}/9780151446476-L.jpg`,   title: 'El nombre de la rosa',               author: 'Umberto Eco',               shelf: 'No acabado' },
];

const lists = [
  { id: 1, name: 'Muyyy recomendados', count: 12 },
  { id: 2, name: 'Drama',              count: 15 },
  { id: 3, name: 'Escritos por mujeres', count: 9 },
];

const genres = [
  { name: 'Fantasía',  pct: 42, color: '#8B5CF6' },
  { name: 'Drama',     pct: 20, color: '#3B82F6' },
  { name: 'Histórica', pct: 18, color: '#F59E0B' },
  { name: 'Otros',     pct: 12, color: '#10B981' },
];

const genreBookIds = {
  'Fantasía':  [7, 8, 9],
  'Drama':     [10, 11, 35, 38, 40],
  'Histórica': [37, 39],
  'Otros':     [12, 33, 34, 36],
};

const bookById = Object.fromEntries(shelfBooks.map(b => [b.id, b]));

const weekActivity = [
  { day: 'LU', pages: 22 },
  { day: 'MA', pages: 38 },
  { day: 'MI', pages: 14 },
  { day: 'JU', pages: 54 },
  { day: 'VI', pages: 30 },
  { day: 'SÁ', pages: 46 },
  { day: 'DO', pages: 18, today: true },
];

const SHELF_FILTERS = [
  { label: 'Quiero leer', count: 14 },
  { label: 'Leyendo',     count: 14 },
  { label: 'Acabado',     count: 14 },
  { label: 'No acabado',  count: 14 },
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

function SectionCard({ children, className = '' }) {
  return <div className={`${styles.sectionCard} ${className}`}>{children}</div>;
}

function DonutChart({ genres, selected, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const total = genres.reduce((s, g) => s + g.pct, 0);
  const cx = 56, cy = 56, R = 44, r = 26;
  let angle = -90;
  const segs = genres.map(g => {
    const sweep = (g.pct / total) * 360;
    const seg = { ...g, start: angle, end: angle + sweep - 1.5 };
    angle += sweep;
    return seg;
  });
  function pt(deg, radius) {
    const rad = deg * Math.PI / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  }
  function arcPath(start, end) {
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

function EstoyLeyendo({ onNavigate }) {
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

function Estanteria({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState(SHELF_FILTERS[0].label);
  const [page, setPage] = useState(0);

  const filtered = shelfBooks.filter(b => b.shelf === activeFilter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function handleFilterChange(label) {
    setActiveFilter(label);
    setPage(0);
  }

  const isLastPage = page === totalPages - 1;
  const padded = [...visible, ...Array(Math.max(0, PAGE_SIZE - visible.length)).fill(null)];

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
        <a href="#" className={styles.verTodo}>Ver todo</a>
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
        <a href="#" className={styles.verTodo}>Ver todo</a>
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
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

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
              <span className={styles.chartStatNum}>{displayDay.pages}</span>
              <span className={styles.chartStatLabel}>págs. {displayDay.day.toLowerCase()}</span>
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
export default function MiBiblioteca({ onNavigate }) {
  return (
    <main className={styles.page}>
      <EstoyLeyendo onNavigate={onNavigate} />
      <Estanteria onNavigate={onNavigate} />
      <Listas />
      <Progresos />
    </main>
  );
}
