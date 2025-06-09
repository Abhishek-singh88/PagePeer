'use client';

import { useState } from 'react';
import { dummyBooks } from '@/app/lib/dummyNfts';

export default function MintNFTPage() {
  const [mintingId, setMintingId] = useState<string | null>(null);

  const handleMint = async (book: any) => {
    setMintingId(book.id);

    const res = await fetch('/api/mint-nft', {
      method: 'POST',
      body: JSON.stringify({
        ...book,
        mintedAt: new Date().toISOString()
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await res.json();
    alert(result.success ? 'Minted successfully!' : 'Mint failed');
    setMintingId(null);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Mint Book NFTs</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {dummyBooks.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: '5px', marginBottom: '1rem' }} />
            <h3>{book.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>{book.description}</p>
            <button
              onClick={() => handleMint(book)}
              disabled={mintingId === book.id}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {mintingId === book.id ? 'Minting...' : 'Mint NFT'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
