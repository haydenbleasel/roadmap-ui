import { addDays, formatDistance, isSameDay } from 'date-fns';
import type { FC, KeyboardEventHandler, MouseEventHandler } from 'react';
import type { Feature } from '../../types/types';

type SidebarItemProperties = {
  feature: Feature;
  onSelectItem: (id: string) => void;
};

export const SidebarItem: FC<SidebarItemProperties> = ({
  feature,
  onSelectItem,
}) => {
  const tempEndAt =
    feature.endAt && isSameDay(feature.startAt, feature.endAt)
      ? addDays(feature.endAt, 1)
      : feature.endAt;
  const duration = tempEndAt
    ? formatDistance(feature.startAt, tempEndAt)
    : `${formatDistance(feature.startAt, new Date())} so far`;

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onSelectItem(feature.id);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      onSelectItem(feature.id);
    }
  };

  return (
    // biome-ignore lint/nursery/useSemanticElements: <explanation>
    <div
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      key={feature.id}
      className="relative flex items-center gap-2.5 p-2.5 text-xs"
      style={{
        height: 'var(--gantt-row-height)',
      }}
    >
      {/* <Checkbox onCheckedChange={handleCheck} className="shrink-0" /> */}
      <div
        className="pointer-events-none h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor: feature.status.color,
        }}
      />
      <p className="pointer-events-none flex-1 truncate text-left font-medium">
        {feature.name}
      </p>
      <p className="pointer-events-none text-muted-foreground">{duration}</p>
    </div>
  );
};
