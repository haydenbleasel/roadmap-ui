import { cn } from '@repo/shadcn-ui/lib/utils';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '../../../components/header';
import { Installer } from '../../../components/installer';
import { PoweredBy } from '../../../components/powered-by';
import { Preview } from '../../../components/preview';
import { source } from '../../../lib/source';

const components = {
  ...defaultMdxComponents,
  Installer,
  Preview,
  PoweredBy,
};

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <div className="relative w-full bg-background md:mt-4 md:overflow-clip md:rounded-tl-2xl md:border-t md:border-l">
      <Header />
      <div className="relative z-10 grid xl:grid-cols-[1fr_268px]">
        <DocsPage
          toc={page.data.toc}
          full={page.data.full}
          tableOfContent={{ style: 'clerk' }}
        >
          <DocsTitle className="tracking-tighter lg:text-4xl">
            {page.data.title}
          </DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
          <DocsBody
            className={cn(
              'prose-h2:tracking-tighter',
              'prose-a:border-fd-primary prose-a:border-b-px prose-a:font-semibold prose-a:text-foreground prose-a:decoration-none prose-a:transition-all hover:prose-a:border-b-2'
            )}
          >
            <MDX components={{ ...defaultMdxComponents, ...components }} />
          </DocsBody>
        </DocsPage>
      </div>
    </div>
  );
}

export const generateStaticParams = async () => source.generateParams();

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'website',
      images: [
        {
          url: `/og?slug=${params.slug?.join('/') ?? ''}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
