'use client';

import { useState } from 'react';
import BookCard from './BookCard';
import { Book } from './page';

export default function ClientLibrary({ books }: { books: Book[] }) {
  const [bookList, setBookList] = useState<Book[]>(books ?? []);

  const handleDelete = (id: string) => {
    setBookList((prev) => prev.filter((book) => book._id !== id));
  };

  if (!bookList || bookList.length === 0) {
    return (
      <div className="text-center mt-12 text-xl text-neutral-300">
        Your library is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-center font-bold text-3xl text-white mb-10">
        Your Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {bookList.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
