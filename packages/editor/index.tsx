import { EditorProvider, type EditorProviderProps } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export type ProviderProps = EditorProviderProps;

const defaultExtensions = [StarterKit];

export const Provider = ({ extensions, ...props }: ProviderProps) => (
  <EditorProvider
    extensions={[...defaultExtensions, ...(extensions ?? [])]}
    {...props}
  />
);
