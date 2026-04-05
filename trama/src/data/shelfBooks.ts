export interface ShelfBook {
  id: number;
  cover: string;
  title: string;
  author: string;
  shelf: string;
}


const OL = 'https://covers.openlibrary.org/b/isbn';

export const shelfBooks: ShelfBook[] = [
  /* ── Leyendo ── */
  { id:  1, cover: `${OL}/9780451166890-L.jpg`,   title: 'Los pilares de la tierra',           author: 'Ken Follett',              shelf: 'Leyendo' },
  { id:  2, cover: `${OL}/9780441013593-L.jpg`,   title: 'Dune',                               author: 'Frank Herbert',             shelf: 'Leyendo' },
  { id:  3, cover: `${OL}/9780062316110-L.jpg`,   title: 'Sapiens',                            author: 'Yuval Noah Harari',         shelf: 'Leyendo' },
  { id:  4, cover: `${OL}/9780060850524-L.jpg`,   title: 'Un mundo feliz',                     author: 'Aldous Huxley',             shelf: 'Leyendo' },
  { id:  5, cover: `${OL}/9780141441146-L.jpg`,   title: 'Jane Eyre',                          author: 'Charlotte Brontë',          shelf: 'Leyendo' },
  { id:  6, cover: `${OL}/9780143107637-L.jpg`,   title: 'Crimen y castigo',                   author: 'Fiódor Dostoyevski',        shelf: 'Leyendo' },
  { id: 25, cover: `${OL}/9780812550702-L.jpg`,   title: 'El juego de Ender',                  author: 'Orson Scott Card',          shelf: 'Leyendo' },
  { id: 26, cover: `${OL}/9780553293357-L.jpg`,   title: 'Fundación',                          author: 'Isaac Asimov',              shelf: 'Leyendo' },
  { id: 27, cover: `${OL}/9780061935466-L.jpg`,   title: 'Matar a un ruiseñor',                author: 'Harper Lee',                shelf: 'Leyendo' },
  { id: 28, cover: `${OL}/9780439023481-L.jpg`,   title: 'Los juegos del hambre',              author: 'Suzanne Collins',           shelf: 'Leyendo' },
  { id: 29, cover: `${OL}/9780141439570-L.jpg`,   title: 'El retrato de Dorian Gray',          author: 'Oscar Wilde',               shelf: 'Leyendo' },
  { id: 30, cover: `${OL}/9780156329350-L.jpg`,   title: 'Flores para Algernon',               author: 'Daniel Keyes',              shelf: 'Leyendo' },
  { id: 31, cover: `${OL}/9780553208849-L.jpg`,   title: 'Siddhartha',                         author: 'Hermann Hesse',             shelf: 'Leyendo' },
  { id: 32, cover: `${OL}/9780140386326-L.jpg`,   title: 'La historia interminable',           author: 'Michael Ende',              shelf: 'Leyendo' },
  /* ── Acabado ── */
  { id:  7, cover: `${OL}/9780547928227-L.jpg`,   title: 'El hobbit',                          author: 'J.R.R. Tolkien',            shelf: 'Acabado' },
  { id:  8, cover: `${OL}/9780439708180-L.jpg`,   title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling',              shelf: 'Acabado' },
  { id:  9, cover: `${OL}/9780544003415-L.jpg`,   title: 'El señor de los anillos',            author: 'J.R.R. Tolkien',            shelf: 'Acabado' },
  { id: 10, cover: `${OL}/9780743273565-L.jpg`,   title: 'El gran Gatsby',                     author: 'F. Scott Fitzgerald',       shelf: 'Acabado' },
  { id: 11, cover: `${OL}/9780141439518-L.jpg`,   title: 'Orgullo y prejuicio',                author: 'Jane Austen',               shelf: 'Acabado' },
  { id: 12, cover: `${OL}/9780062315007-L.jpg`,   title: 'El alquimista',                      author: 'Paulo Coelho',              shelf: 'Acabado' },
  { id: 33, cover: `${OL}/9781451673319-L.jpg`,   title: 'Fahrenheit 451',                     author: 'Ray Bradbury',              shelf: 'Acabado' },
  { id: 34, cover: `${OL}/9780385504201-L.jpg`,   title: 'El código Da Vinci',                 author: 'Dan Brown',                 shelf: 'Acabado' },
  { id: 35, cover: `${OL}/9780141439556-L.jpg`,   title: 'Cumbres borrascosas',                author: 'Emily Brontë',              shelf: 'Acabado' },
  { id: 36, cover: `${OL}/9780393312836-L.jpg`,   title: 'La naranja mecánica',                author: 'Anthony Burgess',           shelf: 'Acabado' },
  { id: 37, cover: `${OL}/9781400033416-L.jpg`,   title: 'Beloved',                            author: 'Toni Morrison',             shelf: 'Acabado' },
  { id: 38, cover: `${OL}/9780684801223-L.jpg`,   title: 'El viejo y el mar',                  author: 'Ernest Hemingway',          shelf: 'Acabado' },
  { id: 39, cover: `${OL}/9780451419439-L.jpg`,   title: 'Los miserables',                     author: 'Victor Hugo',               shelf: 'Acabado' },
  { id: 40, cover: `${OL}/9780143035008-L.jpg`,   title: 'Anna Karénina',                      author: 'León Tolstói',              shelf: 'Acabado' },
  /* ── Quiero leer ── */
  { id: 13, cover: `${OL}/9780451524935-L.jpg`,   title: '1984',                               author: 'George Orwell',             shelf: 'Quiero leer' },
  { id: 14, cover: `${OL}/9780060883287-L.jpg`,   title: 'Cien años de soledad',               author: 'Gabriel García Márquez',    shelf: 'Quiero leer' },
  { id: 15, cover: `${OL}/9780316769174-L.jpg`,   title: 'El guardián entre el centeno',       author: 'J.D. Salinger',             shelf: 'Quiero leer' },
  { id: 16, cover: `${OL}/9780553213690-L.jpg`,   title: 'La metamorfosis',                    author: 'Franz Kafka',               shelf: 'Quiero leer' },
  { id: 17, cover: `${OL}/9780008117498-L.jpg`,   title: 'La sombra del viento',               author: 'Carlos Ruiz Zafón',         shelf: 'Quiero leer' },
  { id: 18, cover: `${OL}/9780060934347-L.jpg`,   title: 'Don Quijote de la Mancha',           author: 'Miguel de Cervantes',       shelf: 'Quiero leer' },
  { id: 41, cover: `${OL}/9780140449266-L.jpg`,   title: 'El conde de Montecristo',            author: 'Alexandre Dumas',           shelf: 'Quiero leer' },
  { id: 42, cover: `${OL}/9780142437247-L.jpg`,   title: 'Moby Dick',                          author: 'Herman Melville',           shelf: 'Quiero leer' },
  { id: 43, cover: `${OL}/9781400079988-L.jpg`,   title: 'Guerra y paz',                       author: 'León Tolstói',              shelf: 'Quiero leer' },
  { id: 44, cover: `${OL}/9780805209990-L.jpg`,   title: 'El proceso',                         author: 'Franz Kafka',               shelf: 'Quiero leer' },
  { id: 45, cover: `${OL}/9780679720201-L.jpg`,   title: 'Lolita',                             author: 'Vladimir Nabokov',          shelf: 'Quiero leer' },
  { id: 46, cover: `${OL}/9780141439549-L.jpg`,   title: 'Middlemarch',                        author: 'George Eliot',              shelf: 'Quiero leer' },
  { id: 47, cover: `${OL}/9780375724732-L.jpg`,   title: 'El señor de las moscas',             author: 'William Golding',           shelf: 'Quiero leer' },
  { id: 48, cover: `${OL}/9780062316097-L.jpg`,   title: 'Breve historia del tiempo',          author: 'Stephen Hawking',           shelf: 'Quiero leer' },
  /* ── No acabado ── */
  { id: 19, cover: `${OL}/9780156012195-L.jpg`,   title: 'El principito',                      author: 'Antoine de Saint-Exupéry',  shelf: 'No acabado' },
  { id: 20, cover: `${OL}/9781594633669-L.jpg`,   title: 'La chica del tren',                  author: 'Paula Hawkins',             shelf: 'No acabado' },
  { id: 21, cover: `${OL}/9780756407124-L.jpg`,   title: 'El temor de un hombre sabio',        author: 'Patrick Rothfuss',          shelf: 'No acabado' },
  { id: 22, cover: `${OL}/9780385490818-L.jpg`,   title: 'El túnel',                           author: 'Ernesto Sabato',            shelf: 'No acabado' },
  { id: 23, cover: `${OL}/9788408163435-L.jpg`,   title: 'La catedral del mar',                author: 'Ildefonso Falcones',        shelf: 'No acabado' },
  { id: 24, cover: `${OL}/9780307474278-L.jpg`,   title: 'Crónica de una muerte anunciada',    author: 'Gabriel García Márquez',    shelf: 'No acabado' },
  { id: 49, cover: `${OL}/9780143108078-L.jpg`,   title: 'El maestro y Margarita',             author: 'Mijaíl Bulgákov',           shelf: 'No acabado' },
  { id: 50, cover: `${OL}/9788437604183-L.jpg`,   title: 'Pedro Páramo',                       author: 'Juan Rulfo',                shelf: 'No acabado' },
  { id: 51, cover: `${OL}/9780553383805-L.jpg`,   title: 'La casa de los espíritus',           author: 'Isabel Allende',            shelf: 'No acabado' },
  { id: 52, cover: `${OL}/9780385420174-L.jpg`,   title: 'Como agua para chocolate',           author: 'Laura Esquivel',            shelf: 'No acabado' },
  { id: 53, cover: `${OL}/9780802130303-L.jpg`,   title: 'Ficciones',                          author: 'Jorge Luis Borges',         shelf: 'No acabado' },
  { id: 54, cover: `${OL}/9780375725845-L.jpg`,   title: 'El perfume',                         author: 'Patrick Süskind',           shelf: 'No acabado' },
  { id: 55, cover: `${OL}/9780060932138-L.jpg`,   title: 'La insoportable levedad del ser',    author: 'Milan Kundera',             shelf: 'No acabado' },
  { id: 56, cover: `${OL}/9780151446476-L.jpg`,   title: 'El nombre de la rosa',               author: 'Umberto Eco',               shelf: 'No acabado' },
];
