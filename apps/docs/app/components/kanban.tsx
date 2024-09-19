'use client';

import { exampleFeatures, exampleStatuses } from '@/lib/content';
import type { DragEndEvent } from '@repo/kanban';
import * as Kanban from '@repo/kanban';
import { type FC, useState } from 'react';

export const KanbanExample: FC = () => {
  const [features, setFeatures] = useState(exampleFeatures);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const status = exampleStatuses.find((status) => status.name === over.id);

    if (!status) {
      return;
    }

    setFeatures(
      features.map((feature) => {
        if (feature.id === active.id) {
          return { ...feature, status };
        }

        return feature;
      })
    );
  };

  return (
    <Kanban.KanbanProvider className="not-prose" onDragEnd={handleDragEnd}>
      {exampleStatuses.map((status) => (
        <Kanban.KanbanBoard
          key={status.name}
          id={status.name}
          name={status.name}
          color={status.color}
        >
          {features
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
};