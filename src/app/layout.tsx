import './globals.css';
import { ReactNode } from 'react';
import { CivicAuthProviderWrapper } from './provider';

export const metadata = {
  title: 'Decentralized e-Library',
  description: 'Civic Auth Hackathon Project',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CivicAuthProviderWrapper>{children}</CivicAuthProviderWrapper>
      </body>
    </html>
  );
}
