import { useState, useEffect, useRef } from 'react';
import { searchBooks, docCover, type OLSearchDoc } from '../lib/openLibrary';
import type { Book } from '../data/books';

const SUBJECT_MAP: Record<string, string> = {
  'fantasy': 'Fantasía',
  'science fiction': 'Sci-fi',
  'mystery': 'Misterio',
  'romance': 'Romance',
  'historical fiction': 'Histórica',
  'thriller': 'Thriller',
  'horror': 'Terror',
  'young adult': 'Juvenil',
  'literary fiction': 'Narrativa',
  'classics': 'Clásico',
  'dystopian': 'Distopía',
  'magic': 'Fantasía',
  'epic fantasy': 'Fantasía',
};

function guessTag(subjects?: string[]): string {
  if (!subjects?.length) return 'Narrativa';
  for (const subject of subjects) {
    const lower = subject.toLowerCase();
    for (const [key, label] of Object.entries(SUBJECT_MAP)) {
      if (lower.includes(key)) return label;
    }
  }
  return 'Narrativa';
}

let nextId = 1000;

function randomRating(): number {
  return Math.round((3.5 + Math.random() * 1.4) * 10) / 10;
}

function randomReviews(): string {
  const n = Math.floor(Math.random() * 4900) + 100;
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}

export function docToBook(doc: OLSearchDoc, tagOverride?: string): Book {
  return {
    id: nextId++,
    cover: docCover(doc),
    tag: tagOverride ?? guessTag(doc.subject),
    title: doc.title,
    author: doc.author_name?.[0] ?? 'Autor desconocido',
    rating: randomRating(),
    reviews: randomReviews(),
    isbn: doc.isbn?.[0] ?? '',
    synopsis: '',
    olKey: doc.key,
    year: doc.first_publish_year,
    pages: doc.number_of_pages_median,
  };
}

export function useBookSearch(query: string, debounceMs = 400) {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timer.current);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const docs = await searchBooks(query, 12);
        setResults(docs.map(d => docToBook(d)));
        setError(null);
      } catch {
        setError('Error al buscar. Comprueba tu conexión.');
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer.current);
  }, [query, debounceMs]);

  return { results, loading, error };
}

/* ── Persistent cache (localStorage) + in-memory cache ── */

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_PREFIX = 'trama_section_';

interface StoredSection {
  books: Book[];
  ts: number;
}

function loadFromStorage(key: string): Book[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const { books, ts }: StoredSection = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }
    return books;
  } catch {
    return null;
  }
}

function saveToStorage(key: string, books: Book[]): void {
  try {
    const data: StoredSection = { books, ts: Date.now() };
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

/* Module-level in-memory cache — survives re-mounts within same session */
const sectionCache = new Map<string, Book[]>();

function initSection(cacheKey: string): Book[] {
  if (!sectionCache.has(cacheKey)) {
    const stored = loadFromStorage(cacheKey);
    if (stored) sectionCache.set(cacheKey, stored);
  }
  return sectionCache.get(cacheKey) ?? [];
}

export function useBookSection(query: string, tag: string, limit = 6, delayMs = 0) {
  const cacheKey = `${query}|${tag}|${limit}`;

  // Lazy initializers run once on mount — safe to read external state here
  const [books, setBooks] = useState<Book[]>(() => initSection(cacheKey));
  const [loading, setLoading] = useState<boolean>(() => !sectionCache.has(cacheKey));

  useEffect(() => {
    if (sectionCache.has(cacheKey)) return; // already have data — skip fetch

    let cancelled = false;
    const controller = new AbortController();

    let retried = false;

    const attempt = () => {
      if (cancelled) return;
      searchBooks(query, limit, controller.signal)
        .then(docs => {
          if (cancelled) return;
          const result = docs.slice(0, limit).map(d => docToBook(d, tag));
          sectionCache.set(cacheKey, result);
          saveToStorage(cacheKey, result);
          setBooks(result);
          setLoading(false);
        })
        .catch(err => {
          if (cancelled) return;
          if (err?.name === 'AbortError' || controller.signal.aborted) return;
          // Network failure: retry once after 3 seconds
          if (!retried) {
            retried = true;
            setTimeout(attempt, 3000);
          } else {
            setBooks([]);
            setLoading(false);
          }
        });
    };

    const timer = setTimeout(attempt, delayMs);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
    // Intentionally omit deps — query and tag are fixed per section
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { books, loading };
}
