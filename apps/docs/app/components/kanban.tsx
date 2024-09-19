'use client';

import { exampleFeatures, exampleStatuses } from '@/lib/content';
import * as Kanban from '@repo/kanban';
import type { FC } from 'react';

export const KanbanExample: FC = () => (
  <Kanban.KanbanProvider className="not-prose" onDragEnd={() => {}}>
    {exampleStatuses.map((status) => (
      <Kanban.KanbanBoard
        key={status.name}
        id={status.name}
        name={status.name}
        color={status.color}
      >
        {exampleFeatures
          .filter((feature) => feature.status.name === status.name)
          .map((feature, index) => (
            <Kanban.KanbanCard
              key={feature.id}
              id={feature.id}
              name={feature.name}
              parent={feature.status.name}
              color={feature.status.color}
              index={index}
            />
          ))}
      </Kanban.KanbanBoard>
    ))}
  </Kanban.KanbanProvider>
);
