'use client';

import { useState } from 'react';

export default function MintBookNFTPage() {
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    // TODO: Connect with contract using ethers.js
    setTimeout(() => {
      setMinted(true);
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mint Book NFT</h2>
      <p className="mb-4">Mint a premium eBook NFT to your wallet.</p>
      
      {!minted ? (
        <button onClick={handleMint} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Mint NFT
        </button>
      ) : (
        <p className="text-green-600 font-semibold">✅ NFT Minted to your wallet!</p>
      )}
    </div>
  );
}
