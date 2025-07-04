'use client';

import Link from 'next/link';
import { useUser } from '@civic/auth-web3/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const navItems = [
  { label: 'Your Books', path: '/library' },
  { label: 'Explore Library', path: '/library/explore' },
  { label: 'My NFTs', path: '/library/nfts' },
  { label: 'Mint Book NFT', path: '/library/mint' },
  { label: 'Account', path: '/library/account' },
];

export default function LibraryLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, signOut } = useUser() as any;
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      setAuthChecked(true);
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center text-xl text-blue-600">
        🔐 Checking authentication...
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="bg-neutral-900 shadow px-6 py-4 flex justify-between items-center border-b border-neutral-800">
        <h1 className="text-xl font-bold">📚 PagePeer</h1>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium hover:underline ${
                pathname === item.path ? 'text-teal-400' : 'text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
