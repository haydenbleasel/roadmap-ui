import Link from 'next/link';
import type { FC } from 'react';
import { RoadmapUiIcon } from './icons';

export const Logo: FC = () => (
  <Link href="/" className="flex items-center gap-2">
    <RoadmapUiIcon className="w-6 h-6" />
    <span className="font-semibold">Roadmap UI</span>
  </Link>
);
