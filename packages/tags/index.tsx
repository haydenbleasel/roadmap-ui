'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDownIcon } from 'lucide-react';
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
} from 'react';

type TagsContextType = {
  value?: string;
  setValue?: (value: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const TagsContext = createContext<TagsContextType>({
  value: undefined,
  setValue: undefined,
  open: undefined,
  setOpen: undefined,
});

const useTagsContext = () => {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error('useTagsContext must be used within a TagsProvider');
  }

  return context;
};

export type TagsProps = {
  value?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
};

export const Tags = ({
  value,
  setValue,
  defaultValue,
  open,
  onOpenChange,
  children,
  className,
}: TagsProps) => (
  <TagsContext.Provider
    value={{ value, setValue, open, setOpen: onOpenChange }}
  >
    <Popover open={open} onOpenChange={onOpenChange}>
      <div className={cn('relative', className)}>{children}</div>
    </Popover>
  </TagsContext.Provider>
);

export type TagsTriggerProps = ButtonProps;

export const TagsTrigger = ({ className, ...props }: TagsTriggerProps) => (
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      // biome-ignore lint/a11y/useSemanticElements: "Required"
      role="combobox"
      className={cn('w-full justify-between gap-2', className)}
      {...props}
    >
      Select...
      <ChevronsUpDownIcon size={16} className="shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
);

export type TagsContentProps = ComponentProps<typeof PopoverContent>;

export const TagsContent = ({
  className,
  children,
  ...props
}: TagsContentProps) => (
  <PopoverContent className={cn('p-0', className)} {...props}>
    <Command>{children}</Command>
  </PopoverContent>
);

export type TagsInputProps = ComponentProps<typeof CommandInput>;

export const TagsInput = ({
  placeholder,
  className,
  ...props
}: TagsInputProps) => (
  <CommandInput className={cn('h-9', className)} {...props} />
);

export type TagsListProps = ComponentProps<typeof CommandList>;

export const TagsList = CommandList;

export type TagsEmptyProps = ComponentProps<typeof CommandEmpty>;

export const TagsEmpty = ({
  children,
  className,
  ...props
}: TagsEmptyProps) => (
  <CommandEmpty {...props}>{children ?? 'No tags found.'}</CommandEmpty>
);

export type TagsGroupProps = ComponentProps<typeof CommandGroup>;

export const TagsGroup = CommandGroup;

export type TagsItemProps = ComponentProps<typeof CommandItem>;

export const TagsItem = ({ className, ...props }: TagsItemProps) => (
  <CommandItem className={cn('cursor-pointer', className)} {...props} />
);
