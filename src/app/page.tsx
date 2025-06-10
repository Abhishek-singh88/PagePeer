'use client';

import { useUser } from '@civic/auth-web3/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const userContext = useUser() as any;
  const { user, isAuthenticated, signIn } = userContext;

  // Redirect to /library after authentication
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/library');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      if (signIn) {
        await signIn();
        // No need to redirect here; useEffect will handle it
      } else {
        console.error('signIn method not found');
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">PagePeer</h1>

      {isAuthenticated ? (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">👋 Welcome {user?.email}</p>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login/Sign Up
        </button>
      )}
    </main>
  );
}
