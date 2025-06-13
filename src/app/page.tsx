'use client';

import { useUser } from '@civic/auth-web3/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from './lib/utils';
import { Spotlight } from './components/ui/Spotlight';
import { ShootingStars } from './components/ui/shooting-stars';
import { StarsBackground } from './components/ui/stars-background';

export default function Home() {
  const router = useRouter();
  const userContext = useUser() as any;
  const { user, isAuthenticated, signIn } = userContext;

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/library');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      if (signIn) {
        await signIn();
      } else {
        console.error('signIn method not found');
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
    }
  };

  return (
    <div className="relative flex flex-col h-[80rem] w-full overflow-hidden bg-black/[0.96] antialiased items-center justify-start">
      {/* Stars + ShootingStars Background Layer */}
      <StarsBackground />
      <ShootingStars />

      {/* Spotlight Grid Layer */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none z-0',
          '[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]'
        )}
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 z-0" fill="white" />

      {/* Main Content */}
     
     <main className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-10 md:pt-14 flex flex-col items-center justify-start min-h-screen">
  {/* PagePeer Heading */}
  <h1 className="text-5xl md:text-5xl font-bold text-center leading-tight md:leading-snug bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent mb-6">
  PagePeer
</h1>


  {/* Improved Tagline / Description */}
  <p className="text-center text-neutral-400 text-sm md:text-base max-w-3xl mb-12 text-lg">
    PagePeer is a decentralized e-Library platform revolutionizing how we access, own, and experience digital books. Powered by Web3, it empowers users to explore an expansive collection, mint books as NFTs, and build a secure, censorship-resistant personal library. With seamless Civic Auth and embedded wallet integration, PagePeer makes blockchain-powered learning accessible, secure, and user-friendly.
  </p>

  {/* Login Section */}
  {isAuthenticated ? (
    <div className="text-center space-y-4">
      <p className="text-lg font-semibold text-neutral-300">👋 Welcome {user?.email}</p>
    </div>
  ) : (
    <div className="flex flex-col items-center space-y-2 relative">
  <p className="text-xs text-neutral-500">Click on the below button to explore PagePeer</p>

  <button
    onClick={handleLogin}
    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 relative z-10 cursor-pointer transition-colors duration-200 ease-in-out"> 
    Login / Sign Up
  </button>

  {/* Civic Auth Label – positioned halfway under button */}
  <span className="text-[10px] text-neutral-500 absolute top-full mt-1 left-1/2 translate-x-1/4">
    powered by Civic Auth
  </span>
</div>

  )}
</main>


    </div>
  );
}
