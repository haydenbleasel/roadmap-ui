import '@repo/tailwind-config/globals.css';
import { Toaster } from '@repo/shadcn-ui/components/ui/sonner';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import { Navbar } from '../../docs/app/components/navbar';
import { ThemeProvider } from './components/theme-provider';

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
        <ThemeProvider>
          <Navbar />
          <RootProvider>{children}</RootProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
