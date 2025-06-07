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
    previewLink?: string;
  };
}

export default function ExploreLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from Google Books API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=blockchain&maxResults=20&orderBy=relevance'
        );
        const data = await res.json();
        setBooks(data.items || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Add book to library (MongoDB)
  async function addToLibrary(book: Book) {
  try {
    const response = await fetch('/api/add-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || [],
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        infoLink: book.volumeInfo.previewLink || ''
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Book added to your library');
    } else {
      alert('Failed to add book');
    }
  } catch (error) {
    alert('Something went wrong');
  }
}

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Explore Library</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg p-4 shadow-md flex flex-col"
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full h-60 object-contain mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">
                {book.volumeInfo.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {book.volumeInfo.authors?.[0] || 'Unknown Author'}
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => addToLibrary(book)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add to Library
                </button>
                {book.volumeInfo.previewLink && (
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    Read Book
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
