'use client';

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
  CheckIcon,
  CheckSquare,
  ChevronDownIcon,
  Code,
  CodeIcon,
  ExternalLinkIcon,
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
  TrashIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEventHandler, HTMLAttributes, ReactNode } from 'react';

export type ProviderProps = EditorProviderProps & {
  className?: string;
};

// StarterKit contains the following:
// - Blockquote
// - BulletList
// - CodeBlock
// - Document
// - HardBreak
// - Heading
// - HorizontalRule
// - ListItem
// - OrderedList
// - Paragraph
// - Text
// - Marks
// - Bold
// - Code
// - Italic
// - Strike
// - Extensions
// - Dropcursor
// - Gapcursor
// - History

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

type BubbleMenuButtonProps = {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: LucideIcon;
};

const BubbleMenuButton = ({
  name,
  isActive,
  command,
  icon: Icon,
}: BubbleMenuButtonProps) => (
  <Button
    onSelect={() => command()}
    variant="ghost"
    className="flex w-full gap-2"
  >
    <Icon size={16} className="shrink-0 text-muted-foreground" />
    <span className="flex-1 text-left">{name}</span>
    {isActive() ? (
      <CheckIcon size={16} className="shrink-0 text-muted-foreground" />
    ) : null}
  </Button>
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

export const BubbleMenuNodeText = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Text"
      command={() =>
        editor.chain().focus().toggleNode('paragraph', 'paragraph').run()
      }
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive={() =>
        (editor &&
          !editor.isActive('paragraph') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('orderedList')) ??
        false
      }
      icon={TextIcon}
    />
  );
};

export const BubbleMenuNodeHeading1 = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Heading 1"
      command={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      icon={Heading1}
      isActive={() => editor.isActive('heading', { level: 1 }) ?? false}
    />
  );
};

export const BubbleMenuNodeHeading2 = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Heading 2"
      command={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      icon={Heading2}
      isActive={() => editor.isActive('heading', { level: 2 }) ?? false}
    />
  );
};

export const BubbleMenuNodeHeading3 = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Heading 3"
      command={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      icon={Heading3}
      isActive={() => editor.isActive('heading', { level: 3 }) ?? false}
    />
  );
};

export const BubbleMenuNodeBulletList = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Bullet List"
      command={() => editor.chain().focus().toggleBulletList().run()}
      icon={ListOrdered}
      isActive={() => editor.isActive('bulletList') ?? false}
    />
  );
};

export const BubbleMenuNodeOrderedList = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Numbered List"
      command={() => editor.chain().focus().toggleOrderedList().run()}
      icon={ListOrdered}
      isActive={() => editor.isActive('orderedList') ?? false}
    />
  );
};

export const BubbleMenuNodeTaskList = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="To-do List"
      command={() => editor.chain().focus().toggleTaskList().run()}
      icon={CheckSquare}
      isActive={() => editor.isActive('taskItem') ?? false}
    />
  );
};

export const BubbleMenuNodeQuote = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Quote"
      command={() =>
        editor
          .chain()
          .focus()
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run()
      }
      icon={TextQuote}
      isActive={() => editor.isActive('blockquote') ?? false}
    />
  );
};

export const BubbleMenuNodeCode = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Code"
      command={() => editor.chain().focus().toggleCodeBlock().run()}
      icon={Code}
      isActive={() => editor.isActive('codeBlock') ?? false}
    />
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
  children,
  ...props
}: BubbleMenuNodeSelectorProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-none border-none">
          <span className="whitespace-nowrap text-sm">Text</span>
          <ChevronDownIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className={cn('w-48 p-1', className)}
        {...props}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const BubbleMenuFormatBold = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Bold"
      isActive={() => editor.isActive('bold') ?? false}
      command={() => editor.chain().focus().toggleBold().run()}
      icon={BoldIcon}
    />
  );
};

export const BubbleMenuFormatItalic = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Italic"
      isActive={() => editor.isActive('italic') ?? false}
      command={() => editor.chain().focus().toggleItalic().run()}
      icon={ItalicIcon}
    />
  );
};

export const BubbleMenuFormatStrike = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Strikethrough"
      isActive={() => editor.isActive('strike') ?? false}
      command={() => editor.chain().focus().toggleStrike().run()}
      icon={StrikethroughIcon}
    />
  );
};

export const BubbleMenuFormatCode = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Code"
      isActive={() => editor.isActive('code') ?? false}
      command={() => editor.chain().focus().toggleCode().run()}
      icon={CodeIcon}
    />
  );
};

export const BubbleMenuFormatSubscript = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Subscript"
      isActive={() => editor.isActive('subscript') ?? false}
      command={() => editor.chain().focus().toggleSubscript().run()}
      icon={SubscriptIcon}
    />
  );
};

export const BubbleMenuFormatSuperscript = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Superscript"
      isActive={() => editor.isActive('superscript') ?? false}
      command={() => editor.chain().focus().toggleSuperscript().run()}
      icon={SuperscriptIcon}
    />
  );
};

export const BubbleMenuFormatUnderline = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Underline"
      isActive={() => editor.isActive('underline') ?? false}
      command={() => editor.chain().focus().toggleUnderline().run()}
      icon={UnderlineIcon}
    />
  );
};

export type BubbleMenuFormatSelectorProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
};

export const BubbleMenuFormatSelector = ({
  className,
  open,
  onOpenChange,
  children,
  ...props
}: BubbleMenuFormatSelectorProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-none border-none">
          <span className="whitespace-nowrap text-sm">Format</span>
          <ChevronDownIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className={cn('w-48 p-1', className)}
        {...props}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};

type BubbleMenuLinkSelectorProperties = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

export const BubbleMenuLinkSelector = ({
  open,
  onOpenChange,
}: BubbleMenuLinkSelectorProperties) => {
  const [url, setUrl] = useState<string>('');
  const inputReference = useRef<HTMLInputElement>(null);
  const { editor } = useCurrentEditor();

  const isValidUrl = (text: string): boolean => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const getUrlFromString = (text: string): string | null => {
    if (isValidUrl(text)) {
      return text;
    }
    try {
      if (text.includes('.') && !text.includes(' ')) {
        return new URL(`https://${text}`).toString();
      }

      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    inputReference.current?.focus();
  }, []);

  if (!editor) {
    return null;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const href = getUrlFromString(url);

    if (href) {
      editor.chain().focus().setLink({ href }).run();
      onOpenChange(false);
    }
  };

  const defaultValue = (editor.getAttributes('link') as { href?: string }).href;

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-none border-none">
          <ExternalLinkIcon size={16} />
          <p
            className={cn(
              'underline decoration-text-muted underline-offset-4',
              {
                'text-primary': editor.isActive('link'),
              }
            )}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
        <form onSubmit={handleSubmit} className="flex p-1">
          <input
            aria-label="Link URL"
            ref={inputReference}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={defaultValue ?? ''}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          {editor.getAttributes('link').href ? (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-destructive transition-all hover:bg-destructive-foreground dark:hover:bg-destructive"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                onOpenChange(false);
              }}
            >
              <TrashIcon size={16} />
            </Button>
          ) : (
            <Button size="icon" variant="secondary" className="h-8">
              <CheckIcon size={16} />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
