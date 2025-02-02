import {
  BubbleMenu as BubbleMenuComponent,
  type BubbleMenuProps as BubbleMenuComponentProps,
  EditorProvider,
  type EditorProviderProps,
  FloatingMenu as FloatingMenuComponent,
  type FloatingMenuProps as FloatingMenuComponentProps,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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

export const BubbleMenu = (props: BubbleMenuProps) => (
  <BubbleMenuComponent editor={null} {...props} />
);
