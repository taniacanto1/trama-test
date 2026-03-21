import { useState, useEffect } from 'react';
import styles from './DetalleLibro.module.css';
import BookCard from '../components/BookCard';

/* ── Helpers ── */
function formatCount(n) {
  if (n >= 1000) {
    const k = n / 1000;
    return (Number.isInteger(k) ? k : k.toFixed(1)) + 'K';
  }
  return n.toString();
}

/* ── Data ── */
const OL = 'https://covers.openlibrary.org/b/isbn';

const book = {
  cover: `${OL}/0756404738-L.jpg`,
  genre: 'Fantasía',
  title: 'El nombre del viento',
  author: 'Patrick Rothfuss',
  rating: 4.7,
  reviewCount: 10945,
  pages: 662,
  year: 2007,
  isbn: '978-84-9800-296-2',
  synopsis: `En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe, músico, mendigo, ladrón, estudiante, mago, héroe y asesino.\n\nAhora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de Tarbean y su etapa como estudiante en la Universidad.`,
};

const reviews = [
  {
    id: 1,
    name: 'Andrea Ruiz',
    handle: '@andrea_r03',
    date: 'hace 2 días',
    rating: 4,
    text: 'Es una pasada, una auténtica obra maestra. Lo volvería a leer mil veces. Es sin duda una lectura imprescindible!!',
    likes: 20,
    comments: 1,
  },
  {
    id: 2,
    name: 'Carlos Méndez',
    handle: '@carlosmendez',
    date: 'hace 5 días',
    rating: 5,
    text: 'Increíble construcción del mundo y los personajes. Rothfuss tiene una prosa magistral. Sin duda uno de los mejores libros de fantasía que he leído.',
    likes: 35,
    comments: 4,
  },
  {
    id: 3,
    name: 'María García',
    handle: '@mariagarcia',
    date: 'hace 1 semana',
    rating: 4,
    text: 'Una historia que te atrapa desde la primera página. Kvothe es un personaje fascinante y el mundo está lleno de detalles únicos.',
    likes: 12,
    comments: 2,
  },
];

const authorBooks = [
  { id: 1, cover: `${OL}/9780756407124-L.jpg`, title: 'El Temor de un Hombre Sabio', year: '2011' },
  { id: 2, cover: `${OL}/9780756411374-L.jpg`, title: 'El Estrecho Sendero Entre Deseos', year: '2023' },
  { id: 3, cover: `${OL}/9780756405892-L.jpg`, title: 'La Música del Silencio', year: '1999' },
];

const recommendations = [
  { id: 1, cover: `${OL}/9780547928227-L.jpg`,  tag: 'Fantasía',  title: 'El hobbit',                         author: 'J.R.R. Tolkien',   rating: 4.6, reviews: '3.1k' },
  { id: 2, cover: `${OL}/9780439708180-L.jpg`,  tag: 'Fantasía',  title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling',     rating: 4.8, reviews: '15k' },
  { id: 3, cover: `${OL}/9780451524935-L.jpg`,  tag: 'Distopía',  title: '1984',                              author: 'George Orwell',    rating: 4.7, reviews: '8.2k' },
];

/* ── Sub-components ── */

function StarRating({ rating, size = 16 }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => {
        const filled = rating >= i;
        const half   = !filled && rating >= i - 0.5;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            {half ? (
              <>
                <defs>
                  <linearGradient id={`hg-${i}`}>
                    <stop offset="50%" stopColor="var(--orange)" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#hg-${i})`} stroke="var(--orange)" strokeWidth="1.5"
                />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? 'var(--orange)' : 'none'}
                stroke={filled ? 'var(--orange)' : 'var(--text-tertiary)'}
                strokeWidth="1.5"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function ReviewCard({ name, handle, date, rating, text, likes, comments }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAvatar}>{name.charAt(0)}</div>
        <div className={styles.reviewUser}>
          <span className={styles.reviewName}>{name}</span>
          <span className={styles.reviewHandle}>{handle}</span>
        </div>
        <div className={styles.reviewMeta}>
          <StarRating rating={rating} size={13} />
          <span className={styles.reviewDate}>{date}</span>
        </div>
      </div>
      <div className={styles.reviewTextBox}>
        <p className={styles.reviewText}>{text}</p>
      </div>
      <div className={styles.reviewFooter}>
        <button className={styles.reviewAction}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{likes}</span>
        </button>
        <button className={styles.reviewAction}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{comments}</span>
        </button>
      </div>
    </div>
  );
}

/* ── Page ── */
function SynopsisModal({ text, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Sinopsis</h3>
          <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          {text.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}

export default function DetalleLibro({ onNavigate }) {
  const [saved, setSaved] = useState(false);
  const [synopsisOpen, setSynopsisOpen] = useState(false);

  return (
    <main className={styles.page}>

      {/* ══ Sección info libro ══ */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          {synopsisOpen && <SynopsisModal text={book.synopsis} onClose={() => setSynopsisOpen(false)} />}
          <div className={styles.coverWrap}>
            <img className={styles.cover} src={book.cover} alt={book.title} />
            <div className={styles.coverOverlay}>
              <span className={styles.coverOverlayText}>Ver libro</span>
            </div>
          </div>
          <button className={styles.shareBtn} aria-label="Compartir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          <div className={styles.details}>
            <span className={styles.genre}>{book.genre}</span>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.authorText}>{book.author}</p>

            <div className={styles.infoRow}>
              <div className={styles.ratingBlock}>
                <span className={styles.ratingNumber}>{book.rating}</span>
                <div className={styles.ratingStarsGroup}>
                  <StarRating rating={book.rating} size={15} />
                  <span className={styles.ratingCount}>{formatCount(book.reviewCount)} valoraciones</span>
                </div>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Páginas</span>
                <span className={styles.metaValue}>{book.pages}</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Publicación</span>
                <span className={styles.metaValue}>{book.year}</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ISBN</span>
                <span className={styles.metaValue}>{book.isbn}</span>
              </div>
            </div>

            <div className={styles.synopsisCard}>
              <div className={styles.synopsisText}>
                {book.synopsis.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className={styles.synopsisGradient}>
                <button className={styles.synopsisExpand} onClick={() => setSynopsisOpen(true)}>
                  Leer más
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`}
                onClick={() => setSaved(s => !s)}
              >
                {saved ? '✓ Guardado' : 'Guardar libro'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Reseñas de la comunidad ══ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Reseñas de la comunidad</h2>
          <a href="#" className={styles.verTodo}>Ver más</a>
        </div>
        <div className={styles.reviewsGrid}>
          {reviews.map(r => <ReviewCard key={r.id} {...r} />)}
        </div>
      </section>

      {/* ══ Más sobre el autor ══ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Más sobre el autor</h2>
        <div className={styles.authorCard}>
          <div className={styles.authorPhotoWrap}>
            <img
              className={styles.authorPhoto}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Patrick-rothfuss-2014-kyle-cassidy.jpg/500px-Patrick-rothfuss-2014-kyle-cassidy.jpg"
              alt="Patrick Rothfuss"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className={styles.authorPhotoFallback}>PR</div>
          </div>
          <div className={styles.authorInfo}>
            <h3 className={styles.authorName}>Patrick Rothfuss</h3>
            <div className={styles.authorBioCard}>
              <p className={styles.authorBio}>
                Patrick James Rothfuss (Madison, 6 de junio de 1973) es un escritor estadounidense de fantasía
                y profesor adjunto de literatura y filología inglesa de la Universidad de Wisconsin. Es el autor
                de la serie Crónica del asesino de reyes, que fue rechazada por varias editoriales antes de que
                el primer libro de la serie <em>El nombre del viento</em> fuese publicado en el año 2007.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.authorBooksRow}>
          {authorBooks.map(b => (
            <div key={b.id} className={styles.authorBook} onClick={() => onNavigate?.('libro')}>
              <img className={styles.authorBookCover} src={b.cover} alt={b.title} />
              <p className={styles.authorBookTitle}>{b.title}</p>
              <p className={styles.authorBookYear}>{b.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ Recomendaciones ══ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Recomendaciones basadas en{' '}
          <span className={styles.titleHighlight}>El Nombre del Viento</span>
        </h2>
        <div className={styles.recsGrid}>
          {recommendations.map(b => <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro')} />)}
        </div>
      </section>

    </main>
  );
}
