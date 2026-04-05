export interface Book {
  id: number;
  cover: string;
  tag: string;
  title: string;
  author: string;
  rating: number;
  reviews: string;
  rank?: number;
  isbn: string;
  synopsis: string;
  olKey?: string;
  year?: number;
  pages?: number;
}

const BASE = 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books';
const OL   = 'https://covers.openlibrary.org/b/isbn';

const SYNOPSIS = {
  senorAnillos: `Frodo Bolsón hereda el Anillo Único, forjado por el Señor Oscuro Sauron. Para salvar la Tierra Media, deberá emprender un peligroso viaje hasta el Monte del Destino acompañado por una Comunidad de hobbits, elfos, enanos y hombres.\n\nÉpica aventura de amistad, valor y sacrificio considerada la obra cumbre de la fantasía épica moderna.`,
  dune: `En el planeta desértico Arrakis, el joven Paul Atreides debe sobrevivir a la traición que acaba con su familia y convertirse en el líder profetizado por los Fremen. Controlar Arrakis significa controlar la especia, y controlar la especia significa controlar el universo.\n\nUna magistral obra de ciencia ficción que explora el poder, la religión y la ecología.`,
  alquimista: `Santiago, un joven pastor andaluz, sueña con un tesoro escondido junto a las pirámides de Egipto. Guiado por señales y por el alma del mundo, emprende un viaje que le enseñará que el tesoro más valioso está en el propio camino.\n\nUna parábola universal sobre la importancia de seguir los propios sueños.`,
  cienAnios: `En el pueblo de Macondo, fundado por José Arcadio Buendía, se narra la historia de la familia Buendía a lo largo de siete generaciones. Una obra cumbre del realismo mágico que mezcla lo cotidiano con lo extraordinario, la historia y el mito, la pasión y el olvido.\n\nPremio Nobel de Literatura, Cien años de soledad es considerada la novela más importante de la lengua castellana del siglo XX.`,
  hobbit: `Bilbo Bolsón lleva una vida tranquila en su hobbit-hole hasta que el mago Gandalf y trece enanos irrumpen en su puerta para arrastrarlo a una aventura épica: recuperar el tesoro robado por el terrible dragón Smaug en la Montaña Solitaria.\n\nEn el camino, Bilbo encontrará criaturas peligrosas, resolverá acertijos y descubrirá en sí mismo un valor que jamás habría imaginado.`,
  unAmor: `Nat, traductora de mediana edad, decide instalarse en La Escapa, un pueblo rural y casi deshabitado. Tiene un encargo simple: cuidar de un perro. Pero ese lugar y sus habitantes la transformarán de maneras que jamás habría imaginado.\n\nUna novela sobre el deseo, la soledad y los vínculos que nos definen, escrita con la precisión y la intensidad que caracterizan a Sara Mesa.`,
  janeEyre: `La huérfana Jane Eyre narra su propia historia: de una infancia marcada por la crueldad en casa de sus tíos a su etapa como institutriz en la misteriosa mansión de Thornfield Hall, donde conoce al sombrío y apasionado señor Rochester.\n\nUna historia de amor, independencia y principios morales que sigue siendo, dos siglos después de su publicación, una de las novelas más leídas y admiradas de la literatura universal.`,
  cometasCielo: `Amir y Hassan crecen juntos en Kabul hasta que un acontecimiento los separa para siempre. Años después, ya adulto y refugiado en América, Amir regresa a un Afganistán devastado para redimirse de la traición que destruyó su amistad.\n\nUna poderosa historia sobre la culpa, el perdón y la búsqueda de la redención, ambientada en los convulsos años de la historia afgana.`,
  juegoEnder: `Andrew "Ender" Wiggin es reclutado por la Flota Internacional para entrenar en una estación espacial junto a los niños más brillantes del mundo. Sometido a simulacros de combate cada vez más extremos, Ender ignora que el destino de la humanidad ante una invasión alienígena depende de él.\n\nUna reflexión magistral sobre la guerra, la infancia y el peso de la genialidad.`,
};

export const tendencias: Book[] = [
  { id: 1,  cover: `${OL}/9780544003415-L.jpg`,        tag: 'Fantasía',        title: 'El señor de los anillos', author: 'J.R.R. Tolkien',      rating: 4.9, reviews: '5.2k', rank: 1, isbn: '978-0-544-00341-5', synopsis: SYNOPSIS.senorAnillos },
  { id: 2,  cover: `${BASE}/1554292235i/40483.jpg`,   tag: 'Realismo mágico', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.7, reviews: '1.8k', rank: 2, isbn: '978-84-397-0228-5', synopsis: SYNOPSIS.cienAnios },
  { id: 3,  cover: `${BASE}/1546071216i/5907.jpg`,    tag: 'Fantasía',        title: 'El hobbit',            author: 'J.R.R. Tolkien',        rating: 4.6, reviews: '3.1k', rank: 3, isbn: '978-84-450-7179-3', synopsis: SYNOPSIS.hobbit },
];

export const porqueHasLeido: Book[] = [
  { id: 4,  cover: `${BASE}/1594618899i/54304115.jpg`, tag: 'Narrativa', title: 'Un amor',             author: 'Sara Mesa',        rating: 4.2, reviews: '890',  isbn: '978-84-339-9887-2', synopsis: SYNOPSIS.unAmor },
  { id: 5,  cover: `${BASE}/1325861918i/10210.jpg`,    tag: 'Clásico',   title: 'Jane Eyre',           author: 'Charlotte Brontë', rating: 4.5, reviews: '2.1k', isbn: '978-84-376-0494-7', synopsis: SYNOPSIS.janeEyre },
  { id: 6,  cover: `${BASE}/1388180826i/968.jpg`,      tag: 'Narrativa', title: 'Cometas en el cielo', author: 'Khaled Hosseini',  rating: 4.4, reviews: '1.5k', isbn: '978-84-9838-067-4', synopsis: SYNOPSIS.cometasCielo },
];

export const destacadosFantasia: Book[] = [
  { id: 7,  cover: `${BASE}/1186074498i/375802.jpg`,  tag: 'Sci-fi',   title: 'El juego de Ender',   author: 'Orson Scott Card',  rating: 4.3, reviews: '1.9k', isbn: '978-84-450-7288-2', synopsis: SYNOPSIS.juegoEnder },
  { id: 8,  cover: `${OL}/9780441013593-L.jpg`,        tag: 'Sci-fi',   title: 'Dune',                 author: 'Frank Herbert',      rating: 4.6, reviews: '3.8k', isbn: '978-0-441-01359-3', synopsis: SYNOPSIS.dune },
  { id: 9,  cover: `${BASE}/1546071216i/5907.jpg`,    tag: 'Fantasía', title: 'El hobbit',            author: 'J.R.R. Tolkien',   rating: 4.6, reviews: '3.1k', isbn: '978-84-450-7179-3', synopsis: SYNOPSIS.hobbit },
];

export const ultimosLanzamientos: Book[] = [
  { id: 10, cover: `${BASE}/1554292235i/40483.jpg`,   tag: 'Realismo mágico', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.7, reviews: '1.8k', isbn: '978-84-397-0228-5', synopsis: SYNOPSIS.cienAnios },
  { id: 11, cover: `${BASE}/1325861918i/10210.jpg`,   tag: 'Clásico',         title: 'Jane Eyre',            author: 'Charlotte Brontë',      rating: 4.5, reviews: '2.1k', isbn: '978-84-376-0494-7', synopsis: SYNOPSIS.janeEyre },
  { id: 12, cover: `${BASE}/1388180826i/968.jpg`,     tag: 'Narrativa',       title: 'Cometas en el cielo',  author: 'Khaled Hosseini',       rating: 4.4, reviews: '1.5k', isbn: '978-84-9838-067-4', synopsis: SYNOPSIS.cometasCielo },
];

export const masHistorias: Book[] = [
  { id: 13, cover: `${BASE}/1186074498i/375802.jpg`,   tag: 'Sci-fi',    title: 'El juego de Ender', author: 'Orson Scott Card', rating: 4.3, reviews: '1.9k', isbn: '978-84-450-7288-2', synopsis: SYNOPSIS.juegoEnder },
  { id: 14, cover: `${BASE}/1594618899i/54304115.jpg`, tag: 'Narrativa', title: 'Un amor',           author: 'Sara Mesa',        rating: 4.2, reviews: '890',  isbn: '978-84-339-9887-2', synopsis: SYNOPSIS.unAmor },
  { id: 15, cover: `${BASE}/1546071216i/5907.jpg`,     tag: 'Fantasía',  title: 'El hobbit',         author: 'J.R.R. Tolkien',  rating: 4.6, reviews: '3.1k', isbn: '978-84-450-7179-3', synopsis: SYNOPSIS.hobbit },
];

export const mejorValorados: Book[] = [
  { id: 16, cover: `${OL}/9780062315007-L.jpg`,        tag: 'Ficción',         title: 'El alquimista',        author: 'Paulo Coelho',          rating: 4.2, reviews: '4.1k', isbn: '978-0-06-231500-7', synopsis: SYNOPSIS.alquimista },
  { id: 17, cover: `${BASE}/1554292235i/40483.jpg`,   tag: 'Realismo mágico', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.7, reviews: '1.8k', isbn: '978-84-397-0228-5', synopsis: SYNOPSIS.cienAnios },
  { id: 18, cover: `${BASE}/1325861918i/10210.jpg`,   tag: 'Clásico',         title: 'Jane Eyre',            author: 'Charlotte Brontë',      rating: 4.5, reviews: '2.1k', isbn: '978-84-376-0494-7', synopsis: SYNOPSIS.janeEyre },
];
