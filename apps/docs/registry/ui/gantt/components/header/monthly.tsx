import { format } from 'date-fns';
import { type FC, useContext } from 'react';
import { GanttContext } from '../../contexts/gantt-context';
import { Columns } from '../columns';
import { GanttContentHeader } from './header';

export const MonthlyHeader: FC = () => {
  const gantt = useContext(GanttContext);

  return gantt.timelineData.map((year) => (
    <div className="relative flex flex-col" key={year.year}>
      <GanttContentHeader
        title={`${year.year}`}
        columns={year.quarters.flatMap((quarter) => quarter.months).length}
        renderHeaderItem={(item: number) => (
          <p>{format(new Date(year.year, item, 1), 'MMM')}</p>
        )}
      />
      <Columns
        columns={year.quarters.flatMap((quarter) => quarter.months).length}
      />
    </div>
  ));
};
