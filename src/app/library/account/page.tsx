'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@civic/auth-web3/react';
import { JsonRpcProvider } from 'ethers';
import { formatEther } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';

export default function AccountPage() {
  const { user, ethereum, solana } = useUser() as any;
  const [evmBalance, setEvmBalance] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<string | null>(null);

  // Fetch EVM balance
  useEffect(() => {
    const fetchEvmBalance = async () => {
      if (ethereum?.address) {
        try {
          const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_RPC!);
          const balance = await provider.getBalance(ethereum.address);
          setEvmBalance(formatEther(balance));
        } catch (err) {
          console.error('Error fetching EVM balance:', err);
        }
      }
    };

    fetchEvmBalance();
  }, [ethereum?.address]);

  // Fetch Solana balance
  useEffect(() => {
    const fetchSolBalance = async () => {
      if (solana?.address) {
        try {
          const connection = new Connection('https://api.devnet.solana.com');// or devnet
          const publicKey = new PublicKey(solana.address);
          const balance = await connection.getBalance(publicKey);
          setSolBalance((balance / 1e9).toFixed(4)); // Convert lamports to SOL
        } catch (err) {
          console.error('Error fetching Solana balance:', err);
        }
      }
    };

    fetchSolBalance();
  }, [solana?.address]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">👤 Account Details</h2>
      <div className="space-y-3 text-sm bg-dark rounded p-4 shadow ">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>EVM Address:</strong> {ethereum?.address || 'N/A'}</p>
        <p><strong>EVM Balance:</strong> {evmBalance ? `${evmBalance} ETH` : 'Loading...'}</p>
        <p><strong>Solana Address:</strong> {solana?.address || 'N/A'}</p>
        <p><strong>Solana Balance:</strong> {solBalance ? `${solBalance} SOL` : 'Loading...'}</p>
      </div>
    </div>
  );
}
