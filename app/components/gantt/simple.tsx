'use client';

import { Sandpack } from '../sandpack';

export const GanttExampleSimple = () => (
  <Sandpack
    code={`import { useState } from 'react';
import { exampleFeatures, exampleMarkers } from '../lib/content';
import * as Gantt from '@@/components/ui/gantt';

export default function App() {
  const [features, setFeatures] = useState(exampleFeatures);
  const groupedFeatures = { features };

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  return (
    <Gantt.Provider range="monthly" zoom={100}>
      <Gantt.Timeline>
        <Gantt.Header />
        <Gantt.FeatureList>
          {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
            <Gantt.FeatureListGroup key={group}>
              {features.map((feature) => (
                <Gantt.FeatureItem
                  key={feature.id}
                  {...feature}
                />
              ))}
            </Gantt.FeatureListGroup>
          ))}
        </Gantt.FeatureList>
      </Gantt.Timeline>
    </Gantt.Provider>
  );
};`}
  />
);
