import { GithubIcon, XIcon } from 'lucide-react';
import type { FC } from 'react';
import { ModeToggle } from './mode-toggle';

export const Navbar: FC = () => (
  <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-screen-2xl items-center">
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <nav className="flex items-center">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/haydenbleasel/roadmap-ui"
          >
            <div className="inline-flex h-10 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <GithubIcon size={16} />
              <span className="sr-only">GitHub</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://x.com/haydenbleasel"
          >
            <div className="inline-flex h-10 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <XIcon size={16} />
              <span className="sr-only">X</span>
            </div>
          </a>
        </nav>
      </div>
      <ModeToggle />
    </div>
  </header>
);
