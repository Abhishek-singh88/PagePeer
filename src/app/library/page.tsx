import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'libraryApp';

async function getUserBooks() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('userBooks');
    const books = await collection.find({ title: { $exists: true, $ne: "" } }).toArray();
    return books;
  } finally {
    await client.close();
  }
}

export default async function LibraryPage() {
  const books = await getUserBooks();

  if (!books || books.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
        Your library is empty.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginBottom: '2rem',
        }}
      >
        Your Library
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {books.map((book) => (
          <div
            key={book._id.toString()}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 5px rgb(0 0 0 / 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Book Cover */}
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                style={{ width: '150px', height: 'auto', borderRadius: '5px', marginBottom: '1rem' }}
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
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                }}
              >
                No Image
              </div>
            )}

            {/* Title */}
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{book.title}</h3>

            {/* Author */}
            <p style={{ margin: '0 0 1rem 0', color: '#555', fontSize: '0.9rem' }}>
              {book.author || 'Unknown Author'}
            </p>

            {/* Read Link */}
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
        ))}
      </div>
    </div>
  );
}
