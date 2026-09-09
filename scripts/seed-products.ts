import { MongoClient } from "mongodb";
import { seedProducts } from "../src/data/products.ts";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "capycosas";

if (!uri) {
  console.error("MONGODB_URI is required to seed the database.");
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const collection = client.db(dbName).collection("products");

  for (const product of seedProducts) {
    const result = await collection.updateOne(
      { slug: product.slug },
      { $set: product },
      { upsert: true },
    );

    const action = result.upsertedCount > 0 ? "inserted" : "updated";
    console.log(`${action}: ${product.slug}`);
  }

  console.log(`Seeded ${seedProducts.length} products into ${dbName}.products`);
} catch (error) {
  console.error("Failed to seed products:", error);
  process.exit(1);
} finally {
  await client.close();
}
