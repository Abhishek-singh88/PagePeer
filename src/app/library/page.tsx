'use client';

import { useUser } from '@civic/auth-web3/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LibraryPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useUser() as any;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">📚 Welcome to the e-Library</h1>
      <p className="text-lg">Hello {user?.email}, here are your books:</p>

      {/* Replace with dynamic book data later */}
      <ul className="mt-6 space-y-2">
        <li className="bg-gray-100 p-3 rounded shadow">📘 Blockchain Basics</li>
        <li className="bg-gray-100 p-3 rounded shadow">📕 Decentralized Apps</li>
        <li className="bg-gray-100 p-3 rounded shadow">📗 Solana vs Ethereum</li>
      </ul>
    </main>
  );
}
