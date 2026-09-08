export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

export const products: Product[] = [
  {
    name: "Snack de pasto y fruta",
    description:
      "Bocados secos de pasto y fruta, para el picoteo entre una siesta y la otra.",
    price: 18,
    image: "/images/snack.jpg",
    alt: "Bowl con trozos de fruta seca, un snack de pasto y fruta para capibaras.",
  },
  {
    name: "Cama flotante",
    description: "Un círculo blando para flotar y recostarse sobre el agua.",
    price: 64,
    image: "/images/cama.jpg",
    alt: "Cama circular blanca flotando en agua clara.",
  },
  {
    name: "Cepillo suave",
    description:
      "Cerdas blandas para el pelaje grueso, sin tironear ni apurar la tarde.",
    price: 22,
    image: "/images/cepillo.jpg",
    alt: "Cepillo de madera con cerdas suaves, sobre tela clara.",
  },
  {
    name: "Juguete de enriquecimiento",
    description:
      "Un puzzle de madera para buscar, olfatear y pensar un rato largo.",
    price: 36,
    image: "/images/juguete.jpg",
    alt: "Juguete de madera para forrajeo, con huecos y pasto para buscar.",
  },
  {
    name: "Pileta chica",
    description: "Agua baja y borde bajo, para la hora en que aprieta el calor.",
    price: 48,
    image: "/images/pileta.jpg",
    alt: "Pileta chica con agua en un patio cálido, lista para una siesta húmeda.",
  },
  {
    name: "Vitamina para roedores grandes",
    description:
      "Un refuerzo simple. No reemplaza al veterinario ni a un buen pastizal.",
    price: 28,
    image: "/images/vitamina.jpg",
    alt: "Frasco ámbar de vitamina para roedores grandes, sin marca comercial.",
  },
];
