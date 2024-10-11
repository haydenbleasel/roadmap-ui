'use client';

import { exampleFeatures, exampleStatuses } from '@/lib/content';
import type { DragEndEvent } from '@roadmap-ui/kanban';
import * as Kanban from '@roadmap-ui/kanban';
import { type FC, useState } from 'react';

export const KanbanExampleBasic: FC = () => {
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
    <Kanban.KanbanProvider onDragEnd={handleDragEnd}>
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
                parent={status.name}
                index={index}
              />
            ))}
        </Kanban.KanbanBoard>
      ))}
    </Kanban.KanbanProvider>
  );
};

export const KanbanExampleCustom: FC = () => {
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
    <Kanban.KanbanProvider onDragEnd={handleDragEnd}>
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
                parent={status.name}
                index={index}
              >
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: feature.status.color }}
                />
                <p className="m-0 font-medium text-sm">{feature.name}</p>
              </Kanban.KanbanCard>
            ))}
        </Kanban.KanbanBoard>
      ))}
    </Kanban.KanbanProvider>
  );
};
