'use client';

import { Sandpack } from '../sandpack';

export const GanttExampleSimple = () => (
  <Sandpack
    code={`import { useState } from 'react';
import { exampleFeatures, exampleMarkers } from '../lib/content';
import * as Gantt from '@roadmap-ui/gantt';

export default function App() {
  const [features, setFeatures] = useState(exampleFeatures);
  const groupedFeatures = { features };

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  const handleViewFeature = (id) =>
    console.log(\`Feature selected: \${id}\`);

  const handleRemoveMarker = (id) =>
    console.log(\`Remove marker: \${id}\`);

  const handleCreateMarker = (date) =>
    console.log(\`Create marker: \${date.toISOString()}\`);

  const handleMoveFeature = (id, startAt, endAt) => {
    if (!endAt) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );

    console.log(\`Move feature: \${id} from \${startAt} to \${endAt}\`);
  };

  const handleAddFeature = (date) =>
    console.log(\`Add feature: \${date.toISOString()}\`);

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
};`}
  />
);
