import { useState, useRef, useEffect } from 'react';
import styles from './DetalleLibro.module.css';
import BookCard from '../components/BookCard';
import SynopsisModal from '../components/SynopsisModal';
import { useClickOutside } from '../hooks/useClickOutside';
import { getWork, extractSynopsis } from '../lib/openLibrary';
import { useAuthorData } from '../hooks/useOpenLibrary';
import type { Book } from '../data/books';

/* ── Default (fallback) book ── */
const OL = 'https://covers.openlibrary.org/b/isbn';

const DEFAULT_BOOK = {
  cover: '',
  genre: '',
  title: '',
  author: '',
  rating: 0,
  reviews: '',
  pages: 0,
  year: 0,
  isbn: '',
  synopsis: '',
};

interface ReviewData {
  id: number;
  name: string;
  handle: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
}

const reviews: ReviewData[] = [
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
    text: 'Increíble construcción del mundo y los personajes. Una prosa magistral. Sin duda uno de los mejores libros de fantasía que he leído.',
    likes: 35,
    comments: 4,
  },
  {
    id: 3,
    name: 'María García',
    handle: '@mariagarcia',
    date: 'hace 1 semana',
    rating: 4,
    text: 'Una historia que te atrapa desde la primera página. Los personajes son fascinantes y el mundo está lleno de detalles únicos.',
    likes: 12,
    comments: 2,
  },
];


const recommendations: Book[] = [
  { id: 1, cover: `${OL}/9780547928227-L.jpg`,  tag: 'Fantasía',  title: 'El hobbit',                         author: 'J.R.R. Tolkien',   rating: 4.6, reviews: '3.1k', isbn: '978-84-450-7179-3', synopsis: '' },
  { id: 2, cover: `${OL}/9780439708180-L.jpg`,  tag: 'Fantasía',  title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling',     rating: 4.8, reviews: '15k',  isbn: '978-84-204-4879-8', synopsis: '' },
  { id: 3, cover: `${OL}/9780451524935-L.jpg`,  tag: 'Distopía',  title: '1984',                              author: 'George Orwell',    rating: 4.7, reviews: '8.2k', isbn: '978-84-450-7185-4', synopsis: '' },
];

/* ── Sub-components ── */

interface StarRatingProps {
  rating: number;
  size?: number;
}

function StarRating({ rating, size = 16 }: StarRatingProps) {
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
                    <stop offset="50%" stopColor="var(--color-brand-primary)" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#hg-${i})`} stroke="var(--color-brand-primary)" strokeWidth="1.5"
                />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? 'var(--color-brand-primary)' : 'none'}
                stroke={filled ? 'var(--color-brand-primary)' : 'var(--color-text-tertiary)'}
                strokeWidth="1.5"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function ReviewCard({ name, handle, date, rating, text, likes, comments }: ReviewData) {
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
const SHELF_OPTIONS = ['Quiero leer', 'Leyendo', 'Acabado', 'No acabado'];

interface DetalleLibroProps {
  onNavigate?: (page: string, book?: Book) => void;
  book?: Book;
}

export default function DetalleLibro({ onNavigate, book: bookProp }: DetalleLibroProps) {
  const [shelfOpen, setShelfOpen] = useState(false);
  const [savedShelf, setSavedShelf] = useState<string | null>(null);
  const [synopsisOpen, setSynopsisOpen] = useState(false);
  const [synopsis, setSynopsis] = useState(bookProp?.synopsis ?? '');
  const shelfRef = useRef<HTMLDivElement>(null);

  useClickOutside(shelfRef, shelfOpen, () => setShelfOpen(false));

  /* Fetch synopsis from OL works API when navigating from OL search results */
  useEffect(() => {
    if (!bookProp?.olKey) return;
    if (bookProp.synopsis) {
      setSynopsis(bookProp.synopsis);
      return;
    }
    setSynopsis('');
    getWork(bookProp.olKey)
      .then(work => {
        const text = extractSynopsis(work);
        setSynopsis(text);
      })
      .catch(() => {});
  }, [bookProp?.olKey, bookProp?.synopsis]);

  /* Compose display data from prop or fallback defaults */
  const display = bookProp
    ? {
        cover:   bookProp.cover || DEFAULT_BOOK.cover,
        genre:   bookProp.tag,
        title:   bookProp.title,
        author:  bookProp.author,
        rating:  bookProp.rating || DEFAULT_BOOK.rating,
        reviews: bookProp.reviews || '',
        pages:   bookProp.pages ?? 0,
        year:    bookProp.year ?? 0,
        isbn:    bookProp.isbn,
      }
    : DEFAULT_BOOK;

  const { authorData } = useAuthorData(display.author, display.title);

  return (
    <main className={styles.page}>

      {synopsisOpen && <SynopsisModal text={synopsis} onClose={() => setSynopsisOpen(false)} />}

      {/* ══ Sección info libro ══ */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <div className={styles.coverWrap}>
            <img className={styles.cover} src={display.cover} alt={display.title} />
          </div>
          <button className={styles.shareBtn} aria-label="Compartir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          <div className={styles.details}>
            <span className={styles.genre}>{display.genre}</span>
            <h1 className={styles.title}>{display.title}</h1>
            <p className={styles.authorText}>{display.author}</p>

            <div className={styles.infoRow}>
              {display.rating > 0 && (
                <>
                  <div className={styles.ratingBlock}>
                    <span className={styles.ratingNumber}>{display.rating}</span>
                    <div className={styles.ratingStarsGroup}>
                      <StarRating rating={display.rating} size={15} />
                      {display.reviews && (
                        <span className={styles.ratingCount}>{display.reviews} valoraciones</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.metaDivider} />
                </>
              )}
              <>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Páginas</span>
                  <span className={styles.metaValue}>{display.pages > 0 ? display.pages : '—'}</span>
                </div>
                <div className={styles.metaDivider} />
              </>
              {display.year > 0 && (
                <>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Publicación</span>
                    <span className={styles.metaValue}>{display.year}</span>
                  </div>
                  <div className={styles.metaDivider} />
                </>
              )}
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ISBN</span>
                <span className={styles.metaValue}>{display.isbn || '—'}</span>
              </div>
            </div>

            {synopsis ? (
              <div className={styles.synopsisCard}>
                <div className={styles.synopsisText}>
                  {synopsis.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
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
            ) : bookProp?.olKey ? (
              <p className={styles.synopsisLoading}>Cargando sinopsis…</p>
            ) : null}

            <div className={styles.cardFooter}>
              <div className={styles.saveWrapper} ref={shelfRef}>
                <button
                  className={`${styles.saveBtn} ${savedShelf && !shelfOpen ? styles.saveBtnSaved : ''} ${shelfOpen ? styles.saveBtnOpen : ''}`}
                  onClick={() => setShelfOpen(o => !o)}
                >
                  {savedShelf && !shelfOpen && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.saveBtnCheck}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {savedShelf || 'Guardar libro'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.saveBtnChevron}>
                    <polyline points="9 6 15 12 9 18"/>
                  </svg>
                </button>
                {shelfOpen && (
                  <div className={styles.saveDropdown}>
                    <ul className={styles.saveDropdownList}>
                      {SHELF_OPTIONS.map(opt => (
                        <li key={opt}>
                          <button
                            className={`${styles.saveDropdownItem} ${savedShelf === opt ? styles.saveDropdownItemActive : ''}`}
                            onClick={() => { if (savedShelf === opt) { setSavedShelf(null); } else { setSavedShelf(opt); setShelfOpen(false); } }}
                          >
                            {savedShelf === opt && (
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
        </div>
      </section>

      {/* ══ Reseñas de la comunidad ══ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Reseñas de la comunidad</h2>
          <a href="#" className={styles.verTodo}>
            Ver más
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
        <div className={styles.reviewsGrid}>
          {reviews.map(r => <ReviewCard key={r.id} {...r} />)}
        </div>
      </section>

      {/* ══ Más sobre el autor ══ */}
      {display.author && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Más sobre el autor</h2>
          <div className={styles.authorCard}>
            <div className={styles.authorPhotoWrap}>
              {authorData?.photo ? (
                <>
                  <img
                    className={styles.authorPhoto}
                    src={authorData.photo}
                    alt={display.author}
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      const sibling = e.currentTarget.nextSibling as HTMLElement | null;
                      if (sibling) sibling.style.display = 'flex';
                    }}
                  />
                  <div className={styles.authorPhotoFallback}>
                    {display.author.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                  </div>
                </>
              ) : (
                <div className={styles.authorPhotoFallback} style={{ display: 'flex' }}>
                  {display.author.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.authorInfo}>
              <h3 className={styles.authorName}>{display.author}</h3>
              {authorData?.bio && (
                <div className={styles.authorBioCard}>
                  <p className={styles.authorBio}>{authorData.bio}</p>
                </div>
              )}
            </div>
          </div>
          {authorData?.books && authorData.books.length > 0 && (
            <div className={styles.authorBooksRow}>
              {authorData.books.map(b => {
                const navBook: Book = {
                  id: 0,
                  cover: b.cover,
                  tag: display.genre || 'Narrativa',
                  title: b.title,
                  author: display.author,
                  rating: 0,
                  reviews: '',
                  isbn: '',
                  synopsis: '',
                  olKey: b.key,
                  year: b.year ? parseInt(b.year) : undefined,
                };
                return (
                  <div key={b.key} className={styles.authorBook} onClick={() => onNavigate?.('libro', navBook)}>
                    <img className={styles.authorBookCover} src={b.cover} alt={b.title} />
                    <p className={styles.authorBookTitle}>{b.title}</p>
                    {b.year && <p className={styles.authorBookYear}>{b.year}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ══ Recomendaciones ══ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Recomendaciones basadas en{' '}
          <span className={styles.titleHighlight}>{display.title}</span>
        </h2>
        <div className={styles.recsGrid}>
          {recommendations.map(b => <BookCard key={b.id} {...b} onNavigate={() => onNavigate?.('libro', b)} />)}
        </div>
      </section>

    </main>
  );
}
