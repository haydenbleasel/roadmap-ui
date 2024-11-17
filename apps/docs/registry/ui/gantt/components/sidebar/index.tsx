import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { FC, ReactNode } from 'react';
import { SidebarHeader } from './sidebar-header';

type SidebarProperties = {
  children: ReactNode;
  className?: string;
};

export const Sidebar: FC<SidebarProperties> = ({ children, className }) => (
  <div
    data-roadmap-ui="gantt-sidebar"
    className={cn(
      'sticky left-0 z-30 h-max min-h-full overflow-clip border-border/50 border-r bg-background/90 backdrop-blur-md',
      className
    )}
  >
    <SidebarHeader />
    <div className="space-y-4">{children}</div>
  </div>
);
