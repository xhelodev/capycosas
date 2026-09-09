import { seedProducts, type Product } from "../data/products";
import { getMongoClient, getMongoDbName } from "./db";

function isDeployedProduction(): boolean {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
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
    if (isDeployedProduction()) {
      throw new Error(
        "MONGODB_URI is required in production. Set it in your Vercel project environment variables.",
      );
    }
    return getFallbackProducts();
  }

  const client = await getMongoClient();
  const collection = client.db(getMongoDbName()).collection("products");

  const documents = await collection
    .find({
      $or: [{ active: true }, { active: { $exists: false } }],
    })
    .sort({ order: 1, name: 1 })
    .toArray();

  return documents.map((doc) => mapDocumentToProduct(doc));
}
