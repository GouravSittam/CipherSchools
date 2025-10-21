import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then((connectedClient) => {
      console.log('🚀 MongoDB client connected successfully');
      return connectedClient;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((connectedClient) => {
    console.log('🚀 MongoDB client connected successfully');
    return connectedClient;
  });
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME || 'cipherstudio');
  
  // Log successful connection
  console.log('✅ Connected to MongoDB database:', db.databaseName);
  
  return db;
}
