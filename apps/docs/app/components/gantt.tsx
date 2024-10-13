'use client';

import * as Gantt from '@repo/gantt';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/shadcn-ui/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@repo/shadcn-ui/components/ui/context-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@repo/shadcn-ui/components/ui/hover-card';
import { Separator } from '@repo/shadcn-ui/components/ui/separator';
// import { toast } from 'sonner';
import type { Feature } from '@repo/types';
import { EyeIcon, LinkIcon, TrashIcon } from 'lucide-react';
import { type FC, useState } from 'react';
import { exampleFeatures, exampleMarkers } from '../../lib/content';

const toast = {
  success: (message: string) => console.log(message),
};

export const GanttExampleBasic: FC = () => {
  const [features, setFeatures] = useState(exampleFeatures);
  const groupedFeatures: Record<string, Feature[]> = {
    features,
  };

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  const handleViewFeature = (id: string) =>
    toast.success(`Feature selected: ${id}`);

  const handleRemoveMarker = (id: string) =>
    toast.success(`Remove marker: ${id}`);

  const handleCreateMarker = (date: Date) =>
    toast.success(`Create marker: ${date.toISOString()}`);

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );

    toast.success(`Move feature: ${id} from ${startAt} to ${endAt}`);
  };

  const handleAddFeature = (date: Date) =>
    toast.success(`Add feature: ${date.toISOString()}`);

  return (
    <Gantt.Provider
      editable
      onAddItem={handleAddFeature}
      range="monthly"
      zoom={100}
    >
      <Gantt.Sidebar>
        {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
          <Gantt.SidebarGroup key={group} name="Features">
            {features.map((feature) => (
              <Gantt.SidebarItem
                key={feature.id}
                feature={feature}
                onSelectItem={handleViewFeature}
              />
            ))}
          </Gantt.SidebarGroup>
        ))}
      </Gantt.Sidebar>
      <Gantt.Timeline>
        <Gantt.Header />
        <Gantt.FeatureList>
          {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
            <Gantt.FeatureListGroup key={group}>
              {features.map((feature) => (
                <Gantt.FeatureItem
                  key={feature.id}
                  onMove={handleMoveFeature}
                  {...feature}
                />
              ))}
            </Gantt.FeatureListGroup>
          ))}
        </Gantt.FeatureList>
        {exampleMarkers.map((marker) => (
          <Gantt.Marker
            key={marker.id}
            {...marker}
            onRemove={handleRemoveMarker}
          />
        ))}
        <Gantt.Today />
        <Gantt.CreateMarkerTrigger onCreateMarker={handleCreateMarker} />
      </Gantt.Timeline>
    </Gantt.Provider>
  );
};

export const GanttExampleCustom: FC = () => {
  const [features, setFeatures] = useState(exampleFeatures);

  const groupedFeatures: Record<string, typeof exampleFeatures> = {
    features,
  };

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  const handleViewFeature = (id: string) =>
    toast.success(`Feature selected: ${id}`);

  const handleCopyLink = (id: string) => toast.success(`Copy link: ${id}`);

  const handleRemoveFeature = (id: string) =>
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));

  const handleRemoveMarker = (id: string) =>
    toast.success(`Remove marker: ${id}`);

  const handleCreateMarker = (date: Date) =>
    toast.success(`Create marker: ${date.toISOString()}`);

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );

    toast.success(`Move feature: ${id} from ${startAt} to ${endAt}`);
  };

  const handleAddFeature = (date: Date) =>
    toast.success(`Add feature: ${date.toISOString()}`);

  return (
    <Gantt.Provider
      editable
      onAddItem={handleAddFeature}
      range="monthly"
      zoom={100}
    >
      <Gantt.Sidebar>
        {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
          <Gantt.SidebarGroup key={group} name="Features">
            {features.map((feature) => (
              <Gantt.SidebarItem
                key={feature.id}
                feature={feature}
                onSelectItem={handleViewFeature}
              />
            ))}
          </Gantt.SidebarGroup>
        ))}
      </Gantt.Sidebar>
      <Gantt.Timeline>
        <Gantt.Header />
        <Gantt.FeatureList>
          {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
            <Gantt.FeatureListGroup key={group}>
              {features.map((feature) => (
                <HoverCard key={feature.id}>
                  <HoverCardTrigger asChild>
                    <div>
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <button
                            type="button"
                            onClick={() => handleViewFeature(feature.id)}
                          >
                            <Gantt.FeatureItem
                              key={feature.id}
                              onMove={handleMoveFeature}
                              {...feature}
                            >
                              <p className="flex-1 truncate text-xs">
                                {feature.name}
                              </p>
                              {feature.owner && (
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={feature.owner.image} />
                                  <AvatarFallback>
                                    {feature.owner.name?.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </Gantt.FeatureItem>
                          </button>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem
                            className="flex items-center gap-2"
                            onClick={() => handleViewFeature(feature.id)}
                          >
                            <EyeIcon
                              size={16}
                              className="text-muted-foreground"
                            />
                            View feature
                          </ContextMenuItem>
                          <ContextMenuItem
                            className="flex items-center gap-2"
                            onClick={() => handleCopyLink(feature.id)}
                          >
                            <LinkIcon
                              size={16}
                              className="text-muted-foreground"
                            />
                            Copy link
                          </ContextMenuItem>
                          <ContextMenuItem
                            className="flex items-center gap-2 text-destructive"
                            onClick={() => handleRemoveFeature(feature.id)}
                          >
                            <TrashIcon size={16} />
                            Remove from roadmap
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent align="start" className="space-y-1">
                    <p className="font-medium text-xs">{feature.name}</p>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: feature.status.color }}
                      />
                      <p className="text-xs">{feature.status.name}</p>
                    </div>
                    <Separator />
                    {feature.owner && (
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={feature.owner.image} />
                          <AvatarFallback>
                            {feature.owner.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-xs">{feature.owner.name}</p>
                      </div>
                    )}
                  </HoverCardContent>
                </HoverCard>
              ))}
            </Gantt.FeatureListGroup>
          ))}
        </Gantt.FeatureList>
        {exampleMarkers.map((marker) => (
          <Gantt.Marker
            key={marker.id}
            {...marker}
            onRemove={handleRemoveMarker}
          />
        ))}
        <Gantt.Today />
        <Gantt.CreateMarkerTrigger onCreateMarker={handleCreateMarker} />
      </Gantt.Timeline>
    </Gantt.Provider>
  );
};

export const GanttExampleSimple: FC = () => {
  const [features, setFeatures] = useState(exampleFeatures);

  const groupedFeatures: Record<string, Feature[]> = {
    features,
  };

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );

    toast.success(`Move feature: ${id} from ${startAt} to ${endAt}`);
  };

  const handleAddFeature = (date: Date) =>
    toast.success(`Add feature: ${date.toISOString()}`);

  return (
    <Gantt.Provider
      editable
      onAddItem={handleAddFeature}
      range="monthly"
      zoom={100}
    >
      <Gantt.Timeline>
        <Gantt.Header />
        <Gantt.FeatureList>
          {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
            <Gantt.FeatureListGroup key={group}>
              {features.map((feature) => (
                <Gantt.FeatureItem
                  key={feature.id}
                  onMove={handleMoveFeature}
                  {...feature}
                />
              ))}
            </Gantt.FeatureListGroup>
          ))}
        </Gantt.FeatureList>
        <Gantt.Today />
      </Gantt.Timeline>
    </Gantt.Provider>
  );
};
