'use client';

import {
  globalsCss,
  postcssConfig,
  previewFeatures,
  previewMarkers,
  previewStatuses,
  tailwindConfig,
} from '@/lib/preview';
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

export const GanttExampleSimple: FC = () => {
  const theme = useTheme();

  return (
    <SandpackProvider
      theme={theme.theme === 'dark' ? 'dark' : 'light'}
      template="nextjs"
      options={{
        visibleFiles: ['lib/content.js', 'pages/index.js'],
      }}
      customSetup={{
        dependencies: {
          '@roadmap-ui/gantt': 'latest',
          '@dnd-kit/core': '^6.1.0',
          '@dnd-kit/modifiers': '^7.0.0',
          '@uidotdev/usehooks': '^2.4.1',
          autoprefixer: '^10.4.19',
          'date-fns': '^4.1.0',
          'lodash.throttle': '^4.1.1',
          'lucide-react': '^0.453.0',
          postcss: '^8.4.47',
          tailwindcss: '^3.4.11',
          zustand: '^5.0.1',
          'tailwindcss-animate': '^1.0.7',
        },
      }}
      files={{
        'tailwind.config.js': tailwindConfig,
        'styles.css': globalsCss,
        'postcss.config.js': postcssConfig,
        'lib/content.js': `import {
  addMonths,
  endOfMonth,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';

const today = new Date();

const previewStatuses = ${previewStatuses};

export const exampleFeatures = ${previewFeatures};

export const exampleMarkers = ${previewMarkers};`,
        'pages/index.js': `import { useState } from 'react';
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
};`,
      }}
    >
      <SandpackLayout
        style={{
          background: 'transparent',
          borderRadius: 'var(--radius)',
          height: '32rem',
          overflow: 'hidden',
        }}
      >
        <Tabs defaultValue="preview" className="h-full w-full overflow-hidden">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="h-full overflow-auto">
            <SandpackCodeEditor />
          </TabsContent>
          <TabsContent value="preview" className="h-full overflow-auto">
            <SandpackPreview className="h-full" />
          </TabsContent>
          <TabsContent value="console" className="h-full">
            <SandpackConsole className="h-full" />
          </TabsContent>
        </Tabs>
      </SandpackLayout>
    </SandpackProvider>
  );
};
