# Capycosas

Sitio de Capycosas — productos para capibaras, no merch para humanos.

## Requisitos

- Node.js 22.12 o superior

## Desarrollo

```bash
npm install
npm run dev
```

Abrí [http://localhost:4321](http://localhost:4321) en el navegador.

## Build

```bash
npm run build
```

El sitio estático queda en `dist/`. Para previsualizarlo:

```bash
npm run preview
```

## Estructura

- `src/pages/` — páginas Astro
- `src/components/` — componentes reutilizables
- `src/data/products.ts` — catálogo de productos
- `public/images/` — fotos del sitio
