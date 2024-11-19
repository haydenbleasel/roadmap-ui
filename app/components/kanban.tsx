'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { exampleFeatures, exampleStatuses } from '@/lib/content';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/registry/ui/kanban';
import type { DragEndEvent } from '@dnd-kit/core';
import { format } from 'date-fns';
import { useState } from 'react';
import type { FC } from 'react';

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
    <KanbanProvider onDragEnd={handleDragEnd}>
      {exampleStatuses.map((status) => (
        <KanbanBoard key={status.name} id={status.name}>
          <KanbanHeader name={status.name} color={status.color} />
          <KanbanCards>
            {features
              .filter((feature) => feature.status.name === status.name)
              .map((feature, index) => (
                <KanbanCard
                  key={feature.id}
                  id={feature.id}
                  name={feature.name}
                  parent={status.name}
                  index={index}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <p className="m-0 flex-1 font-medium text-sm">
                        {feature.name}
                      </p>
                      <p className="m-0 text-xs text-muted-foreground">
                        {feature.initiative.name}
                      </p>
                    </div>
                    {feature.owner && (
                      <Avatar className="h-4 w-4 shrink-0">
                        <AvatarImage src={feature.owner.image} />
                        <AvatarFallback>
                          {feature.owner.name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <p className="m-0text-xs text-muted-foreground">
                    {format(feature.startAt, 'MMM d')} -{' '}
                    {format(feature.endAt, 'MMM d, yyyy')}
                  </p>
                </KanbanCard>
              ))}
          </KanbanCards>
        </KanbanBoard>
      ))}
    </KanbanProvider>
  );
};
