const BASE_URL = 'https://openlibrary.org';
const COVERS_URL = 'https://covers.openlibrary.org/b';

export interface OLSearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  isbn?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  number_of_pages_median?: number;
  ratings_count?: number;
}

export interface OLWork {
  title: string;
  description?: string | { type: string; value: string };
  covers?: number[];
  subjects?: string[];
}

export function coverById(id: number, size: 'S' | 'M' | 'L' = 'L'): string {
  if (id <= 0) return '';
  return `${COVERS_URL}/id/${id}-${size}.jpg`;
}

export function coverByIsbn(isbn: string, size: 'S' | 'M' | 'L' = 'L'): string {
  return `${COVERS_URL}/isbn/${isbn}-${size}.jpg`;
}

export function docCover(doc: OLSearchDoc, size: 'S' | 'M' | 'L' = 'L'): string {
  if (doc.cover_i && doc.cover_i > 0) return coverById(doc.cover_i, size);
  if (doc.isbn?.[0]) return coverByIsbn(doc.isbn[0], size);
  return '';
}

export async function searchBooks(
  query: string,
  limit = 8,
  signal?: AbortSignal,
): Promise<OLSearchDoc[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const res = await fetch(`${BASE_URL}/search.json?${params}`, { signal });
  if (!res.ok) throw new Error(`OL search failed: ${res.status}`);
  const data = await res.json() as { docs?: OLSearchDoc[] };
  return data.docs ?? [];
}

export async function getWork(workKey: string): Promise<OLWork> {
  const res = await fetch(`${BASE_URL}${workKey}.json`);
  if (!res.ok) throw new Error(`OL work failed: ${res.status}`);
  return res.json() as Promise<OLWork>;
}

export function extractSynopsis(work: OLWork): string {
  if (!work.description) return '';
  if (typeof work.description === 'string') return work.description;
  return work.description.value ?? '';
}

/* ── Author ── */

export interface OLAuthorDoc {
  key: string;  // e.g. "OL23919A"
  name: string;
}

export interface OLAuthorWork {
  key: string;  // e.g. "/works/OL123W"
  title: string;
  covers?: number[];
  first_publish_year?: number;
}

export interface WikiSummary {
  extract: string;
  thumbnail?: { source: string };
}

export async function searchAuthor(name: string): Promise<OLAuthorDoc | null> {
  const params = new URLSearchParams({ q: name, limit: '1' });
  const res = await fetch(`${BASE_URL}/search/authors.json?${params}`);
  if (!res.ok) return null;
  const data = await res.json() as { docs?: OLAuthorDoc[] };
  return data.docs?.[0] ?? null;
}

export async function getAuthorWorks(authorKey: string, limit = 10): Promise<OLAuthorWork[]> {
  const res = await fetch(`${BASE_URL}/authors/${authorKey}/works.json?limit=${limit}`);
  if (!res.ok) return [];
  const data = await res.json() as { entries?: OLAuthorWork[] };
  return data.entries ?? [];
}

export async function getWikipediaSummary(name: string): Promise<WikiSummary | null> {
  const title = encodeURIComponent(name.trim().replace(/ /g, '_'));

  const attempt = async (lang: string): Promise<WikiSummary | null> => {
    try {
      const res = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}`);
      if (!res.ok) return null;
      const data = await res.json() as WikiSummary & { type?: string };
      if (data.type === 'disambiguation') return null;
      return data;
    } catch {
      return null;
    }
  };

  return (await attempt('es')) ?? (await attempt('en'));
}
