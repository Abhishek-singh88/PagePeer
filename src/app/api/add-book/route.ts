import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // this contains all book details now
    const client = await clientPromise;
    const db = client.db('libraryApp');
    const collection = db.collection('userBooks');

    const result = await collection.insertOne(body);
    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
