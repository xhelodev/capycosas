import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Configure it in your environment or .env file.",
    );
  }
  return uri;
}

/**
 * Returns a shared MongoClient for serverless invocations.
 * Only call from server-side code (Astro frontmatter, API routes, scripts).
 */
export async function getMongoClient(): Promise<MongoClient> {
  const uri = getMongoUri();

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export function getMongoDbName(): string {
  return process.env.MONGODB_DB ?? "capycosas";
}
