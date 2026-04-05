import { useState, useEffect } from 'react';
import NavbarFull from './components/NavbarFull';
import NavbarMini from './components/NavbarMini';
import Explorar from './pages/Explorar';
import MiBiblioteca from './pages/MiBiblioteca';
import DetalleLibro from './pages/DetalleLibro';
import EstanteriaCompleta from './pages/EstanteriaCompleta';
import type { Book } from './data/books';

const SCROLL_THRESHOLD = 100;

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('explorar');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookKey, setBookKey] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (page: string, book?: Book) => {
    if (book) {
      setSelectedBook(book);
      setBookKey(k => k + 1);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NavbarFull hidden={scrolled} currentPage={currentPage} onNavigate={navigate} />
      <NavbarMini visible={scrolled} currentPage={currentPage} onNavigate={navigate} />
      {currentPage === 'explorar'    && <Explorar onNavigate={navigate} />}
      {currentPage === 'biblioteca'  && <MiBiblioteca onNavigate={navigate} />}
      {currentPage === 'estanteria'  && <EstanteriaCompleta onNavigate={navigate} />}
      {currentPage === 'libro'       && <DetalleLibro key={bookKey} onNavigate={navigate} book={selectedBook ?? undefined} />}
      {currentPage === 'comunidad'   && (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)' }}>Comunidad</p>
          <p style={{ fontSize: 'var(--text-sm)', opacity: 0.7 }}>Próximamente</p>
        </main>
      )}
    </>
  );
}
