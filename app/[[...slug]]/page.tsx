import { CalendarExample } from '@/app/components/calendar';
import { GanttExample } from '@/app/components/gantt';
import { KanbanExample } from '@/app/components/kanban';
import { ListExampleBasic, ListExampleCustom } from '@/app/components/list';
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
import { TableExample } from '../components/table';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const components = {
  ...defaultMdxComponents,
  Gantt: GanttExample,
  Kanban: KanbanExample,
  Calendar: CalendarExample,
  List: {
    Basic: ListExampleBasic,
    Custom: ListExampleCustom,
  },
  Table: TableExample,
};

const Page: FC<PageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const Mdx = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk' }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <Mdx components={components} />
      </DocsBody>
    </DocsPage>
  );
};

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = async ({ params }: PageProps) => {
  const slug = (await params).slug;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
};

export default Page;
