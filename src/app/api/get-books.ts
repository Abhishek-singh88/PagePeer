import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '.././lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { email } = req.query;

  if (!email) return res.status(400).json({ success: false, message: 'Missing email' });

  try {
    const { db } = await connectToDatabase();
    const books = await db
      .collection('user_books')
      .find({ userEmail: email })
      .toArray();

    res.status(200).json({
      success: true,
      books: books.map(({ book }) => book),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
