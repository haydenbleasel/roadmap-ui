'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  type IconType,
  SiAstro,
  SiBiome,
  SiBower,
  SiBun,
  SiC,
  SiCircleci,
  SiCoffeescript,
  SiCplusplus,
  SiCss,
  SiCssmodules,
  SiDart,
  SiDocker,
  SiDocusaurus,
  SiDotenv,
  SiEditorconfig,
  SiEslint,
  SiGatsby,
  SiGitignoredotio,
  SiGnubash,
  SiGo,
  SiGraphql,
  SiGrunt,
  SiGulp,
  SiHandlebarsdotjs,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJson,
  SiLess,
  SiMarkdown,
  SiMdx,
  SiMintlify,
  SiMocha,
  SiMysql,
  SiNextdotjs,
  SiPerl,
  SiPhp,
  SiPostcss,
  SiPrettier,
  SiPrisma,
  SiPug,
  SiPython,
  SiR,
  SiReact,
  SiReadme,
  SiRedis,
  SiRemix,
  SiRive,
  SiRollupdotjs,
  SiRuby,
  SiSanity,
  SiSass,
  SiScala,
  SiSentry,
  SiShadcnui,
  SiStorybook,
  SiStylelint,
  SiSublimetext,
  SiSvelte,
  SiSvg,
  SiSwift,
  SiTailwindcss,
  SiToml,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWebassembly,
} from '@icons-pack/react-simple-icons';
import { CheckIcon, CopyIcon } from 'lucide-react';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { cloneElement, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

const filenameIconMap = {
  '.env': SiDotenv,
  '*.astro': SiAstro,
  'biome.json': SiBiome,
  '.bowerrc': SiBower,
  'bun.lockb': SiBun,
  '*.c': SiC,
  '*.cpp': SiCplusplus,
  '.circleci/config.yml': SiCircleci,
  '*.coffee': SiCoffeescript,
  '*.module.css': SiCssmodules,
  '*.css': SiCss,
  '*.dart': SiDart,
  Dockerfile: SiDocker,
  'docusaurus.config.js': SiDocusaurus,
  '.editorconfig': SiEditorconfig,
  '.eslintrc': SiEslint,
  'eslint.config.*': SiEslint,
  'gatsby-config.*': SiGatsby,
  '.gitignore': SiGitignoredotio,
  '*.go': SiGo,
  '*.graphql': SiGraphql,
  '*.sh': SiGnubash,
  'Gruntfile.*': SiGrunt,
  'gulpfile.*': SiGulp,
  '*.hbs': SiHandlebarsdotjs,
  '*.html': SiHtml5,
  '*.js': SiJavascript,
  '*.json': SiJson,
  '*.test.js': SiJest,
  '*.less': SiLess,
  '*.md': SiMarkdown,
  '*.mdx': SiMdx,
  'mintlify.json': SiMintlify,
  'mocha.opts': SiMocha,
  '*.mustache': SiHandlebarsdotjs,
  '*.sql': SiMysql,
  'next.config.*': SiNextdotjs,
  '*.pl': SiPerl,
  '*.php': SiPhp,
  'postcss.config.*': SiPostcss,
  'prettier.config.*': SiPrettier,
  '*.prisma': SiPrisma,
  '*.pug': SiPug,
  '*.py': SiPython,
  '*.r': SiR,
  '*.rb': SiRuby,
  '*.jsx': SiReact,
  '*.tsx': SiReact,
  'readme.md': SiReadme,
  '*.rdb': SiRedis,
  'remix.config.*': SiRemix,
  '*.riv': SiRive,
  'rollup.config.*': SiRollupdotjs,
  'sanity.config.*': SiSanity,
  '*.sass': SiSass,
  '*.scss': SiSass,
  '*.sc': SiScala,
  '*.scala': SiScala,
  'sentry.client.config.*': SiSentry,
  'components.json': SiShadcnui,
  'storybook.config.*': SiStorybook,
  'stylelint.config.*': SiStylelint,
  '.sublime-settings': SiSublimetext,
  '*.svelte': SiSvelte,
  '*.svg': SiSvg,
  '*.swift': SiSwift,
  'tailwind.config.*': SiTailwindcss,
  '*.toml': SiToml,
  '*.ts': SiTypescript,
  'vercel.json': SiVercel,
  'vite.config.*': SiVite,
  '*.vue': SiVuedotjs,
  '*.wasm': SiWebassembly,
};

export type CodeBlockProps = {
  children: ReactNode;
};

export const CodeBlock = ({ children }: CodeBlockProps) => (
  <div className="overflow-hidden rounded-md border">{children}</div>
);

export type CodeBlockHeaderProps = {
  children: ReactNode;
  filename: string;
  icon?: IconType;
};

export const CodeBlockHeader = ({
  children,
  filename,
  icon,
}: CodeBlockHeaderProps) => {
  const defaultIcon = Object.entries(filenameIconMap).find(([pattern]) => {
    const regex = new RegExp(
      `^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`
    );
    return regex.test(filename);
  })?.[1];
  const Icon = icon ?? defaultIcon;

  return (
    <div className="group flex items-center gap-2 bg-secondary px-4 py-1.5 text-muted-foreground text-xs">
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="flex-1 truncate">{filename}</span>
      {children}
    </div>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  value: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  asChild,
  value,
  onCopy,
  onError,
  timeout = 2000,
  children,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (
      typeof window === 'undefined' ||
      !navigator.clipboard.writeText ||
      !value
    ) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      onCopy?.();

      setTimeout(() => setIsCopied(false), timeout);
    }, onError);
  };

  if (asChild) {
    return cloneElement(children as ReactElement, {
      // @ts-expect-error - we know this is a button
      onClick: copyToClipboard,
    });
  }

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className="-mr-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
      {...props}
    >
      {children ?? <Icon size={14} className="text-muted-foreground" />}
    </Button>
  );
};

export type CodeBlockBodyProps = {
  children: ReactNode;
};

export const CodeBlockBody = ({ children }: CodeBlockBodyProps) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      const html = await codeToHtml(children as string, {
        lang: 'javascript',
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
      });
      setHtml(html);
    };
    fetchHtml();
  }, [children]);

  if (!html) {
    return <pre className="p-4">{html}</pre>;
  }

  return (
    <div
      className={cn(
        'p-4 text-sm',
        '[&_.line]:before:content-[counter(line)]',
        '[&_.line]:before:inline-block',
        '[&_.line]:before:[counter-increment:line]',
        '[&_.line]:before:w-4',
        '[&_.line]:before:mr-4',
        '[&_.line]:before:text-[13px]',
        '[&_.line]:before:text-right',
        '[&_.line]:before:text-muted-foreground/50',
        '[&_.line]:before:font-mono',
        '[&_.line]:before:select-none'
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
