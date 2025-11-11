import { MongoClient } from 'mongodb';
import fs from 'fs';

const configPath = new URL('./dbConfig.json', import.meta.url);
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

let db;

export async function connectToDatabase() {
  const client = new MongoClient(config.url);
  await client.connect();
  db = client.db(config.dbName);
  console.log("Connected to MongoDB");
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase() first.");
  }
  return db;
}
