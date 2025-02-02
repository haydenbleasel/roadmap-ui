import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  BubbleMenu as BubbleMenuComponent,
  type BubbleMenuProps as BubbleMenuComponentProps,
  EditorProvider,
  type EditorProviderProps,
  FloatingMenu as FloatingMenuComponent,
  type FloatingMenuProps as FloatingMenuComponentProps,
  useCurrentEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  type LucideIcon,
  RemoveFormattingIcon,
  TextIcon,
  TextQuote,
} from 'lucide-react';
import type { HTMLAttributes } from 'react';

export type ProviderProps = EditorProviderProps & {
  className?: string;
};

const defaultExtensions = [StarterKit];

export const Provider = ({
  className,
  extensions,
  ...props
}: ProviderProps) => (
  <div className={className}>
    <EditorProvider
      extensions={[...defaultExtensions, ...(extensions ?? [])]}
      {...props}
    />
  </div>
);

export type FloatingMenuProps = Omit<FloatingMenuComponentProps, 'editor'>;

export const FloatingMenu = (props: FloatingMenuProps) => (
  <FloatingMenuComponent editor={null} {...props} />
);

export type BubbleMenuProps = Omit<BubbleMenuComponentProps, 'editor'>;

export const BubbleMenu = ({ className, ...props }: BubbleMenuProps) => (
  <BubbleMenuComponent
    className={cn(
      'flex rounded-xl border bg-background p-0.5 shadow',
      className
    )}
    editor={null}
    {...props}
  />
);

export type BubbleMenuTextButtonsProps = HTMLAttributes<HTMLDivElement>;

export const BubbleMenuTextButtons = ({
  className,
  ...props
}: BubbleMenuTextButtonsProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const items: {
    name: string;
    isActive: () => boolean;
    command: () => void;
    icon: LucideIcon;
  }[] = [
    {
      name: 'clear-formatting',
      isActive: () => false,
      command: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
      icon: RemoveFormattingIcon,
    },
  ];

  return (
    <div className={cn('flex', className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.name}
          onSelect={() => item.command()}
          className="rounded-none"
          variant="ghost"
          size="icon"
        >
          <item.icon
            size={16}
            className={cn({
              'text-primary': item.isActive(),
            })}
          />
        </Button>
      ))}
    </div>
  );
};

export type BubbleMenuNodeSelectorProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BubbleMenuNodeSelector = ({
  open,
  onOpenChange,
  className,
  ...props
}: BubbleMenuNodeSelectorProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const items = [
    {
      name: 'Text',
      icon: TextIcon,
      command: () =>
        editor?.chain().focus().toggleNode('paragraph', 'paragraph').run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        (editor &&
          !editor.isActive('paragraph') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('orderedList')) ??
        false,
    },
    {
      name: 'Heading 1',
      icon: Heading1,
      command: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor?.isActive('heading', { level: 1 }) ?? false,
    },
    {
      name: 'Heading 2',
      icon: Heading2,
      command: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor?.isActive('heading', { level: 2 }) ?? false,
    },
    {
      name: 'Heading 3',
      icon: Heading3,
      command: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor?.isActive('heading', { level: 3 }) ?? false,
    },
    {
      name: 'To-do List',
      icon: CheckSquare,
      command: () => editor?.chain().focus().toggleTaskList().run(),
      isActive: () => editor?.isActive('taskItem') ?? false,
    },
    {
      name: 'Bullet List',
      icon: ListOrdered,
      command: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive('bulletList') ?? false,
    },
    {
      name: 'Numbered List',
      icon: ListOrdered,
      command: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor?.isActive('orderedList') ?? false,
    },
    {
      name: 'Quote',
      icon: TextQuote,
      command: () =>
        editor
          ?.chain()
          .focus()
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
      isActive: () => editor?.isActive('blockquote') ?? false,
    },
    {
      name: 'Code',
      icon: Code,
      command: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor?.isActive('codeBlock') ?? false,
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: 'Text',
  };

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-none border-none">
          <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className={cn('w-48 p-1', className)}
        {...props}
      >
        {items.map((item) => (
          <Button
            key={item.name}
            onSelect={() => {
              item.command();
              onOpenChange(false);
            }}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-card"
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-sm bg-background p-1">
                <item.icon size={12} />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && <Check className="h-4 w-4" />}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
