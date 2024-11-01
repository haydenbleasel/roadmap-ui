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
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

export const Sandpack: FC<{ code: string }> = ({ code }) => {
  const theme = useTheme();

  return (
    <SandpackProvider
      theme={theme.theme === 'dark' ? 'dark' : 'light'}
      template="nextjs"
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
        'pages/index.js': code,
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
          <TabsContent
            value="editor"
            className="flex h-full divide-x overflow-auto"
          >
            <SandpackFileExplorer style={{ width: '15rem' }} />
            <SandpackCodeEditor showTabs={false} />
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
