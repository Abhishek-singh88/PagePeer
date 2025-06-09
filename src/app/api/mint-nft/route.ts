import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'libraryApp';

export async function POST(req: Request) {
  const data = await req.json();
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('userNFTs');

    await collection.insertOne(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to mint NFT' }, { status: 500 });
  } finally {
    await client.close();
  }
}
