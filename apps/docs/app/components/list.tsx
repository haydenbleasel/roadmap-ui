'use client';

import { exampleFeatures, exampleStatuses } from '@/lib/content';
import type { DragEndEvent } from '@repo/list';
import * as List from '@repo/list';
import { type FC, useState } from 'react';

export const ListExample: FC = () => {
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
    <List.ListProvider onDragEnd={handleDragEnd}>
      {exampleStatuses.map((status) => (
        <List.ListGroup
          key={status.name}
          id={status.name}
          name={status.name}
          color={status.color}
        >
          {features
            .filter((feature) => feature.status.name === status.name)
            .map((feature, index) => (
              <List.ListItem
                key={feature.id}
                id={feature.id}
                name={feature.name}
                parent={feature.status.name}
                color={feature.status.color}
                index={index}
              />
            ))}
        </List.ListGroup>
      ))}
    </List.ListProvider>
  );
};
