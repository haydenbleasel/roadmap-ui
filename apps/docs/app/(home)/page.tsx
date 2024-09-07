import type { Metadata } from 'next';
import Image from 'next/image';
import { GanttExample } from '../components/gantt';

import { CopyIcon } from 'lucide-react';
import BunLogo from './bun.svg';
import EververseLogo from './eververse.png';
import GanttLogo from './gantt.svg';
import GithubLogo from './github.svg';
import ReactLogo from './react.svg';

export const metadata: Metadata = {
  title: 'Roadmap UI',
  description:
    'A collection of accessible, customizable, performant and open source components built for Eververse.',
};

export default function HomePage() {
  return (
    <>
      <section className="container mx-auto flex max-w-5xl flex-col items-center gap-2 py-8 md:py-12 lg:py-16">
        <div className="mb-8 inline-flex items-center rounded-full border border-primary px-2.5 py-0.5 font-semibold text-primary text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          Coming Soon
        </div>
        <h1 className="text-center font-bold text-3xl leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Composable{' '}
          <Image
            src={ReactLogo}
            alt=""
            width={48}
            height={48}
            className="inline-block align-baseline"
          />{' '}
          React components for building interactive{' '}
          <Image
            src={GanttLogo}
            alt=""
            width={48}
            height={48}
            className="-rotate-6 ml-2 inline-block translate-y-1 align-baseline"
          />{' '}
          roadmaps.
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-center text-lg text-muted-foreground sm:text-xl">
          A collection of accessible, customizable, performant and open source
          components built for{' '}
          <a href="https://www.eververse.ai" target="_blank" rel="noreferrer">
            <Image
              src={EververseLogo}
              alt=""
              width={16}
              height={16}
              className="inline-block align-baseline"
            />{' '}
            Eververse.
          </a>
        </p>
        <div className="mt-4 flex w-full items-center justify-center space-x-4">
          <div className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <Image src={BunLogo} alt="Bun" width={16} height={16} />
            <div className="text-muted-foreground">
              <span className="text-foreground">bun</span> add roadmap-ui
            </div>
            <button
              className="relative z-10 inline-flex h-6 w-6 items-center justify-center whitespace-nowrap rounded-md font-medium text-sm ring-offset-background transition-colors hover:bg-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="button"
              id="radix-:Rj3ffadta:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <CopyIcon size={16} className="text-muted-foreground" />
              <span className="sr-only">Copy</span>
            </button>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            className="!py-0 group relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="https://github.com/haydenbleasel/roadmap-ui"
          >
            <div className="flex h-full items-center gap-2">
              <Image src={GithubLogo} alt="Github" width={16} height={16} />
              <div className="hidden md:[display:unset]">GitHub</div>
              <div className="mx-2 hidden h-full w-px bg-input group-hover:bg-foreground md:[display:unset]" />
              <div>2.4K</div>
            </div>
          </a>
        </div>
      </section>
      <section className="container mx-auto">
        <div className="mt-8 flex h-[500px] w-full flex-col overflow-clip rounded-xl border bg-white">
          <GanttExample />
        </div>
      </section>
    </>
  );
}
