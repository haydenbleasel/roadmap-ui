'use client';

import { exampleFeatures, exampleMarkers } from '@/lib/content';
import * as Gantt from '@roadmap-ui/gantt';
import type { Feature } from '@roadmap-ui/types';
import { type FC, useState } from 'react';

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

  const handleViewFeature = (id: string) =>
    console.log(`Feature selected: ${id}`);

  const handleRemoveMarker = (id: string) =>
    console.log(`Remove marker: ${id}`);

  const handleCreateMarker = (date: Date) =>
    console.log(`Create marker: ${date.toISOString()}`);

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );

    console.log(`Move feature: ${id} from ${startAt} to ${endAt}`);
  };

  const handleAddFeature = (date: Date) =>
    console.log(`Add feature: ${date.toISOString()}`);

  return (
    <Gantt.Provider onAddItem={handleAddFeature} range="monthly" zoom={100}>
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
