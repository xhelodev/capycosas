import { seedProducts, type Product } from "../data/products";
import { getMongoClient, getMongoDbName } from "./db";

let warnedMissingUri = false;

function warnMissingUriOnce(): void {
  if (!warnedMissingUri) {
    console.warn(
      "MONGODB_URI is not set; serving seed products from src/data/products.ts",
    );
    warnedMissingUri = true;
  }
}

function getFallbackProducts(): Product[] {
  return seedProducts
    .filter((product) => product.active)
    .sort(
      (a, b) => a.order - b.order || a.name.localeCompare(b.name, "es"),
    );
}

function mapDocumentToProduct(doc: Record<string, unknown>): Product {
  return {
    name: String(doc.name),
    description: String(doc.description),
    price: Number(doc.price),
    image: String(doc.image),
    alt: String(doc.alt),
    slug: String(doc.slug),
    active: doc.active === undefined ? true : Boolean(doc.active),
    order: doc.order === undefined ? 0 : Number(doc.order),
  };
}

/**
 * Loads active products from MongoDB, or seed data when MONGODB_URI is unset.
 * Server-only — never import this from client islands.
 */
export async function getProducts(): Promise<Product[]> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    warnMissingUriOnce();
    return getFallbackProducts();
  }

  try {
    const client = await getMongoClient();
    const collection = client.db(getMongoDbName()).collection("products");

    const documents = await collection
      .find({
        $or: [{ active: true }, { active: { $exists: false } }],
      })
      .sort({ order: 1, name: 1 })
      .toArray();

    return documents.map((doc) => mapDocumentToProduct(doc));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    throw new Error(`Failed to load products from MongoDB: ${message}`, {
      cause: error,
    });
  }
}
