'use client';

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from '@repo/snippet';
import {} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import kibo from '../public/logomark.svg';
import shadcn from '../public/shadcn.svg';

type InstallerProps = {
  packageName: string;
};

export const Installer = ({ packageName }: InstallerProps) => {
  const [value, setValue] = useState('kibo-ui');

  const commands = {
    'kibo-ui': {
      image: kibo,
      code: `npx kibo-ui@latest add ${packageName}`,
    },
    shadcn: {
      image: shadcn,
      code: `npx shadcn@latest add https://www.kibo-ui.com/registry/${packageName}.json`,
    },
  };

  return (
    <Snippet
      value={value}
      onValueChange={setValue}
      className="not-prose shiki shiki-themes github-light github-dark"
    >
      <SnippetHeader>
        <SnippetTabsList>
          {Object.entries(commands).map(([key, command]) => (
            <SnippetTabsTrigger key={key} value={key}>
              <Image
                src={command.image}
                alt=""
                width={14}
                height={14}
                className="dark:invert"
              />
              {key}
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        <SnippetCopyButton
          value={commands[value as keyof typeof commands].code}
          onCopy={() => toast.success('Copied to clipboard')}
          onError={() => toast.error('Failed to copy to clipboard')}
        />
      </SnippetHeader>
      {Object.entries(commands).map(([key, command]) => (
        <SnippetTabsContent key={key} value={key}>
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};
