'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@civic/auth-web3/react';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    description?: string;
  };
};

export default function ExploreLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useUser() as any;

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=blockchain&maxResults=12'
      );
      const data = await res.json();
      setBooks(data.items || []);
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (book: Book) => {
    try {
      const res = await fetch('/api/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user?.email,
          book: {
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors?.[0] || 'Unknown',
            image: book.volumeInfo.imageLinks?.thumbnail || '',
            description: book.volumeInfo.description || '',
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ Book added to your library!');
      } else {
        alert('❌ Failed to add book.');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Something went wrong.');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white shadow rounded p-4">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || '/book-placeholder.png'}
            alt={book.volumeInfo.title}
            className="h-40 w-full object-cover mb-3"
          />
          <h2 className="text-lg font-bold">{book.volumeInfo.title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {book.volumeInfo.authors?.[0] || 'Unknown Author'}
          </p>
          <button
            onClick={() => handleAddBook(book)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Library
          </button>
        </div>
      ))}
    </div>
  );
}
