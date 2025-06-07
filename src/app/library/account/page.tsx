'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@civic/auth-web3/react';
import { JsonRpcProvider } from 'ethers';
import { formatEther } from 'ethers';

export default function AccountPage() {
  const { user, ethereum, solana } = useUser() as any;
  const [evmBalance, setEvmBalance] = useState<string | null>(null);

 useEffect(() => {
  const fetchBalance = async () => {
    if (ethereum?.address) {
      try {
        const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_RPC!); // or any other EVM-compatible RPC
        const balance = await provider.getBalance(ethereum.address);
        setEvmBalance(formatEther(balance));
      } catch (err) {
        console.error('Error fetching EVM balance:', err);
      }
    }
  };

  fetchBalance();
}, [ethereum?.address]);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👤 Account Details</h2>
      <div className="space-y-3 text-sm bg-white rounded p-4 shadow">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>EVM Address:</strong> {ethereum?.address || 'N/A'}</p>
        <p><strong>EVM Balance:</strong> {evmBalance ? `${evmBalance} ETH` : 'Loading...'}</p>
        <p><strong>Solana Address:</strong> {solana?.address || 'N/A'}</p>
      </div>
    </div>
  );
}
