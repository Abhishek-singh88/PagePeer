import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'libraryApp';

export async function GET() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('userNFTs');

    const nfts = await collection.find({}).toArray();

    return NextResponse.json(nfts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  } finally {
    await client.close();
  }
}
