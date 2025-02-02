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
  BoldIcon,
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  ListOrdered,
  type LucideIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TextIcon,
  TextQuote,
  UnderlineIcon,
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
      command: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
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
        editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
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
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }) ?? false,
    },
    {
      name: 'Heading 2',
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }) ?? false,
    },
    {
      name: 'Heading 3',
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }) ?? false,
    },
    {
      name: 'To-do List',
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskItem') ?? false,
    },
    {
      name: 'Bullet List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList') ?? false,
    },
    {
      name: 'Numbered List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList') ?? false,
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
      isActive: () => editor.isActive('blockquote') ?? false,
    },
    {
      name: 'Code',
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock') ?? false,
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
            variant="ghost"
            className="flex w-full gap-2"
          >
            <item.icon size={16} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left">{item.name}</span>
            {activeItem.name === item.name && (
              <Check size={16} className="shrink-0 text-muted-foreground" />
            )}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export type BubbleMenuFormatSelectorProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BubbleMenuFormatSelector = ({
  className,
  open,
  onOpenChange,
  ...props
}: BubbleMenuFormatSelectorProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const items = [
    {
      name: 'Bold',
      isActive: () => editor.isActive('bold') ?? false,
      command: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'Italic',
      isActive: () => editor.isActive('italic') ?? false,
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'Underline',
      isActive: () => editor.isActive('underline') ?? false,
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'Strikethrough',
      isActive: () => editor.isActive('strike') ?? false,
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'Code',
      isActive: () => editor.isActive('code') ?? false,
      command: () => editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
    {
      name: 'Superscript',
      isActive: () => editor.isActive('superscript') ?? false,
      command: () => editor.chain().focus().toggleSuperscript().run(),
      icon: SuperscriptIcon,
    },
    {
      name: 'Subscript',
      isActive: () => editor.isActive('subscript') ?? false,
      command: () => editor.chain().focus().toggleSubscript().run(),
      icon: SubscriptIcon,
    },
  ];

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-none border-none">
          <span className="whitespace-nowrap text-sm">Format</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className={cn('w-48 p-1', className)}
        {...props}
      >
        {items.map((item, index) => (
          <Button
            key={index}
            onSelect={() => {
              item.command();
              onOpenChange(false);
            }}
            variant="ghost"
            className="flex w-full gap-2"
          >
            <item.icon size={16} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left">{item.name}</span>
            {item.isActive() ? (
              <Check size={16} className="shrink-0 text-muted-foreground" />
            ) : null}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
