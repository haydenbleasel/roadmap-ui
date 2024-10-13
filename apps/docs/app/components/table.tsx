'use client';

import { exampleFeatures } from '@/lib/content';
import * as Table from '@repo/table';
import { type FC, useState } from 'react';

export const TableExampleBasic: FC = () => {
  const [features, setFeatures] = useState(exampleFeatures);

  const columns: Table.ColumnDef<(typeof exampleFeatures)[number]>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <Table.TableHeader column={column} title="ID" />,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Table.TableHeader column={column} title="Name" />
      ),
    },
    {
      id: 'status',
      accessorFn: (row) => row.status.id,
      header: ({ column }) => (
        <Table.TableHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div
          className="px-2.5 py-0.5 rounded-full inline-flex items-center text-xs"
          style={{
            backgroundColor: `${row.original.status.color}1A`,
            color: row.original.status.color,
          }}
        >
          {row.original.status.name}
        </div>
      ),
    },
    {
      accessorKey: 'startAt',
      header: ({ column }) => (
        <Table.TableHeader column={column} title="Start At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.startAt),
    },
    {
      accessorKey: 'endAt',
      header: ({ column }) => (
        <Table.TableHeader column={column} title="End At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.endAt),
    },
  ];

  return (
    <Table.TableProvider>
      <Table.TableBody columns={columns} data={features} />
    </Table.TableProvider>
  );
};
