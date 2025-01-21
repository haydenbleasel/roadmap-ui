import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  type SandpackProvider,
} from '@codesandbox/sandpack-react';
import type { Registry } from '@repo/shadcn-ui';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { content } from './content';
import { postcss } from './postcss';
import { PreviewProvider } from './provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { tsconfig } from './tsconfig';
import { utils } from './utils';
import { V0Button } from './v0-button';

// Dynamically import all shadcn components
const shadcnComponentsDir = join(process.cwd(), '/components/preview/shadcn');
const shadcnFiles = readdirSync(shadcnComponentsDir);

const shadcnImports = Object.fromEntries(
  shadcnFiles.map((file) => {
    const name = file.replace('.json', '');
    const content = JSON.parse(
      readFileSync(join(shadcnComponentsDir, file), 'utf-8')
    );
    return [name, content];
  })
) as Record<string, Registry[number]>;

// Dynamically import all kibo components
const kiboComponentsDir = join(process.cwd(), '/public/registry');
const kiboFiles = readdirSync(kiboComponentsDir);

const kiboImports = Object.fromEntries(
  kiboFiles.map((file) => {
    const name = file.replace('.json', '');
    const content = JSON.parse(
      readFileSync(join(kiboComponentsDir, file), 'utf-8')
    );
    return [name, content];
  })
) as Record<string, Registry[number]>;

type PreviewProps = {
  name: string;
  code: string;
};

const dependencies: Record<string, string> = {};
const devDependencies: Record<string, string> = {};

const shadcnDependencies = Object.values(shadcnImports).flatMap((mod) =>
  'dependencies' in mod ? mod.dependencies : []
) as string[];
const kiboDependencies = Object.values(kiboImports).flatMap((mod) =>
  'dependencies' in mod ? mod.dependencies : []
) as string[];

const shadcnDevDependencies = Object.values(shadcnImports).flatMap((mod) =>
  'devDependencies' in mod ? mod.devDependencies : []
) as string[];
const kiboDevDependencies = Object.values(kiboImports).flatMap((mod) =>
  'devDependencies' in mod ? mod.devDependencies : []
) as string[];

const uniqueDependencies = new Set([
  ...shadcnDependencies,
  ...kiboDependencies,
]);

const uniqueDevDependencies = new Set([
  ...shadcnDevDependencies,
  ...kiboDevDependencies,
]);

for (const dependency of uniqueDependencies) {
  const [name, version] =
    (dependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  if (name) {
    dependencies[name] = version ?? 'latest';
  }
}

for (const devDependency of uniqueDevDependencies) {
  const [name, version] =
    (devDependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  if (name) {
    devDependencies[name] = version ?? 'latest';
  }
}

const parseContent = (content: string) => {
  return content.replace(/@\/registry\/new-york\/ui\//g, '@/components/ui/');
};

export const Preview = ({ name, code }: PreviewProps) => {
  const files: ComponentProps<typeof SandpackProvider>['files'] = {
    '/App.tsx': code,
    '/tsconfig.json': tsconfig,
    '/lib/utils.ts': utils,
    '/lib/content.ts': content,
    '/postcss.config.mjs': postcss,
  };

  // Add kibo components
  for (const [name, mod] of Object.entries(kiboImports)) {
    files[`/components/ui/kibo-ui/${name}.tsx`] = parseContent(
      mod.files?.[0]?.content ?? ''
    );
  }

  // Add shadcn components
  for (const mod of Object.values(shadcnImports)) {
    files[`/components/ui/${mod.name}.tsx`] = parseContent(
      mod.files?.[0]?.content ?? ''
    );
  }

  return (
    <PreviewProvider
      template="react-ts"
      // options={{ bundlerURL: 'https://sandpack-bundler.codesandbox.io' }}
      options={{
        externalResources: ['https://cdn.tailwindcss.com'],
        visibleFiles: ['/App.tsx', `/components/ui/kibo-ui/${name}.tsx`],
        activeFile: '/App.tsx',
      }}
      customSetup={{
        dependencies: {
          // shadcn/ui global dependencies
          '@radix-ui/react-icons': 'latest',
          clsx: 'latest',
          'tailwind-merge': 'latest',
          'class-variance-authority': 'latest',

          // Tailwind dependencies
          tailwindcss: 'latest',
          'tailwindcss-animate': 'latest',
          ...dependencies,
        },
        devDependencies: {
          autoprefixer: 'latest',
          postcss: 'latest',
          ...devDependencies,
        },
      }}
      files={files}
    >
      <SandpackLayout className="!rounded-none !border-none !bg-transparent">
        <Tabs
          defaultValue="preview"
          className="not-prose group relative w-full overflow-hidden rounded-lg border bg-fd-secondary/50 text-sm"
        >
          <div className="flex flex-row items-center justify-between border-b bg-fd-muted p-2">
            <TabsList className="h-auto w-full justify-start rounded-none bg-transparent">
              <TabsTrigger
                value="code"
                className="flex flex-row items-center gap-1.5"
              >
                <CodeIcon size={14} />
                Code
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex flex-row items-center gap-1.5"
              >
                <AppWindowIcon size={14} />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="console"
                className="flex flex-row items-center gap-1.5"
              >
                <TerminalIcon size={14} />
                Console
              </TabsTrigger>
            </TabsList>
            <V0Button name={name} />
          </div>
          <TabsContent value="code" className="m-0 max-h-96 overflow-y-auto">
            <SandpackCodeEditor className="min-h-96" />
          </TabsContent>
          <TabsContent value="preview" className="m-0 max-h-96 overflow-y-auto">
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              className="min-h-96"
            />
          </TabsContent>
          <TabsContent value="console" className="m-0 max-h-96 overflow-y-auto">
            <SandpackConsole className="min-h-96" />
          </TabsContent>
        </Tabs>
      </SandpackLayout>
    </PreviewProvider>
  );
};
