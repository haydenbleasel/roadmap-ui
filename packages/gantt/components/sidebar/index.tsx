import type { FC, ReactNode } from 'react';
import { SidebarHeader } from './sidebar-header';

type SidebarProperties = {
  children: ReactNode;
};

export const Sidebar: FC<SidebarProperties> = ({ children }) => (
  <div
    data-roadmap-ui="gantt-sidebar"
    className="sticky left-0 z-30 h-max min-h-full overflow-clip border-border/50 border-r bg-background/90 backdrop-blur-md"
  >
    <SidebarHeader />
    <div className="space-y-4">{children}</div>
  </div>
);
