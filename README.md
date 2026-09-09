# Capycosas

Sitio de Capycosas — productos para capibaras, no merch para humanos.

## Requisitos

- Node.js 22.12 o superior
- MongoDB Atlas (opcional; el sitio funciona sin URI usando productos seed)

## Desarrollo

```bash
npm install
cp .env.example .env
npm run dev
```

Abrí [http://localhost:4321](http://localhost:4321) en el navegador.

### Productos y MongoDB

El catálogo vive en MongoDB Atlas. La conexión es **solo del lado del servidor** (`src/lib/db.ts`, `src/lib/products.ts`); `MONGODB_URI` nunca se expone al cliente.

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | Connection string de Atlas (servidor / scripts) |
| `MONGODB_DB` | Base de datos (default: `capycosas`) |

**Sin `MONGODB_URI` (local, CI o Vercel):** el sitio sirve los productos seed de `src/data/products.ts`.

**Con `MONGODB_URI`:** `getProducts()` lee la colección `products` en Atlas (`active: true` o sin campo `active`), ordenados por `order` y nombre.

#### Poblar la base

Con `MONGODB_URI` en `.env` o en el entorno:

```bash
npm run seed
```

El script hace upsert de los seis productos actuales por `slug`.

#### Vercel

1. Importá el repo en Vercel (el adaptador `@astrojs/vercel` ya está configurado con `output: "server"`).
2. En **Project → Settings → Environment Variables**, agregá:
   - `MONGODB_URI` — connection string de Atlas (Production, Preview y Development según necesites).
   - `MONGODB_DB` — `capycosas` (opcional si usás ese nombre).
3. En Atlas, permití el acceso desde `0.0.0.0/0` o las IPs de Vercel según tu política.
4. Después del deploy, ejecutá `npm run seed` desde tu máquina con la misma URI, o cargá los documentos manualmente.

## Build

```bash
npm run build
```

El build no requiere Atlas: sin `MONGODB_URI` se usan los productos seed en todos los entornos.

Para previsualizar el build local:

```bash
npm run preview
```

## Estructura

- `src/pages/` — páginas Astro
- `src/components/` — componentes reutilizables
- `src/lib/db.ts` — cliente MongoDB (servidor)
- `src/lib/products.ts` — `getProducts()` para el listado
- `src/data/products.ts` — seed y fallback (no es la fuente en runtime con URI)
- `scripts/seed-products.ts` — upsert del catálogo en Atlas
- `public/images/` — fotos del sitio
