import { type FC, useId } from 'react';
import { Column } from './column';

type ColumnsProps = {
  columns: number;
  isColumnSecondary?: (item: number) => boolean;
};

export const Columns: FC<ColumnsProps> = ({ columns, isColumnSecondary }) => {
  const id = useId();

  return (
    <div
      className="divide grid h-full w-full divide-x divide-border/50"
      style={{
        gridTemplateColumns: `repeat(${columns}, var(--gantt-column-width))`,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <Column
          key={`${id}-${index}`}
          index={index}
          isColumnSecondary={isColumnSecondary}
        />
      ))}
    </div>
  );
};
