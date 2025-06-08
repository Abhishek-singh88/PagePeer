// components/BookCard.tsx
'use client';

import { useState } from 'react';

export default function BookCard({ book, onDelete }: { book: any; onDelete: (id: string) => void }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/delete-book?id=${book._id}`, { method: 'DELETE' });
    if (res.ok) {
      onDelete(book._id);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 2px 5px rgb(0 0 0 / 0.1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* ❌ Delete Button */}
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
        }}
        title="Delete"
      >
        ×
      </button>

      {book.image ? (
        <img
          src={book.image}
          alt={book.title}
          style={{ width: '150px', borderRadius: '5px', marginBottom: '1rem' }}
        />
      ) : (
        <div
          style={{
            width: '150px',
            height: '200px',
            backgroundColor: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            borderRadius: '5px',
            marginBottom: '1rem',
          }}
        >
          No Image
        </div>
      )}

      <h3 style={{ marginBottom: '0.5rem' }}>{book.title}</h3>
      <p style={{ marginBottom: '1rem', color: '#555', fontSize: '0.9rem' }}>
        Author: {Array.isArray(book.authors) ? book.authors[0] : book.author || 'Unknown Author'}
      </p>

      {book.previewLink ? (
        <a
          href={book.previewLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          Read Book
        </a>
      ) : (
        <span style={{ color: '#999', fontSize: '0.9rem' }}>No reading link available</span>
      )}
    </div>
  );
}
