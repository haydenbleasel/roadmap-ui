import { GitHubIcon } from '@/app/components/icons';
import { Octokit } from '@octokit/rest';
import type { ReactElement } from 'react';

export const GitHubButton = async (): Promise<ReactElement> => {
  const octokit = new Octokit();

  const { data } = await octokit.repos.get({
    owner: 'haydenbleasel',
    // repo: 'roadmap-ui',
    repo: 'next-forge',
  });

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      href={data.html_url}
    >
      <div className="flex h-full items-center gap-2">
        <GitHubIcon className="w-4 h-4" />
        <div className="hidden md:[display:unset]">GitHub</div>
        <div className="mx-2 hidden h-full w-px bg-border md:[display:unset]" />
        <div>{data.stargazers_count}</div>
      </div>
    </a>
  );
};
