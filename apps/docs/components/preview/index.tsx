import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  type SandpackProvider,
} from '@codesandbox/sandpack-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/shadcn-ui/components/ui/resizable';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { content } from './content';
import { PreviewProvider } from './provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { tsconfig } from './tsconfig';
import { utils } from './utils';

type PreviewProps = {
  name: string;
  code: string;
  dependencies?: Record<string, string>;
};

const parseDependencyVersion = (dependency: string) => {
  const [name, version] =
    (dependency as string).match(/^(.+?)(?:@(.+))?$/)?.slice(1) ?? [];

  return { name, version: version ?? 'latest' };
};

const parseContent = (content: string) => {
  return content.replace(/@\/registry\/new-york\/ui\//g, '@/components/ui/');
};

export const Preview = async ({
  name,
  code,
  dependencies: demoDependencies,
}: PreviewProps) => {
  const registry = (await import(`../../public/registry/${name}.json`)) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    registryDependencies?: Record<string, string>;
    files?: { content: string }[];
  };

  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};

  const files: ComponentProps<typeof SandpackProvider>['files'] = {
    '/App.tsx': code,
    '/tsconfig.json': tsconfig,
    '/lib/utils.ts': utils,
    '/lib/content.ts': content,
  };

  const parseShadcnComponents = async (str: string) => {
    const parsedString = parseContent(str);
    const matches = parsedString.match(
      /@\/components\/ui\/(?!kibo-ui\/)([^'"\s]+)/g
    );

    if (matches) {
      const components = [
        ...new Set(matches.map((m) => m.replace('@/components/ui/', ''))),
      ];

      for (const component of components) {
        try {
          const mod = (await import(`./shadcn/${component}.json`)) as {
            name: string;
            dependencies?: Record<string, string>;
            devDependencies?: Record<string, string>;
            files?: { content: string }[];
          };

          // Load required shadcn/ui component
          files[`/components/ui/${mod.name}.tsx`] = parseContent(
            mod.files?.[0]?.content ?? ''
          );

          // Load required dependencies
          if (mod.dependencies) {
            for (const dep of Object.values(mod.dependencies)) {
              const { name, version } = parseDependencyVersion(dep);

              dependencies[name] = version;
            }
          }

          // Load required devDependencies
          if (mod.devDependencies) {
            for (const dep of Object.values(mod.devDependencies)) {
              const { name, version } = parseDependencyVersion(dep);

              devDependencies[name] = version;
            }
          }

          await parseShadcnComponents(mod.files?.[0]?.content ?? '');
        } catch (error) {
          console.warn(`Failed to load shadcn component: ${component}`);
        }
      }
    }
  };

  // Load selected Kibo UI component
  const selectedComponent = registry.files?.[0]?.content;
  const selectedComponentContent = parseContent(selectedComponent ?? '');

  await parseShadcnComponents(selectedComponentContent);

  files[`/components/ui/kibo-ui/${name}.tsx`] = parseContent(
    selectedComponentContent
  );

  // Load required dependencies from selected Kibo UI component
  if (registry.dependencies) {
    for (const dep of Object.values(registry.dependencies)) {
      const { name, version } = parseDependencyVersion(dep);

      dependencies[name] = version;
    }
  }

  // Load required devDependencies from selected Kibo UI component
  if (registry.devDependencies) {
    for (const dep of Object.values(registry.devDependencies)) {
      const { name, version } = parseDependencyVersion(dep);

      devDependencies[name] = version;
    }
  }

  // Process registry dependencies
  if (registry.registryDependencies) {
    for (const dependency of Object.values(registry.registryDependencies)) {
      const mod = (await import(`./shadcn/${dependency}.json`)) as {
        name: string;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        files?: { content: string }[];
      };

      // Load required shadcn/ui component
      const componentContent = mod.files?.[0]?.content ?? '';
      files[`/components/ui/${mod.name}.tsx`] = parseContent(componentContent);

      // Load required dependencies from shadcn/ui component
      if (mod.dependencies) {
        for (const dep of Object.values(mod.dependencies)) {
          const { name, version } = parseDependencyVersion(dep);

          dependencies[name] = version;
        }
      }

      // Load required devDependencies from shadcn/ui component
      if (mod.devDependencies) {
        for (const dep of Object.values(mod.devDependencies)) {
          const { name, version } = parseDependencyVersion(dep);

          devDependencies[name] = version;
        }
      }

      await parseShadcnComponents(componentContent);
    }
  }

  // Scan the demo code for any imports of shadcn/ui components
  await parseShadcnComponents(code);

  // Load demo dependencies
  if (demoDependencies) {
    for (const [name, version] of Object.entries(demoDependencies)) {
      dependencies[name] = version;
    }
  }

  return (
    <SandboxProvider
      template="react-ts"
      theme={resolvedTheme as 'light' | 'dark'}
      // options={{ bundlerURL: 'https://sandpack-bundler.codesandbox.io' }}
      options={{
        externalResources: [
          'https://cdn.tailwindcss.com',
          'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        ],
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

          // Common utilities
          'date-fns': 'latest',
        },
        devDependencies: {
          autoprefixer: 'latest',
          postcss: 'latest',
          ...devDependencies,
        },
      }}
      files={files}
    >
      <SandboxLayout className="!rounded-none !border-none !bg-transparent">
        <SandboxTabs
          defaultValue="preview"
          className="not-prose group relative w-full overflow-hidden rounded-lg border bg-fd-secondary/50 text-sm"
        >
          <div className="flex flex-row items-center justify-between border-b bg-fd-muted p-2">
            <SandboxTabsList className="h-auto w-full justify-start rounded-none bg-transparent">
              <SandboxTabsTrigger
                value="code"
                className="flex flex-row items-center gap-1.5"
              >
                <CodeIcon size={14} />
                Code
              </SandboxTabsTrigger>
              <SandboxTabsTrigger
                value="preview"
                className="flex flex-row items-center gap-1.5"
              >
                <AppWindowIcon size={14} />
                Preview
              </SandboxTabsTrigger>
              <SandboxTabsTrigger
                value="console"
                className="flex flex-row items-center gap-1.5"
              >
                <TerminalIcon size={14} />
                Console
              </SandboxTabsTrigger>
            </SandboxTabsList>
          </div>
          <SandboxTabsContent
            value="code"
            className="m-0 max-h-96 overflow-y-auto"
          >
            <SandboxCodeEditor className="min-h-96" />
          </SandboxTabsContent>
          <SandboxTabsContent
            value="preview"
            className="m-0 max-h-96 overflow-y-auto"
          >
            <SandboxPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              className="min-h-96"
            />
          </SandboxTabsContent>
          <SandboxTabsContent
            value="console"
            className="m-0 max-h-96 overflow-y-auto"
          >
            <SandboxConsole className="min-h-96" />
          </SandboxTabsContent>
        </SandboxTabs>
      </SandboxLayout>
    </SandboxProvider>
  );
};
