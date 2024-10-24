import { CalendarBasic, CalendarWithoutMonth } from '@/app/components/calendar';
import {
  GanttExampleBasic,
  GanttExampleCustom,
  GanttExampleSimple,
} from '@/app/components/gantt';
import {
  KanbanExampleBasic,
  KanbanExampleCustom,
} from '@/app/components/kanban';
import { ListExampleBasic, ListExampleCustom } from '@/app/components/list';
import { TableExampleBasic, TableExampleCustom } from '@/app/components/table';
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
  Gantt: {
    Basic: GanttExampleBasic,
    Custom: GanttExampleCustom,
    Simple: GanttExampleSimple,
  },
  Kanban: {
    Basic: KanbanExampleBasic,
    Custom: KanbanExampleCustom,
  },
  Calendar: {
    Basic: CalendarBasic,
    WithoutMonth: CalendarWithoutMonth,
  },
  List: {
    Basic: ListExampleBasic,
    Custom: ListExampleCustom,
  },
  Table: {
    Basic: TableExampleBasic,
    Custom: TableExampleCustom,
  },
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
