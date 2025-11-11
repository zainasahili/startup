const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

let db;

async function connectToDatabase() {
  const client = new MongoClient(config.url);
  await client.connect();
  db = client.db(config.dbName);
  console.log("✅ Connected to MongoDB");
}

function getDb() {
  return db;
}

module.exports = { connectToDatabase, getDb };
