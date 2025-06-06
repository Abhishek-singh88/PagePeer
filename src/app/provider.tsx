'use client';

import { CivicAuthProvider } from '@civic/auth-web3/react';
import { ReactNode, useEffect, useState } from 'react';

export function CivicAuthProviderWrapper({ children }: { children: ReactNode }) {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    origin && (
      <CivicAuthProvider clientId={process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || ''}>
        {children}
      </CivicAuthProvider>
    )
  );
}
