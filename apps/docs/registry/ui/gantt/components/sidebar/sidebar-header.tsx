import type { FC } from 'react';

export const SidebarHeader: FC = () => (
  <div
    className="sticky top-0 z-10 flex shrink-0 items-end justify-between gap-2.5 border-border/50 border-b bg-backdrop/90 p-2.5 font-medium text-muted-foreground text-xs backdrop-blur-sm"
    style={{ height: 'var(--gantt-header-height)' }}
  >
    {/* <Checkbox className="shrink-0" /> */}
    <p className="flex-1 truncate text-left">Issues</p>
    <p className="shrink-0">Duration</p>
  </div>
);
