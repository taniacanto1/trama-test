const BASE = 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books';

const SYNOPSIS = {
  nombreViento: `En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario: Kvothe, músico, mendigo, ladrón, estudiante, mago, héroe y asesino.\n\nAhora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de Tarbean y su etapa como estudiante en la Universidad.`,
  cienAnios: `En el pueblo de Macondo, fundado por José Arcadio Buendía, se narra la historia de la familia Buendía a lo largo de siete generaciones. Una obra cumbre del realismo mágico que mezcla lo cotidiano con lo extraordinario, la historia y el mito, la pasión y el olvido.\n\nPremio Nobel de Literatura, Cien años de soledad es considerada la novela más importante de la lengua castellana del siglo XX.`,
  hobbit: `Bilbo Bolsón lleva una vida tranquila en su hobbit-hole hasta que el mago Gandalf y trece enanos irrumpen en su puerta para arrastrarlo a una aventura épica: recuperar el tesoro robado por el terrible dragón Smaug en la Montaña Solitaria.\n\nEn el camino, Bilbo encontrará criaturas peligrosas, resolverá acertijos y descubrirá en sí mismo un valor que jamás habría imaginado.`,
  unAmor: `Nat, traductora de mediana edad, decide instalarse en La Escapa, un pueblo rural y casi deshabitado. Tiene un encargo simple: cuidar de un perro. Pero ese lugar y sus habitantes la transformarán de maneras que jamás habría imaginado.\n\nUna novela sobre el deseo, la soledad y los vínculos que nos definen, escrita con la precisión y la intensidad que caracterizan a Sara Mesa.`,
  janeEyre: `La huérfana Jane Eyre narra su propia historia: de una infancia marcada por la crueldad en casa de sus tíos a su etapa como institutriz en la misteriosa mansión de Thornfield Hall, donde conoce al sombrío y apasionado señor Rochester.\n\nUna historia de amor, independencia y principios morales que sigue siendo, dos siglos después de su publicación, una de las novelas más leídas y admiradas de la literatura universal.`,
  cometasCielo: `Amir y Hassan crecen juntos en Kabul hasta que un acontecimiento los separa para siempre. Años después, ya adulto y refugiado en América, Amir regresa a un Afganistán devastado para redimirse de la traición que destruyó su amistad.\n\nUna poderosa historia sobre la culpa, el perdón y la búsqueda de la redención, ambientada en los convulsos años de la historia afgana.`,
  juegoEnder: `Andrew "Ender" Wiggin es reclutado por la Flota Internacional para entrenar en una estación espacial junto a los niños más brillantes del mundo. Sometido a simulacros de combate cada vez más extremos, Ender ignora que el destino de la humanidad ante una invasión alienígena depende de él.\n\nUna reflexión magistral sobre la guerra, la infancia y el peso de la genialidad.`,
};

export const tendencias = [
  { id: 1,  cover: `${BASE}/1270352123i/186074.jpg`,  tag: 'Fantasía',        title: 'El nombre del viento', author: 'Patrick Rothfuss',      rating: 4.8, reviews: '2.4k', rank: 1, isbn: '978-84-9800-296-2', synopsis: SYNOPSIS.nombreViento },
  { id: 2,  cover: `${BASE}/1554292235i/40483.jpg`,   tag: 'Realismo mágico', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.7, reviews: '1.8k', rank: 2, isbn: '978-84-397-0228-5', synopsis: SYNOPSIS.cienAnios },
  { id: 3,  cover: `${BASE}/1546071216i/5907.jpg`,    tag: 'Fantasía',        title: 'El hobbit',            author: 'J.R.R. Tolkien',        rating: 4.6, reviews: '3.1k', rank: 3, isbn: '978-84-450-7179-3', synopsis: SYNOPSIS.hobbit },
];

export const porqueHasLeido = [
  { id: 4,  cover: `${BASE}/1594618899i/54304115.jpg`, tag: 'Narrativa', title: 'Un amor',             author: 'Sara Mesa',        rating: 4.2, reviews: '890',  isbn: '978-84-339-9887-2', synopsis: SYNOPSIS.unAmor },
  { id: 5,  cover: `${BASE}/1325861918i/10210.jpg`,    tag: 'Clásico',   title: 'Jane Eyre',           author: 'Charlotte Brontë', rating: 4.5, reviews: '2.1k', isbn: '978-84-376-0494-7', synopsis: SYNOPSIS.janeEyre },
  { id: 6,  cover: `${BASE}/1388180826i/968.jpg`,      tag: 'Narrativa', title: 'Cometas en el cielo', author: 'Khaled Hosseini',  rating: 4.4, reviews: '1.5k', isbn: '978-84-9838-067-4', synopsis: SYNOPSIS.cometasCielo },
];

export const destacadosFantasia = [
  { id: 7,  cover: `${BASE}/1186074498i/375802.jpg`,  tag: 'Sci-fi',   title: 'El juego de Ender',   author: 'Orson Scott Card',  rating: 4.3, reviews: '1.9k', isbn: '978-84-450-7288-2', synopsis: SYNOPSIS.juegoEnder },
  { id: 8,  cover: `${BASE}/1270352123i/186074.jpg`,  tag: 'Fantasía', title: 'El nombre del viento', author: 'Patrick Rothfuss',  rating: 4.8, reviews: '2.4k', isbn: '978-84-9800-296-2', synopsis: SYNOPSIS.nombreViento },
  { id: 9,  cover: `${BASE}/1546071216i/5907.jpg`,    tag: 'Fantasía', title: 'El hobbit',            author: 'J.R.R. Tolkien',   rating: 4.6, reviews: '3.1k', isbn: '978-84-450-7179-3', synopsis: SYNOPSIS.hobbit },
];

export const ultimosLanzamientos = [
  { id: 10, cover: `${BASE}/1554292235i/40483.jpg`,   tag: 'Realismo mágico', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.7, reviews: '1.8k', isbn: '978-84-397-0228-5', synopsis: SYNOPSIS.cienAnios },
  { id: 11, cover: `${BASE}/1325861918i/10210.jpg`,   tag: 'Clásico',         title: 'Jane Eyre',            author: 'Charlotte Brontë',      rating: 4.5, reviews: '2.1k', isbn: '978-84-376-0494-7', synopsis: SYNOPSIS.janeEyre },
  { id: 12, cover: `${BASE}/1388180826i/968.jpg`,     tag: 'Narrativa',       title: 'Cometas en el cielo',  author: 'Khaled Hosseini',       rating: 4.4, reviews: '1.5k', isbn: '978-84-9838-067-4', synopsis: SYNOPSIS.cometasCielo },
];

export const masHistorias = [
  { id: 13, cover: `${BASE}/1186074498i/375802.jpg`,   tag: 'Sci-fi',    title: 'El juego de Ender', author: 'Orson Scott Card', rating: 4.3, reviews: '1.9k', isbn: '978-84-450-7288-2', synopsis: SYNOPSIS.juegoEnder },
  { id: 14, cover: `${BASE}/1594618899i/54304115.jpg`, tag: 'Narrativa', title: 'Un amor',           author: 'Sara Mesa',        rating: 4.2, reviews: '890',  isbn: '978-84-339-9887-2', synopsis: SYNOPSIS.unAmor },
  { id: 15, cover: `${BASE}/1546071216i/5907.jpg`,     tag: 'Fantasía',  title: 'El hobbit',         author: 'J.R.R. Tolkien',  rating: 4.6, reviews: '3.1k', isbn: '978-84-450-7179-3', synopsis: SYNOPSIS.hobbit },
];

export const mejorValorados = [
  { id: 16, cover: `${BASE}/1270352123i/186074.jpg`,  tag: 'Fantasía',        title: 'El nombre del viento', author: 'Patrick Rothfuss',      rating: 4.8, reviews: '2.4k', isbn: '978-84-9800-296-2', synopsis: SYNOPSIS.nombreViento },
  { id: 17, cover: `${BASE}/1554292235i/40483.jpg`,   tag: 'Realismo mágico', title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.7, reviews: '1.8k', isbn: '978-84-397-0228-5', synopsis: SYNOPSIS.cienAnios },
  { id: 18, cover: `${BASE}/1325861918i/10210.jpg`,   tag: 'Clásico',         title: 'Jane Eyre',            author: 'Charlotte Brontë',      rating: 4.5, reviews: '2.1k', isbn: '978-84-376-0494-7', synopsis: SYNOPSIS.janeEyre },
];
