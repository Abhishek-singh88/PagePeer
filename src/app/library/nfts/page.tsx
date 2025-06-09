'use client';

import { useEffect, useState } from 'react';

interface NFT {
  _id?: string;
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  mintedAt: string;
}

export default function MyNFTsPage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await fetch('/api/get-nfts');
        const data = await res.json();
        setNfts(data);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading your NFTs...</p>;
  }

  if (nfts.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>You have not minted any NFTs yet.</p>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Your Minted NFTs</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {nfts.map(nft => (
          <div key={nft.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={nft.image} alt={nft.title} style={{ width: '10%', borderRadius: '5px', marginBottom: '1rem' }} />
            <h3>{nft.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>By {nft.author}</p>
            <p style={{ fontSize: '0.85rem', color: '#777' }}>{nft.description}</p>
            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
              Minted on: {new Date(nft.mintedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
