import { MongoClient } from 'mongodb';
import ClientLibrary from './ClientLibrary'; // 👈 new client component

const uri = process.env.MONGODB_URI!;
const dbName = 'libraryApp';

async function getUserBooks() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('userBooks');
    const books = await collection.find({ title: { $exists: true, $ne: "" } }).toArray();
    return books;
  } finally {
    await client.close();
  }
}

export default async function LibraryPage() {
  const books = await getUserBooks();
  return <ClientLibrary books={books} />;
}
