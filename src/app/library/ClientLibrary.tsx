'use client';

import { useState } from 'react';
import BookCard from './BookCard';

export default function ClientLibrary({ books }: { books: any[] }) {
  const [bookList, setBookList] = useState(books);

  const handleDelete = (id: string) => {
    setBookList(prev => prev.filter(book => book._id !== id));
  };

  if (!bookList.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
        Your library is empty.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem' }}>
        Your Library
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}>
        {bookList.map((book) => (
          <BookCard key={book._id.toString()} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
