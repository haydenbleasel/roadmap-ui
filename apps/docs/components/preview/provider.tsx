'use client';

import { SandboxProvider } from '@repo/sandbox';
import { useTheme } from 'next-themes';
import type { ComponentProps } from 'react';

type PreviewProviderProps = Omit<
  ComponentProps<typeof SandboxProvider>,
  'theme'
>;

export const PreviewProvider = ({
  options,
  ...props
}: PreviewProviderProps) => {
  const { resolvedTheme } = useTheme();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <SandboxProvider
      theme={resolvedTheme as 'light' | 'dark'}
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
