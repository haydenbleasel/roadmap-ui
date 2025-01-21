'use client';

import { openInV0 } from '@/actions/v0';
import { Button } from '@repo/shadcn-ui/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import Logo from './logo.svg';

export const V0Button = ({ name }: { name: string }) => {
  const handleClick = async () => {
    try {
      const result = await openInV0({ name, url: window.location.href });

      if ('error' in result) {
        throw new Error(result.error);
      }

      window.open(result.url, '_blank');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.';
      toast.error(message);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleClick}
      className="h-7 gap-1"
    >
      <span>Edit in</span>
      <Image
        src={Logo}
        alt="v0"
        width={16}
        height={16}
        className="dark:invert"
      />
    </Button>
  );
};
