import styles from './MiBiblioteca.module.css';

/* ── Data ── */
const currentBook = {
  cover: 'https://covers.openlibrary.org/b/isbn/0756404738-L.jpg',
  title: 'El nombre del viento',
  author: 'Patrick Rothfuss',
  streak: 12,
  currentPage: 233,
  totalPages: 550,
};

const shelfBooks = [
  { id: 1, cover: 'https://covers.openlibrary.org/b/isbn/9780553385533-L.jpg', title: 'Fuego y Sangre', author: 'G.R.R. Martin' },
  { id: 2, cover: 'https://covers.openlibrary.org/b/isbn/9780451477682-L.jpg', title: 'El encuadernador', author: 'Genevieve Cogman' },
  { id: 3, cover: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg', title: 'Donde cantan los árboles', author: 'Kerstin Gier' },
  { id: 4, cover: 'https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg', title: 'Los siete maridos de Evelyn Hugo', author: 'Taylor Jenkins Reid' },
  { id: 5, cover: 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg', title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling' },
  { id: 6, cover: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg', title: 'El principito', author: 'Antoine de Saint-Exupéry' },
];

const lists = [
  { id: 1, name: 'Muyyy recomendados', count: 12 },
  { id: 2, name: 'Drama',              count: 15 },
  { id: 3, name: 'Escritos por mujeres', count: 9 },
];

const genres = [
  { name: 'Fantasía',  pct: 42, color: '#d4500f' },
  { name: 'Drama',     pct: 20, color: '#b8745a' },
  { name: 'Histórica', pct: 18, color: '#7a8fa3' },
  { name: 'Otros',     pct: 12, color: '#e3ddd5' },
];

const weekActivity = [
  { day: 'LU', pages: 22 },
  { day: 'MA', pages: 38 },
  { day: 'MI', pages: 14 },
  { day: 'JU', pages: 54 },
  { day: 'VI', pages: 30 },
  { day: 'SÁ', pages: 46 },
  { day: 'DO', pages: 18, today: true },
];

const SHELF_FILTERS = ['Quiero leer', 'Leyendo', 'Acabado', 'No acabado'];

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

/* ── Sections ── */

function EstoyLeyendo() {
  const progress = Math.round((currentBook.currentPage / currentBook.totalPages) * 100);

  return (
    <section className={`${styles.section} ${styles.readingSection}`}>
      <h2 className={styles.sectionTitle}>Estoy leyendo...</h2>
      <SectionCard className={styles.readingCard}>
        <img className={styles.bookCover} src={currentBook.cover} alt={currentBook.title} />

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
                {currentBook.currentPage}/ {currentBook.totalPages} páginas
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
            <button className={styles.btnFill}>Actualizar progreso</button>
          </div>
        </div>

        <button className={styles.chevronBtn}><ChevronRightIcon /></button>
      </SectionCard>
    </section>
  );
}

function Estanteria() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.shelfHeaderLeft}>
          <h2 className={styles.sectionTitle}>Estantería</h2>
          <div className={styles.filterTabs}>
            {SHELF_FILTERS.map((f, i) => (
              <button key={f} className={`${styles.filterTab} ${i === 0 ? styles.filterTabActive : ''}`}>{f}</button>
            ))}
          </div>
        </div>
        <a href="#" className={styles.verTodo}>Ver todo</a>
      </div>
      <SectionCard className={styles.shelfCard}>
        <div className={styles.shelfGrid}>
          {shelfBooks.map(book => (
            <div key={book.id} className={styles.shelfBook}>
              <img className={styles.shelfCover} src={book.cover} alt={book.title} />
              <p className={styles.shelfTitle}>{book.title}</p>
              <p className={styles.shelfAuthor}>{book.author}</p>
            </div>
          ))}
        </div>
        <button className={styles.chevronBtn}><ChevronRightIcon /></button>
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
            {weekActivity.map(({ day, pages, today }) => (
              <div key={day} className={styles.barCol}>
                <div
                  className={`${styles.bar} ${today ? styles.barToday : ''}`}
                  style={{ height: `${(pages / maxPages) * 64}px` }}
                />
                <span className={`${styles.barLabel} ${today ? styles.barLabelToday : ''}`}>{day}</span>
              </div>
            ))}
          </div>
          <div className={styles.chartStats}>
            <div className={styles.chartStat}>
              <span className={styles.chartStatNum}>236</span>
              <span className={styles.chartStatLabel}>págs. semana</span>
            </div>
            <div className={styles.chartStat}>
              <span className={styles.chartStatNum}>34</span>
              <span className={styles.chartStatLabel}>págs. hoy</span>
            </div>
            <div className={styles.chartStat}>
              <span className={`${styles.chartStatNum} ${styles.chartStatGreen}`}>↑12%</span>
              <span className={styles.chartStatLabel}>semana pasada</span>
            </div>
          </div>
        </SectionCard>

        {/* Géneros favoritos */}
        <SectionCard className={styles.progresosCard}>
          <p className={styles.progresosColTitle}>Géneros favoritos</p>
          <div className={styles.genreList}>
            {genres.map(({ name, pct, color }) => (
              <div key={name} className={styles.genreItem}>
                <div className={styles.genreRow}>
                  <span className={styles.genreName}>{name}</span>
                  <span className={styles.genrePct}>{pct}%</span>
                </div>
                <div className={styles.genreTrack}>
                  <div className={styles.genreFill} style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </section>
  );
}

/* ── Page ── */
export default function MiBiblioteca() {
  return (
    <main className={styles.page}>
      <EstoyLeyendo />
      <Estanteria />
      <Listas />
      <Progresos />
    </main>
  );
}
