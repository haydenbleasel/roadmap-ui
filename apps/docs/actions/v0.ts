'use server';

import { track } from '@vercel/analytics/server';
import ky from 'ky';
import { env } from '../env';

type OpenInV0Props = {
  name: string;
  style?: 'new-york' | 'default';
  url: string;
};

const createV0Url = async (payload: object) => {
  const response = await ky
    .post(`${process.env.V0_URL}/chat/api/open-in-v0`, {
      body: JSON.stringify(payload),
      headers: {
        'x-v0-edit-secret': env.V0_EDIT_SECRET,
        'x-vercel-protection-bypass':
          env.DEPLOYMENT_PROTECTION_BYPASS || 'not-set',
      },
    })
    .json<{
      // need better payload types
      id: string;
    }>();

  return {
    ...response,
    url: `${process.env.V0_URL}/chat/api/open-in-v0/${response.id}`,
  };
};

const loadComponent = async (name: string) => {
  const component = await import(`../public/registry/${name}.json`);

  return component as {
    name: string;
    description: string;
    files: {
      content: string;
    }[];
  };
};

export const openInV0 = async ({
  name,
  style = 'new-york',
  url,
}: OpenInV0Props): Promise<
  | {
      error: string;
    }
  | {
      url: string;
    }
> => {
  try {
    const component = await loadComponent(name);

    if (process.env.NODE_ENV === 'production') {
      await track('edit_in_v0', {
        name,
        title: component.name,
        description: component.description,
        style,
        url,
      });
    }

    const payload = {
      version: 2,
      payload: component,
      source: {
        title: 'kibo-ui',
        url,
      },
      meta: {
        project: name,
        file: `${name}.tsx`,
      },
    };

    const response = await createV0Url(payload);

    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again later.';

    return { error: message };
  }
};
