import '@roadmap-ui/tailwind-config/globals.css';
import { source } from '@/app/source';
import { Toaster } from '@roadmap-ui/shadcn-ui/components/ui/sonner';
import { TooltipProvider } from '@roadmap-ui/shadcn-ui/components/ui/tooltip';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { FC, ReactNode } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { baseOptions } from './layout.config';
import 'fumadocs-ui/style.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
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
        <TooltipProvider>
          <RootProvider>
            <DocsLayout tree={source.pageTree} {...baseOptions}>
              {children}
            </DocsLayout>
          </RootProvider>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
      <Analytics />
    </body>
  </html>
);

export default Layout;
