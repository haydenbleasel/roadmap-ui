import '@repo/tailwind-config/globals.css';
import { Toaster } from '@repo/shadcn-ui/components/ui/sonner';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import { Navbar } from '../../docs/app/components/navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        'font-sans antialiased',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
