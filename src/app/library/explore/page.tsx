'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export default function ExploreLibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=blockchain')
      .then((res) => res.json())
      .then((data) => setBooks(data.items || []));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Explore Library</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-md rounded p-4">
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h2 className="text-lg font-semibold">{book.volumeInfo.title}</h2>
            <p className="text-sm text-gray-600">
              {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
            </p>

            <button
              onClick={() => alert('✅ Added to your library')}
              className="mt-3 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Library
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
