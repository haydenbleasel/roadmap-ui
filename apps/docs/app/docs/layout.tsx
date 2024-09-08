import { source } from '@/app/source';
import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { baseOptions } from '../layout.config';
import 'fumadocs-ui/style.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
