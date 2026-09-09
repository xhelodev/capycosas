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
- `scripts/compress-images.mjs` — comprime JPEGs de `capycosas/images/` a `public/images/` (menos de 400KB cada uno)

Para reemplazar fotos, copiá los originales a `capycosas/images/` y corré:

```bash
npm run compress:images
```
