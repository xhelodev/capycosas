/**
 * Seed and fallback product catalog.
 *
 * Used when MONGODB_URI is unset (local dev, CI builds) and as the source
 * for scripts/seed-products.mjs. Runtime product listing comes from MongoDB
 * via getProducts() in src/lib/products.ts when MONGODB_URI is configured.
 */
export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  slug: string;
  active: boolean;
  order: number;
}

export const seedProducts: Product[] = [
  {
    name: "Snack de pasto y fruta",
    description:
      "Bocados secos de pasto y fruta, para el picoteo entre una siesta y la otra.",
    price: 18,
    image: "/images/snack.jpg",
    alt: "Bowl con trozos de fruta seca, un snack de pasto y fruta para capibaras.",
    slug: "snack-de-pasto-y-fruta",
    active: true,
    order: 1,
  },
  {
    name: "Cama flotante",
    description: "Un círculo blando para flotar y recostarse sobre el agua.",
    price: 64,
    image: "/images/cama.jpg",
    alt: "Cama circular crema flotando en agua oscura de estanque.",
    slug: "cama-flotante",
    active: true,
    order: 2,
  },
  {
    name: "Cepillo suave",
    description:
      "Cerdas blandas para el pelaje grueso, sin tironear ni apurar la tarde.",
    price: 22,
    image: "/images/cepillo.jpg",
    alt: "Cepillo de madera con cerdas suaves, sobre tela clara.",
    slug: "cepillo-suave",
    active: true,
    order: 3,
  },
  {
    name: "Juguete de enriquecimiento",
    description:
      "Un puzzle de madera para buscar, olfatear y pensar un rato largo.",
    price: 36,
    image: "/images/juguete.jpg",
    alt: "Juguete de madera para forrajeo, con huecos y pasto para buscar.",
    slug: "juguete-de-enriquecimiento",
    active: true,
    order: 4,
  },
  {
    name: "Pileta chica",
    description: "Agua baja y borde bajo, para la hora en que aprieta el calor.",
    price: 48,
    image: "/images/pileta.jpg",
    alt: "Pileta chica de borde bajo en un patio de terracota, con un capibara descansando en el agua.",
    slug: "pileta-chica",
    active: true,
    order: 5,
  },
  {
    name: "Vitamina para roedores grandes",
    description:
      "Un refuerzo simple. No reemplaza al veterinario ni a un buen pastizal.",
    price: 28,
    image: "/images/vitamina.jpg",
    alt: "Frasco ámbar de vitamina para roedores grandes, sin marca comercial.",
    slug: "vitamina-para-roedores-grandes",
    active: true,
    order: 6,
  },
];

/** @deprecated Use seedProducts — kept for seed script imports. */
export const products = seedProducts;
