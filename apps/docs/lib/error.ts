import { toast } from 'sonner';

export const parseError = (error: unknown): string => {
  let message = 'An error occurred';

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = error.message as string;
  } else {
    message = String(error);
  }

  return message;
};

export const handleError = (error: unknown): void => {
  const message = parseError(error);

  toast.error(message);
};
