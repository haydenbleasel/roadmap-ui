'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { CheckIcon, CopyIcon } from 'lucide-react';
import type { ComponentProps, HTMLAttributes, ReactElement } from 'react';
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { type CodeOptionsMultipleThemes, codeToHtml } from 'shiki';

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

type CodeBlockContextType = {
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  value: undefined,
  onValueChange: undefined,
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> &
  CodeBlockContextType & {
    defaultValue?: string;
  };

export const CodeBlock = ({
  children,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultValue,
  className,
  ...props
}: CodeBlockProps) => {
  const [value, onValueChange] = useControllableState({
    defaultProp: defaultValue ?? '',
    prop: controlledValue,
    onChange: controlledOnValueChange,
  });

  return (
    <CodeBlockContext.Provider value={{ value, onValueChange }}>
      <div
        className={cn('overflow-hidden rounded-md border', className)}
        {...props}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  );
};

export type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CodeBlockHeader = ({
  className,
  ...props
}: CodeBlockHeaderProps) => (
  <div
    className={cn(
      'flex flex-row items-center border-b bg-secondary p-1',
      className
    )}
    {...props}
  />
);

export type CodeBlockFilenameProps = HTMLAttributes<HTMLDivElement> & {
  icon?: IconType;
  value?: string;
};

export const CodeBlockFilename = ({
  className,
  icon,
  value,
  children,
  ...props
}: CodeBlockFilenameProps) => {
  const { value: activeValue } = useContext(CodeBlockContext);
  const defaultIcon = Object.entries(filenameIconMap).find(([pattern]) => {
    const regex = new RegExp(
      `^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`
    );
    return regex.test(children as string);
  })?.[1];
  const Icon = icon ?? defaultIcon;

  if (value !== activeValue) {
    return null;
  }

  return (
    <div
      className="flex grow items-center gap-2 bg-secondary px-4 py-1.5 text-muted-foreground text-xs"
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="flex-1 truncate">{children}</span>
    </div>
  );
};

export type CodeBlockSelectProps = ComponentProps<typeof Select>;

export const CodeBlockSelect = ({
  children,
  ...props
}: CodeBlockSelectProps) => {
  const { value, onValueChange } = useContext(CodeBlockContext);

  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      {children}
    </Select>
  );
};

export type CodeBlockSelectTriggerProps = ComponentProps<typeof SelectTrigger>;

export const CodeBlockSelectTrigger = ({
  children,
  ...props
}: CodeBlockSelectTriggerProps) => (
  <SelectTrigger
    className="w-fit border-none text-muted-foreground text-xs shadow-none"
    {...props}
  >
    {children}
  </SelectTrigger>
);

export type CodeBlockSelectValueProps = ComponentProps<typeof SelectValue>;

export const CodeBlockSelectValue = ({
  children,
  ...props
}: CodeBlockSelectValueProps) => (
  <SelectValue {...props}>{children}</SelectValue>
);

export type CodeBlockSelectContentProps = ComponentProps<typeof SelectContent>;

export const CodeBlockSelectContent = ({
  children,
  ...props
}: CodeBlockSelectContentProps) => (
  <SelectContent {...props}>{children}</SelectContent>
);

export type CodeBlockSelectItemProps = ComponentProps<typeof SelectItem>;

export const CodeBlockSelectItem = ({
  children,
  className,
  ...props
}: CodeBlockSelectItemProps) => (
  <SelectItem className={cn('text-sm', className)} value={props.value}>
    {children}
  </SelectItem>
);

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  asChild,
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { value } = useContext(CodeBlockContext);

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
      className={cn('shrink-0', className)}
      {...props}
    >
      {children ?? <Icon size={14} className="text-muted-foreground" />}
    </Button>
  );
};

export type CodeBlockContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  themes?: CodeOptionsMultipleThemes['themes'];
  lineNumbers?: boolean;
};

export const CodeBlockContent = ({
  value,
  children,
  themes,
  className,
  lineNumbers = true,
  ...props
}: CodeBlockContentProps) => {
  const [html, setHtml] = useState<string | null>(null);
  const { value: activeValue } = useContext(CodeBlockContext);
  useEffect(() => {
    codeToHtml(children as string, {
      lang: 'javascript',
      themes: themes ?? {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
      ],
    })
      .then(setHtml)
      .catch(console.error);
  }, [children, themes]);

  if (value !== activeValue) {
    return null;
  }

  if (!html) {
    return (
      <div className={cn('mt-0 p-4 text-sm', className)} {...props}>
        <pre className="w-full">{children}</pre>
      </div>
    );
  }

  const lineNumberClassNames = cn(
    '[&_code]:[counter-reset:line]',
    '[&_code]:[counter-increment:line_0]',
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
  );

  return (
    <div
      className={cn(
        'mt-0 py-4 text-sm',
        '[&_code]:w-full',
        '[&_code]:grid',
        '[&_code]:overflow-x-auto',
        '[&_.line]:px-4',
        '[&_.line]:w-full',
        '[&_.line]:relative',
        '[&_.line.highlighted]:bg-blue-50',
        '[&_.line.highlighted]:after:absolute',
        '[&_.line.highlighted]:after:left-0',
        '[&_.line.highlighted]:after:top-0',
        '[&_.line.highlighted]:after:bottom-0',
        '[&_.line.highlighted]:after:w-0.5',
        '[&_.line.highlighted]:after:bg-blue-500',
        '[&_.line.diff.add]:bg-emerald-50',
        '[&_.line.diff.remove]:bg-rose-50',
        '[&_.highlighted-word]:bg-blue-50',
        '[&_code:has(.focused)_.line]:blur-sm',
        '[&_code:has(.focused)_.line.focused]:blur-none',
        lineNumbers && lineNumberClassNames,
        className
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: "Kinda how Shiki works"
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};
