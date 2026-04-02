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
  return `${COVERS_URL}/id/${id}-${size}.jpg`;
}

export function coverByIsbn(isbn: string, size: 'S' | 'M' | 'L' = 'L'): string {
  return `${COVERS_URL}/isbn/${isbn}-${size}.jpg`;
}

export function docCover(doc: OLSearchDoc, size: 'S' | 'M' | 'L' = 'L'): string {
  if (doc.cover_i) return coverById(doc.cover_i, size);
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
