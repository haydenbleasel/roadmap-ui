'use client';

import { Button } from '@repo/shadcn-ui/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/shadcn-ui/components/ui/tabs';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import {
  type ComponentProps,
  type ReactElement,
  cloneElement,
  useState,
} from 'react';

export type SnippetProps = ComponentProps<typeof Tabs>;

export const Snippet = ({ className, ...props }: SnippetProps) => (
  <Tabs
    className={cn(
      'group overflow-hidden rounded-md border shadow-sm',
      className
    )}
    {...props}
  >
    {props.children}
  </Tabs>
);

export type SnippetHeaderProps = ComponentProps<'div'>;

export const SnippetHeader = (props: SnippetHeaderProps) => (
  <div
    className={cn(
      'flex flex-row items-center justify-between border-b bg-secondary p-1',
      props.className
    )}
    {...props}
  />
);

export type SnippetCopyButtonProps = ComponentProps<typeof Button> & {
  value: string;
  asChild?: boolean;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const SnippetCopyButton = ({
  asChild,
  value,
  onCopy,
  onError,
  timeout = 2000,
  ...props
}: SnippetCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (
      typeof window === 'undefined' ||
      !navigator.clipboard.writeText ||
      !value
    ) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      onCopy?.();

      setTimeout(() => setIsCopied(false), timeout);
    }, onError);
  };

  if (asChild) {
    return cloneElement(props.children as ReactElement, {
      // @ts-expect-error - we know this is a button
      onClick: copyToClipboard,
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className="opacity-0 transition-opacity group-hover:opacity-100"
      {...props}
    >
      {isCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
    </Button>
  );
};

export type SnippetTabsListProps = ComponentProps<typeof TabsList>;

export const SnippetTabsList = TabsList;

export type SnippetTabsTriggerProps = ComponentProps<typeof TabsTrigger>;

export const SnippetTabsTrigger = ({
  className,
  ...props
}: SnippetTabsTriggerProps) => (
  <TabsTrigger className={cn('gap-1.5', className)} {...props} />
);

export type SnippetTabsContentProps = ComponentProps<typeof TabsContent>;

export const SnippetTabsContent = ({
  className,
  ...props
}: SnippetTabsContentProps) => (
  <TabsContent asChild className={cn('mt-0 p-4 text-sm', className)} {...props}>
    <pre>{props.children}</pre>
  </TabsContent>
);
