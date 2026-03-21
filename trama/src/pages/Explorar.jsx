import BookCard from '../components/BookCard';
import {
  tendencias,
  porqueHasLeido,
  destacadosFantasia,
  ultimosLanzamientos,
  masHistorias,
  mejorValorados,
} from '../data/books';
import styles from './Explorar.module.css';

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

function Section({ title, linkText = 'Ver más', children }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <a href="#" className={styles.sectionLink}>
          {linkText} <ChevronRight />
        </a>
      </div>
      <div className={styles.cardGrid}>{children}</div>
    </section>
  );
}

export default function Explorar({ onNavigate }) {
  return (
    <main className={styles.page}>
      <p className={styles.scrollHint}>↓ Haz scroll para ver la transición del navbar ↓</p>

      {/* Hero */}
      <div className={styles.hero}>
        <h1>Descubre tu próxima trama</h1>
        <div className={styles.searchBar}>
          <SearchIcon />
          <input type="text" placeholder="Buscar título, autor o ISBN" />
        </div>
        <button className={styles.recomendadorBtn}>Recomendador</button>
      </div>

      <Section title="Tendencias esta semana">
        {tendencias.map(b => (
          <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />
        ))}
      </Section>

      <Section title={<>Porque has leído: <span className={styles.highlight}>Las Gratitudes</span></>}>
        {porqueHasLeido.map(b => (
          <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />
        ))}
      </Section>

      <Section title={<>Destacados de <span className={styles.highlight}>Fantasía</span></>}>
        {destacadosFantasia.map(b => (
          <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />
        ))}
      </Section>

      <Section title="Últimos lanzamientos">
        {ultimosLanzamientos.map(b => (
          <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />
        ))}
      </Section>

      <Section title={<>Más historias como <span className={styles.highlight}>El Nombre del Viento</span></>}>
        {masHistorias.map(b => (
          <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />
        ))}
      </Section>

      <Section title="Los mejor valorados de tu estilo">
        {mejorValorados.map(b => (
          <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />
        ))}
      </Section>
    </main>
  );
}
