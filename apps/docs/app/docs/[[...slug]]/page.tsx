import { GanttExample } from '@/app/components/gantt';
import { KanbanExample } from '@/app/components/kanban';
import { source } from '@/app/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

type PageProps = {
  params: { slug?: string[] };
};

const components = {
  ...defaultMdxComponents,
  Gantt: GanttExample,
  Kanban: KanbanExample,
};

const Page: FC<PageProps> = ({ params }) => {
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const Mdx = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <Mdx components={components} />
      </DocsBody>
    </DocsPage>
  );
};

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = ({
  params,
}: {
  params: { slug?: string[] };
}) => {
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
};

export default Page;
