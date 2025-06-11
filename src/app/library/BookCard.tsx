'use client';

import { useState } from 'react';
import { Book } from './page';

export default function BookCard({
  book,
  onDelete,
}: {
  book: Book;
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/delete-book?id=${book._id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      onDelete(book._id);
    }
    setLoading(false);
  };

  return (
    <div className="relative bg-neutral-900 rounded-xl shadow-lg p-4 text-center text-white border border-neutral-800 hover:shadow-md transition-shadow duration-300">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm cursor-pointer"
        title="Delete"
      >
        ×
      </button>

      {book.image ? (
        <img
          src={book.image}
          alt={book.title}
          className="w-32 h-auto rounded-md mx-auto mb-4"
        />
      ) : (
        <div className="w-32 h-48 bg-neutral-700 flex items-center justify-center text-neutral-400 rounded-md mx-auto mb-4">
          No Image
        </div>
      )}

      <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
      <p className="text-sm text-neutral-400 mb-4">
        Author: {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
      </p>

      {book.infoLink ? (
        <a
          href={book.infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium"
        >
          Read Book
        </a>
      ) : (
        <span className="text-neutral-500 text-sm">No reading link available</span>
      )}
    </div>
  );
}
