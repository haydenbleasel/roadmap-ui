'use client';

import type {
  SandpackProviderProps,
  SandpackThemeProp,
} from '@codesandbox/sandpack-react';
import { SandboxProvider } from '@repo/sandbox';
import { useTheme } from 'next-themes';

export const PreviewProvider = ({
  options,
  ...props
}: Omit<SandpackProviderProps, 'theme'>) => {
  const { resolvedTheme } = useTheme();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <SandboxProvider
      theme={resolvedTheme as SandpackThemeProp}
      {...props}
      options={{
        ...options,
        externalResources: [
          ...(options?.externalResources || []),
          new URL('/preview/shadcn.css', window.location.origin).toString(),
          new URL(
            '/preview/tailwind-config.js',
            window.location.origin
          ).toString(),
        ],
      }}
    />
  );
};
