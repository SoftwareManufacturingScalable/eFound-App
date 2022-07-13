export interface IBook {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  name_path?: string;
}

export const listBooks: IBook[] = [
  {
    title: "How to Win Friends & Influence People",
    description:
      "El asesoramiento sólido y comprobado de Dale Carnegie ha llevado a innumerables personas a la cima del éxito en sus negocios y vidas personales.Uno de los primeros best sellers de autoayuda, fue publicado por primera vez en 1936 y lleva vendidas 15 millones de copias a nivel mundial.",
    date: " April 23, 2019",
    imageUrl:
      "https://img.yumpu.com/59247564/1/500x640/como-ganar-amigos-e-influenciar-en-las-personas-dale-carnegie.jpg",
    name_path: "Carnegie_Dale_Como_Ganar_Amigos_e_Influi.pdf",
  },
  {
    title: "El exito no llega por casualidad- Dr. Lair ribero",
    description:
      " Una obra que explora las claves del éxito, sustentado en seis pilares que se pueden cultivar y desarrollar.  Ofrece pautas para expandir la capacidad mental y aumentar la capacidad de reacción ante problemas y muchas otras circunstancias.",
    date: " January 25, 2017",
    imageUrl: "https://imagessl4.casadellibro.com/a/l/t7/14/9788417545314.jpg",
    name_path: "El_exito_no_llega_por_casualidad.pdf",
  },
  {
    title: "Piense y hagase rico",
    description:
      "En el libro se nos cuenta la historia de dos caballeros empeñados en hallar la prosperidad. Los problemas que se encuentran, las adversidades  a las que hacen frente, nos sirven de inspiración para no tirar la toalla. Incluso, que caigamos en el pesimismo y en el victimismo.",
    date: " August 10, 2014",
    imageUrl: "https://imagessl3.casadellibro.com/a/l/t7/13/9788497778213.jpg",
    name_path: "Hagaserico.pdf",
  },
  {
    title: "Vendes o vendes",
    description:
      "Como salirte con la tuya en los negocios y en la vida. Uno de los autores mas vendidos de The New York Tmas. Estrella del programa de television Turn Around. Grant Cardone ha escrito una obra maestra. Es oxígeno puro para el actual mundo de las ventas”, John Mappin, fundador de Metropolis Media Group.",
    date: " September 8, 2020",
    imageUrl: "https://imagessl5.casadellibro.com/a/l/t7/75/9786071126375.jpg",
    name_path: "VENDES_O_VENDES.pdf",
  },
  {
    title: "El vendedor mas grande del mundo",
    description:
      "Se presenta aquí la leyenda de Hafid, un camellero de hace dos mil años, y su ardiente deseo de mejorar su humilde condición. A fin de poner a prueba su habilidad en potencia, es enviado a Belén por su señor Pathros, el gran mercader de caravanas, a vender un solo manto. Fracasa y en cambio, en un momento de compasión, regala el manto para abrigar a un bebé recién nacido en una cueva cerca de la posada.",
    date: " December 15, 2017",
    imageUrl: "https://imagessl8.casadellibro.com/a/l/t7/78/9788499083278.jpg",
    name_path: "og_mandino_-_el_vendedor_mas_grande_del_mundo.pdf",
  },
];
