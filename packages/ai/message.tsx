import { cn } from '@repo/shadcn-ui/lib/utils';
import type { HTMLAttributes } from 'react';

export type MessagesProps = HTMLAttributes<HTMLDivElement>;

export const Messages = ({ className, ...props }: MessagesProps) => (
  <div className={cn('flex flex-col gap-8', className)} {...props} />
);

export type MessageGroupProps = HTMLAttributes<HTMLDivElement>;

export const MessageGroup = ({ className, ...props }: MessageGroupProps) => (
  <div className={cn('flex flex-col gap-2', className)} {...props} />
);

export type MessageProps = HTMLAttributes<HTMLDivElement>;

export const Message = ({ className, ...props }: MessageProps) => (
  <div className={cn('flex flex-col items-end gap-2', className)} {...props} />
);
