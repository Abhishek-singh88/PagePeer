'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@civic/auth-web3/react';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  previewLink?: string;
};

export default function UserLibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const { user, isAuthenticated } = useUser() as any;

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.email) return;

      const res = await fetch(`/api/get-books?email=${user.email}`);
      const data = await res.json();

      if (data.success) {
        setBooks(data.books);
      }
    };

    fetchBooks();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Please login to access your library.
      </main>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">
          Your library is empty. Add books from the Explore section.
        </p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="bg-white shadow rounded p-4">
            <img
              src={book.image || '/book-placeholder.png'}
              alt={book.title}
              className="h-40 w-full object-cover mb-3"
            />
            <h2 className="text-lg font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <button
              onClick={() =>
                window.open(`https://www.google.com/search?q=${encodeURIComponent(book.title)}+book+preview`, '_blank')
              }
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              📖 Read Book
            </button>
          </div>
        ))
      )}
    </div>
  );
}
