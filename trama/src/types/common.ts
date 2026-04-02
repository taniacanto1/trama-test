import type { Book } from '../data/books';

export interface NavigateProps {
  onNavigate?: (page: string, book?: Book) => void;
}
