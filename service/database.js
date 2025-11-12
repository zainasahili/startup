import { MongoClient } from 'mongodb';

let db;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'startup';

  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
}

export function getDb() {
  if (!db) throw new Error("Database not initialized. Call connectToDatabase() first.");
  return db;
}
