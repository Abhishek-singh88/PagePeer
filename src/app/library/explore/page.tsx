'use client';

export default function ExploreLibraryPage() {
  const books = [
    { title: 'Intro to Web3', premium: false },
    { title: 'Solana Mastery', premium: true },
    { title: 'Ethereum for Developers', premium: true },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Explore Library</h2>
      <ul className="space-y-4">
        {books.map((book, index) => (
          <li key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>{book.title}</span>
            <button className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">
              {book.premium ? 'Premium' : 'Add to Library'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
