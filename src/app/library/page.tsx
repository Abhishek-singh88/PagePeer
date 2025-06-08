export const dynamic = 'force-dynamic'; 

import { MongoClient } from 'mongodb';
import ClientLibrary from './ClientLibrary';

const uri = process.env.MONGODB_URI!;
const dbName = 'libraryApp';

export interface Book {
  _id: string;
  title: string;
  authors: string[];
  image?: string;
  infoLink?: string;
}

async function getUserBooks(): Promise<Book[]> {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('userBooks');

    const books = await collection
      .find({ title: { $exists: true, $ne: '' } })
      .toArray();

    return books.map((book) => ({
      _id: book._id.toString(),
      title: book.title,
      authors: book.authors || [],
      image: book.image || '',
      infoLink: book.infoLink || '',
    }));
  } finally {
    await client.close();
  }
}

export default async function LibraryPage() {
  const books = await getUserBooks();
  return <ClientLibrary books={books} />;
}
