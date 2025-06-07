'use client';

import { useUser } from '@civic/auth-web3/react';

export default function MyNFTsPage() {
  const { ethereum, solana } = useUser() as any;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎨 My NFTs</h2>

      <div className="mb-4">
        <p><strong>EVM Wallet:</strong> {ethereum?.address}</p>
        <p><strong>Solana Wallet:</strong> {solana?.address}</p>
      </div>

      <ul className="space-y-2">
        <li className="bg-gray-100 p-3 rounded">🖼 NFT #101 - "Blockchain Book Cover"</li>
        <li className="bg-gray-100 p-3 rounded">🖼 NFT #205 - "Web3 Reader Badge"</li>
      </ul>
    </div>
  );
}
