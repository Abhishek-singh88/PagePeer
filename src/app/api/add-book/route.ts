import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userEmail, book } = body;

  try {
    const client = await clientPromise;
    const db = client.db('eLibraryDB');
    const collection = db.collection('library');

    await collection.updateOne(
      { userEmail, bookId: book.id },
      { $set: { ...book, addedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
