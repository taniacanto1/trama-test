import { useState, useEffect } from 'react';
import NavbarFull from './components/NavbarFull';
import NavbarMini from './components/NavbarMini';
import Explorar from './pages/Explorar';
import MiBiblioteca from './pages/MiBiblioteca';

const SCROLL_THRESHOLD = 100;

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('explorar');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on page change
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NavbarFull hidden={scrolled} currentPage={currentPage} onNavigate={navigate} />
      <NavbarMini visible={scrolled} currentPage={currentPage} onNavigate={navigate} />
      {currentPage === 'explorar'   && <Explorar />}
      {currentPage === 'biblioteca' && <MiBiblioteca />}
    </>
  );
}
