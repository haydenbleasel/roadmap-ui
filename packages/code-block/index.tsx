'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export type CodeBlockProps = {
  children: ReactNode;
  language: string;
};

export const CodeBlock = ({ children, language }: CodeBlockProps) => {
  return <div className="overflow-hidden rounded-md border">{children}</div>;
};

export type CodeBlockHeaderProps = {
  children: ReactNode;
  filename: string;
};

export const CodeBlockHeader = ({
  children,
  filename,
}: CodeBlockHeaderProps) => (
  <div className="bg-secondary px-4 text-sm">
    {filename}
    {children}
  </div>
);

export type CodeBlockBodyProps = {
  children: ReactNode;
};

export const CodeBlockBody = ({ children }: CodeBlockBodyProps) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      const html = await codeToHtml(children as string, {
        lang: 'javascript',
        theme: 'vitesse-dark',
      });
      setHtml(html);
    };
    fetchHtml();
  }, [children]);

  if (!html) {
    return <pre className="p-4">{html}</pre>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
