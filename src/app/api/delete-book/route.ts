// app/api/delete-book/route.ts
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'libraryApp';

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('userBooks');
    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  } finally {
    await client.close();
  }
}
