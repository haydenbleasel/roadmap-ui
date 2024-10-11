'use client';

import { exampleFeatures, exampleStatuses } from '@/lib/content';
import type { DragEndEvent } from '@repo/list';
import * as List from '@repo/list';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/shadcn-ui/components/ui/avatar';
import { type FC, useState } from 'react';

export const ListExampleBasic: FC = () => {
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
                index={index}
              />
            ))}
        </List.ListGroup>
      ))}
    </List.ListProvider>
  );
};

export const ListExampleCustom: FC = () => {
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
                index={index}
              >
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: feature.status.color }}
                />
                <p className="m-0 font-medium text-sm flex-1">{feature.name}</p>
                {feature.owner && (
                  <Avatar className="h-4 w-4 shrink-0">
                    <AvatarImage src={feature.owner.image} />
                    <AvatarFallback>
                      {feature.owner.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </List.ListItem>
            ))}
        </List.ListGroup>
      ))}
    </List.ListProvider>
  );
};
