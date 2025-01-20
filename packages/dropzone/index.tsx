import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import type {
  Accept,
  DropEvent,
  DropzoneOptions,
  FileRejection,
} from 'react-dropzone';

type DropzoneContextType = {
  src?: File[];
  accept?: Accept;
  maxSize?: number;
  minSize?: number;
};

const renderBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)}${units[unitIndex]}`;
};

const DropzoneContext = createContext<DropzoneContextType | undefined>(
  undefined
);

export type DropzoneProps = Omit<DropzoneOptions, 'onDrop'> & {
  src?: File[];
  className?: string;
  onDrop?: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  children?: ReactNode;
};

export const Dropzone = ({
  accept,
  maxFiles = 1,
  maxSize,
  minSize,
  onDrop,
  onError,
  disabled,
  src,
  className,
  children,
  ...props
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onError,
    disabled,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (fileRejections.length > 0) {
        const message = fileRejections.at(0)?.errors.at(0)?.message;
        onError?.(new Error(message));
        return;
      }

      onDrop?.(acceptedFiles, fileRejections, event);
    },
    ...props,
  });

  return (
    <DropzoneContext.Provider
      key={JSON.stringify(src)}
      value={{ src, accept, maxSize, minSize }}
    >
      <Button
        type="button"
        disabled={disabled}
        variant="outline"
        className={cn(
          'h-auto w-full flex-col p-8',
          isDragActive && 'outline-none ring-1 ring-ring',
          className
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={disabled} />
        {children}
      </Button>
    </DropzoneContext.Provider>
  );
};

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);

  if (!context) {
    throw new Error('useDropzoneContext must be used within a Dropzone');
  }

  return context;
};

export type DropzoneContentProps = {
  children?: ReactNode;
};

export const DropzoneContent = ({ children }: DropzoneContentProps) => {
  const { src } = useDropzoneContext();

  if (!src) {
    return null;
  }

  if (children) {
    return children;
  }

  return (
    <>
      <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <UploadIcon size={16} />
      </div>
      <p className="my-2 truncate font-medium text-sm">
        {new Intl.ListFormat('en').format(src.map((file) => file.name))}
      </p>
      <p className="text-muted-foreground text-xs">
        Drag and drop or click to replace
      </p>
    </>
  );
};

export type DropzoneEmptyStateProps = {
  children?: ReactNode;
};

export const DropzoneEmptyState = ({ children }: DropzoneEmptyStateProps) => {
  const { src, accept, maxSize, minSize } = useDropzoneContext();

  if (src) {
    return null;
  }

  if (children) {
    return children;
  }

  let caption = '';

  if (accept) {
    caption += 'Accepts ';
    caption += new Intl.ListFormat('en').format(Object.keys(accept));
  }

  if (minSize && maxSize) {
    caption += ` between ${renderBytes(minSize)} and ${renderBytes(maxSize)}`;
  } else if (minSize) {
    caption += ` at least ${renderBytes(minSize)}`;
  } else if (maxSize) {
    caption += ` less than ${renderBytes(maxSize)}`;
  }

  return (
    <>
      <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <UploadIcon size={16} />
      </div>
      <p className="my-2 font-medium text-sm">Upload a file</p>
      <p className="text-muted-foreground text-xs">
        Drag and drop or click to upload
      </p>
      {caption && <p className="text-muted-foreground text-xs">{caption}.</p>}
    </>
  );
};
