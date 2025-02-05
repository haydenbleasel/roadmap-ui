'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Editor, Range } from '@tiptap/core';
import { Node, mergeAttributes } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import Typography from '@tiptap/extension-typography';
import type { DOMOutputSpec, Node as ProseMirrorNode } from '@tiptap/pm/model';
import { PluginKey } from '@tiptap/pm/state';
import {
  BubbleMenu,
  type BubbleMenuProps,
  FloatingMenu,
  type FloatingMenuProps,
  ReactRenderer,
  EditorProvider as TiptapEditorProvider,
  type EditorProviderProps as TiptapEditorProviderProps,
  useCurrentEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion';
import Fuse from 'fuse.js';
import { all, createLowlight } from 'lowlight';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BoldIcon,
  BoltIcon,
  CheckIcon,
  CheckSquareIcon,
  ChevronDownIcon,
  CodeIcon,
  ColumnsIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  type LucideIcon,
  type LucideProps,
  RemoveFormattingIcon,
  RowsIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TableCellsMergeIcon,
  TableColumnsSplitIcon,
  TableIcon,
  TextIcon,
  TextQuoteIcon,
  TrashIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEventHandler, HTMLAttributes, ReactNode } from 'react';
import tippy, { type Instance as TippyInstance } from 'tippy.js';

interface SlashNodeAttrs {
  id: string | null;
  label?: string | null;
}

type SlashOptions<
  SuggestionItem = unknown,
  Attrs extends Record<string, unknown> = SlashNodeAttrs,
> = {
  HTMLAttributes: Record<string, unknown>;
  renderText: (props: {
    options: SlashOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
  }) => string;
  renderHTML: (props: {
    options: SlashOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
  }) => DOMOutputSpec;
  deleteTriggerWithBackspace: boolean;
  suggestion: Omit<SuggestionOptions<SuggestionItem, Attrs>, 'editor'>;
};

const SlashPluginKey = new PluginKey('slash');

export interface SuggestionItem {
  title: string;
  description: string;
  icon: LucideIcon;
  searchTerms: string[];
  command: (props: { editor: Editor; range: Range }) => void;
}

export const defaultSlashSuggestions: SuggestionOptions<SuggestionItem>['items'] =
  () => [
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: TextIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run();
      },
    },
    {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: CheckSquareIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: Heading1Icon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium'],
      icon: Heading2Icon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small'],
      icon: Heading3Icon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: ListIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: ListOrderedIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote'],
      icon: TextQuoteIcon,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock'],
      icon: CodeIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: 'Table',
      description: 'Add a table view to organize data.',
      searchTerms: ['table'],
      icon: TableIcon,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    },
  ];

const Slash = Node.create<SlashOptions>({
  name: 'slash',
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      renderText({ options, node }) {
        return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
      },
      deleteTriggerWithBackspace: false,
      renderHTML({ options, node }) {
        return [
          'span',
          mergeAttributes(this.HTMLAttributes, options.HTMLAttributes),
          `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
        ];
      },
      suggestion: {
        char: '/',
        pluginKey: SlashPluginKey,
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(' ');

          if (overrideSpace) {
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
            .run();

          // get reference to `window` object from editor element, to support cross-frame JS usage
          editor.view.dom.ownerDocument.defaultView
            ?.getSelection()
            ?.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            'data-id': attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-label'),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            'data-label': attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const mergedOptions = { ...this.options };

    mergedOptions.HTMLAttributes = mergeAttributes(
      { 'data-type': this.name },
      this.options.HTMLAttributes,
      HTMLAttributes
    );
    const html = this.options.renderHTML({
      options: mergedOptions,
      node,
    });

    if (typeof html === 'string') {
      return [
        'span',
        mergeAttributes(
          { 'data-type': this.name },
          this.options.HTMLAttributes,
          HTMLAttributes
        ),
        html,
      ];
    }
    return html;
  },

  renderText({ node }) {
    return this.options.renderText({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              tr.insertText(
                this.options.deleteTriggerWithBackspace
                  ? ''
                  : this.options.suggestion.char || '',
                pos,
                pos + node.nodeSize
              );

              return false;
            }
          });

          return isMention;
        }),
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

// Create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

type EditorSlashMenuProps = {
  items: SuggestionItem[];
  command: (item: SuggestionItem) => void;
  editor: Editor;
  range: Range;
};

const EditorSlashMenu = ({ items, editor, range }: EditorSlashMenuProps) => (
  <Command
    id="slash-command"
    className="border shadow"
    onKeyDown={(e) => {
      e.stopPropagation();
    }}
  >
    <CommandEmpty className="flex w-full items-center justify-center p-4 text-muted-foreground text-sm">
      <p>No results</p>
    </CommandEmpty>
    <CommandList>
      {items.map((item) => (
        <CommandItem
          key={item.title}
          onSelect={() => item.command({ editor, range })}
          className="flex items-center gap-3 pr-3"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded border bg-secondary">
            <item.icon size={16} className="text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{item.title}</span>
            <span className="text-muted-foreground text-xs">
              {item.description}
            </span>
          </div>
        </CommandItem>
      ))}
    </CommandList>
  </Command>
);

const handleCommandNavigation = (event: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
    const slashCommand = document.querySelector('#slash-command');
    if (slashCommand) {
      event.preventDefault();

      slashCommand.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: event.key,
          cancelable: true,
          bubbles: true,
        })
      );

      return true;
    }
  }
};

export type EditorProviderProps = TiptapEditorProviderProps & {
  className?: string;
  limit?: number;
  placeholder?: string;
};

export const EditorProvider = ({
  className,
  extensions,
  limit,
  placeholder,
  ...props
}: EditorProviderProps) => {
  const defaultExtensions = [
    StarterKit.configure({
      codeBlock: false,
      bulletList: {
        HTMLAttributes: {
          class: cn('list-outside list-disc pl-3'),
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: cn('list-outside list-decimal pl-3'),
        },
      },
      listItem: {
        HTMLAttributes: {
          class: cn('leading-normal'),
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: cn('border-primary border-l-4'),
        },
      },
      code: {
        HTMLAttributes: {
          class: cn('rounded-md bg-muted px-1.5 py-1 font-medium font-mono'),
          spellcheck: 'false',
        },
      },
      horizontalRule: {
        HTMLAttributes: {
          class: cn('mt-4 mb-6 border-muted-foreground border-t'),
        },
      },
      dropcursor: {
        color: 'var(--border)',
        width: 4,
      },
    }),
    Color,
    Typography,
    Placeholder.configure({
      placeholder,
      emptyEditorClass:
        'before:text-muted-foreground before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none',
    }),
    CharacterCount.configure({
      limit,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Superscript,
    Subscript,
    Slash.configure({
      suggestion: {
        items: async ({ editor, query }) => {
          const items = await defaultSlashSuggestions({ editor, query });

          if (!query) {
            return items;
          }

          const slashFuse = new Fuse(items, {
            keys: ['title', 'description', 'searchTerms'],
            threshold: 0.2,
            minMatchCharLength: 1,
          });

          const results = slashFuse.search(query);

          return results.map((result) => result.item);
        },
        char: '/',
        render: () => {
          let component: ReactRenderer<EditorSlashMenuProps>;
          let popup: TippyInstance[];

          return {
            onStart: (props) => {
              component = new ReactRenderer(EditorSlashMenu, {
                props,
                editor: props.editor,
              });

              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });
            },

            onUpdate(props) {
              component.updateProps(props);

              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown(props) {
              if (props.event.key === 'Escape') {
                popup[0].hide();
                component.destroy();

                return true;
              }

              return component.ref?.onKeyDown(props);
            },

            onExit() {
              popup[0].destroy();
              component.destroy();
            },
          };
        },
      },
    }),
    Table.configure({
      HTMLAttributes: {
        class: cn(
          'relative m-0 mx-auto my-3 w-full table-fixed border-collapse overflow-hidden rounded-none text-sm'
        ),
      },
      allowTableNodeSelection: true,
    }),
    TableRow.configure({
      HTMLAttributes: {
        class: cn(
          'relative box-border min-w-[1em] border p-1 text-start align-top'
        ),
      },
    }),
    TableCell.configure({
      HTMLAttributes: {
        class: cn(
          'relative box-border min-w-[1em] border p-1 text-start align-top'
        ),
      },
    }),
    TableHeader.configure({
      HTMLAttributes: {
        class: cn(
          'relative box-border min-w-[1em] border bg-secondary p-1 text-start align-top font-medium font-semibold text-muted-foreground'
        ),
      },
    }),
    TaskList.configure({
      HTMLAttributes: {
        // 17px = the width of the checkbox + the gap between the checkbox and the text
        class: 'before:translate-x-[17px]',
      },
    }),
    TaskItem.configure({
      HTMLAttributes: {
        class: 'flex items-start gap-1',
      },
      nested: true,
    }),
  ];

  return (
    <TooltipProvider>
      <div className={cn(className, '[&_.ProseMirror-focused]:outline-none')}>
        <TiptapEditorProvider
          extensions={[...defaultExtensions, ...(extensions ?? [])]}
          editorProps={{
            handleKeyDown: (_view, event) => {
              handleCommandNavigation(event);
            },
          }}
          {...props}
        />
      </div>
    </TooltipProvider>
  );
};

export type EditorFloatingMenuProps = Omit<FloatingMenuProps, 'editor'>;

export const EditorFloatingMenu = ({
  className,
  ...props
}: EditorFloatingMenuProps) => (
  <FloatingMenu
    className={cn('flex items-center bg-secondary', className)}
    tippyOptions={{
      offset: [32, 0],
    }}
    editor={null}
    {...props}
  />
);

export type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'editor'>;

export const EditorBubbleMenu = ({
  className,
  children,
  ...props
}: EditorBubbleMenuProps) => (
  <BubbleMenu
    className={cn(
      'flex rounded-xl border bg-background p-0.5 shadow',
      '[&>*:first-child]:rounded-l-[9px]',
      '[&>*:last-child]:rounded-r-[9px]',
      className
    )}
    tippyOptions={{
      maxWidth: 'none',
    }}
    editor={null}
    {...props}
  >
    {children && Array.isArray(children)
      ? children.reduce((acc: ReactNode[], child, index) => {
          if (index === 0) {
            return [child];
          }

          acc.push(<Separator key={index} orientation="vertical" />);
          acc.push(child);
          return acc;
        }, [])
      : children}
  </BubbleMenu>
);

type EditorButtonProps = {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: LucideIcon | ((props: LucideProps) => ReactNode);
  hideName?: boolean;
};

const BubbleMenuButton = ({
  name,
  isActive,
  command,
  icon: Icon,
  hideName,
}: EditorButtonProps) => (
  <Button
    onClick={() => command()}
    variant="ghost"
    className="flex w-full gap-4"
    size="sm"
  >
    <Icon size={12} className="shrink-0 text-muted-foreground" />
    {!hideName && <span className="flex-1 text-left">{name}</span>}
    {isActive() ? (
      <CheckIcon size={12} className="shrink-0 text-muted-foreground" />
    ) : null}
  </Button>
);

export const EditorClearFormatting = ({
  hideName = true,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      command={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      icon={RemoveFormattingIcon}
      isActive={() => false}
      hideName={hideName}
      name="Clear Formatting"
    />
  );
};

export const EditorNodeText = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorNodeHeading1 = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Heading 1"
      command={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      icon={Heading1Icon}
      isActive={() => editor.isActive('heading', { level: 1 }) ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeHeading2 = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Heading 2"
      command={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      icon={Heading2Icon}
      isActive={() => editor.isActive('heading', { level: 2 }) ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeHeading3 = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Heading 3"
      command={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      icon={Heading3Icon}
      isActive={() => editor.isActive('heading', { level: 3 }) ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeBulletList = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Bullet List"
      command={() => editor.chain().focus().toggleBulletList().run()}
      icon={ListIcon}
      isActive={() => editor.isActive('bulletList') ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeOrderedList = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Numbered List"
      command={() => editor.chain().focus().toggleOrderedList().run()}
      icon={ListOrderedIcon}
      isActive={() => editor.isActive('orderedList') ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeTaskList = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="To-do List"
      command={() => editor.chain().focus().toggleTaskList().run()}
      icon={CheckSquareIcon}
      isActive={() => editor.isActive('taskItem') ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeQuote = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      icon={TextQuoteIcon}
      isActive={() => editor.isActive('blockquote') ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeCode = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Code"
      command={() => editor.chain().focus().toggleCodeBlock().run()}
      icon={CodeIcon}
      isActive={() => editor.isActive('codeBlock') ?? false}
      hideName={hideName}
    />
  );
};

export const EditorNodeTable = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name="Table"
      command={() =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      }
      icon={TableIcon}
      isActive={() => editor.isActive('table') ?? false}
      hideName={hideName}
    />
  );
};

export type EditorSelectorProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
};

export const EditorSelector = ({
  open,
  onOpenChange,
  title,
  className,
  children,
  ...props
}: EditorSelectorProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 rounded-none border-none"
        >
          <span className="whitespace-nowrap text-xs">{title}</span>
          <ChevronDownIcon size={12} />
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

export const EditorFormatBold = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorFormatItalic = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorFormatStrike = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorFormatCode = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorFormatSubscript = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorFormatSuperscript = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

export const EditorFormatUnderline = ({
  hideName = false,
}: Pick<EditorButtonProps, 'hideName'>) => {
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
      hideName={hideName}
    />
  );
};

type BubbleMenuLinkSelectorProperties = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

export const EditorLinkSelector = ({
  open,
  onOpenChange,
}: BubbleMenuLinkSelectorProperties & Pick<EditorButtonProps, 'hideName'>) => {
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
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 rounded-none border-none"
        >
          <ExternalLinkIcon size={12} />
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
              <TrashIcon size={12} />
            </Button>
          ) : (
            <Button size="icon" variant="secondary" className="h-8">
              <CheckIcon size={12} />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export type EditorColorProps = {
  color: string;
  name: string;
};

export const EditorTextColor = ({
  color,
  name,
  hideName = false,
}: EditorColorProps & Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name={name}
      command={() => editor.chain().focus().setColor(color).run()}
      icon={() => (
        <div
          className="size-4 rounded-sm border"
          style={{ backgroundColor: color }}
        />
      )}
      isActive={() => editor.isActive('textStyle', { color }) ?? false}
      hideName={hideName}
    />
  );
};

export const EditorBackgroundColor = ({
  color,
  name,
  hideName = false,
}: EditorColorProps & Pick<EditorButtonProps, 'hideName'>) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenuButton
      name={name}
      command={() => editor.chain().focus().setHighlight({ color }).run()}
      icon={() => (
        <div
          className="size-4 rounded-sm border"
          style={{ backgroundColor: color }}
        />
      )}
      isActive={() => editor.isActive('highlight', { color }) ?? false}
      hideName={hideName}
    />
  );
};

export type EditorTableMenuProps = {
  children: ReactNode;
};

export const EditorTableMenu = ({ children }: EditorTableMenuProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const isActive = editor.isActive('table');

  return (
    <div
      className={cn({
        hidden: !isActive,
      })}
    >
      {children}
    </div>
  );
};

export type EditorTableGlobalMenuProps = {
  children: ReactNode;
};

export const EditorTableGlobalMenu = ({
  children,
}: EditorTableGlobalMenuProps) => {
  const { editor } = useCurrentEditor();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on('selectionUpdate', () => {
      const selection = window.getSelection();

      if (!selection) {
        return;
      }

      const range = selection.getRangeAt(0);
      let startContainer = range.startContainer as HTMLElement | string;

      if (!(startContainer instanceof HTMLElement)) {
        startContainer = range.startContainer.parentElement as HTMLElement;
      }

      const tableNode = startContainer.closest('table');

      if (!tableNode) {
        return;
      }

      const tableRect = tableNode.getBoundingClientRect();

      setTop(tableRect.top + tableRect.height);
      setLeft(tableRect.left + tableRect.width / 2);
    });

    return () => {
      editor.off('selectionUpdate');
    };
  }, [editor]);

  return (
    <div
      className={cn(
        '-translate-x-1/2 absolute flex translate-y-1/2 items-center rounded-full border bg-background shadow-xl',
        {
          hidden: !left && !top,
        }
      )}
      style={{ top, left }}
    >
      {children}
    </div>
  );
};

export type EditorTableColumnMenuProps = {
  children: ReactNode;
};

export const EditorTableColumnMenu = ({
  children,
}: EditorTableColumnMenuProps) => {
  const { editor } = useCurrentEditor();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on('selectionUpdate', () => {
      const selection = window.getSelection();

      if (!selection) {
        return;
      }

      const range = selection.getRangeAt(0);
      let startContainer = range.startContainer as HTMLElement | string;

      if (!(startContainer instanceof HTMLElement)) {
        startContainer = range.startContainer.parentElement as HTMLElement;
      }

      // Get the closest table cell (td or th)
      const tableCell = startContainer.closest('td, th');

      if (!tableCell) {
        return;
      }

      const cellRect = tableCell.getBoundingClientRect();

      setTop(cellRect.top);
      setLeft(cellRect.left + cellRect.width / 2);
    });

    return () => {
      editor.off('selectionUpdate');
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(
          '-translate-x-1/2 -translate-y-1/2 absolute flex h-4 w-7 overflow-hidden rounded-md border bg-background shadow-xl',
          {
            hidden: !left && !top,
          }
        )}
        style={{ top, left }}
      >
        <Button variant="ghost" size="icon">
          <EllipsisIcon size={16} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export type EditorTableRowMenuProps = {
  children: ReactNode;
};

export const EditorTableRowMenu = ({ children }: EditorTableRowMenuProps) => {
  const { editor } = useCurrentEditor();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on('selectionUpdate', () => {
      const selection = window.getSelection();

      if (!selection) {
        return;
      }

      const range = selection.getRangeAt(0);
      let startContainer = range.startContainer as HTMLElement | string;

      if (!(startContainer instanceof HTMLElement)) {
        startContainer = range.startContainer.parentElement as HTMLElement;
      }

      const tableRow = startContainer.closest('tr');

      if (!tableRow) {
        return;
      }

      const rowRect = tableRow.getBoundingClientRect();

      setTop(rowRect.top + rowRect.height / 2);
      setLeft(rowRect.left);
    });

    return () => {
      editor.off('selectionUpdate');
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            '-translate-x-1/2 -translate-y-1/2 absolute flex h-7 w-4 overflow-hidden rounded-md border bg-background shadow-xl',
            {
              hidden: !left && !top,
            }
          )}
          style={{ top, left }}
        >
          <EllipsisVerticalIcon size={12} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export const EditorTableColumnBefore = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => editor.chain().focus().addColumnBefore().run()}
    >
      <ArrowLeftIcon size={16} className="text-muted-foreground" />
      <span>Add column before</span>
    </DropdownMenuItem>
  );
};

export const EditorTableColumnAfter = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => editor.chain().focus().addColumnAfter().run()}
    >
      <ArrowRightIcon size={16} className="text-muted-foreground" />
      <span>Add column after</span>
    </DropdownMenuItem>
  );
};

export const EditorTableRowBefore = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => editor.chain().focus().addRowBefore().run()}
    >
      <ArrowUpIcon size={16} className="text-muted-foreground" />
      <span>Add row before</span>
    </DropdownMenuItem>
  );
};

export const EditorTableRowAfter = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => editor.chain().focus().addRowAfter().run()}
    >
      <ArrowDownIcon size={16} className="text-muted-foreground" />
      <span>Add row after</span>
    </DropdownMenuItem>
  );
};

export const EditorTableColumnDelete = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => editor.chain().focus().deleteColumn().run()}
    >
      <TrashIcon size={16} className="text-destructive" />
      <span>Delete column</span>
    </DropdownMenuItem>
  );
};

export const EditorTableRowDelete = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onClick={() => editor.chain().focus().deleteRow().run()}
    >
      <TrashIcon size={16} className="text-destructive" />
      <span>Delete row</span>
    </DropdownMenuItem>
  );
};

export const EditorTableHeaderColumnToggle = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          <ColumnsIcon size={16} className="text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Toggle header column</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const EditorTableHeaderRowToggle = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        >
          <RowsIcon size={16} className="text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Toggle header row</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const EditorTableDelete = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <TrashIcon size={16} className="text-destructive" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Delete table</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const EditorTableMergeCells = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
          onClick={() => editor.chain().focus().mergeCells().run()}
        >
          <TableCellsMergeIcon size={16} className="text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Merge cells</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const EditorTableSplitCell = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
          onClick={() => editor.chain().focus().splitCell().run()}
        >
          <TableColumnsSplitIcon size={16} className="text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Split cell</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const EditorTableFix = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
          onClick={() => editor.chain().focus().fixTables().run()}
        >
          <BoltIcon size={16} className="text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Fix table</span>
      </TooltipContent>
    </Tooltip>
  );
};

export type EditorCharacterCountProps = {
  children: ReactNode;
  className?: string;
};

export const EditorCharacterCount = {
  Characters({ children, className }: EditorCharacterCountProps) {
    const { editor } = useCurrentEditor();

    if (!editor) {
      return null;
    }

    return (
      <div
        className={cn(
          'absolute right-4 bottom-4 rounded-md border bg-background p-2 text-muted-foreground text-sm shadow',
          className
        )}
      >
        {children}
        {editor.storage.characterCount.characters()}
      </div>
    );
  },

  Words({ children, className }: EditorCharacterCountProps) {
    const { editor } = useCurrentEditor();

    if (!editor) {
      return null;
    }

    return (
      <div
        className={cn(
          'absolute right-4 bottom-4 rounded-md border bg-background p-2 text-muted-foreground text-sm shadow',
          className
        )}
      >
        {children}
        {editor.storage.characterCount.words()}
      </div>
    );
  },
};
