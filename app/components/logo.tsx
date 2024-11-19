import { SquareChartGanttIcon } from 'lucide-react';
import type { FC } from 'react';

export const Logo: FC = () => (
  <div className="flex items-center gap-2">
    <SquareChartGanttIcon className="h-6 w-6" />
    <span className="font-semibold">Roadmap UI</span>
  </div>
);
