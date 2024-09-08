import { source } from '@/app/source';
import { DocsLayout } from 'fumadocs-ui/layout';
import type { FC, ReactNode } from 'react';
import { baseOptions } from '../layout.config';
import 'fumadocs-ui/style.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <DocsLayout tree={source.pageTree} {...baseOptions}>
    {children}
  </DocsLayout>
);

export default Layout;
