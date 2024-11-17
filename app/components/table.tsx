'use client';

import { exampleFeatures } from '@/lib/content';
import * as Table from '@roadmap-ui/table';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';

export const TableExampleBasic: FC = () => {
  const columns: Table.ColumnDef<(typeof exampleFeatures)[number]>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <Table.ColumnHeader column={column} title="ID" />,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Table.ColumnHeader column={column} title="Name" />
      ),
    },
    {
      id: 'status',
      accessorFn: (row) => row.status.id,
      header: ({ column }) => (
        <Table.ColumnHeader column={column} title="Status" />
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
        <Table.ColumnHeader column={column} title="Start At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.startAt),
    },
    {
      accessorKey: 'endAt',
      header: ({ column }) => (
        <Table.ColumnHeader column={column} title="End At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.endAt),
    },
  ];

  return (
    <Table.TableProvider columns={columns} data={exampleFeatures}>
      <Table.TableHeader />
      <Table.TableBody />
    </Table.TableProvider>
  );
};

export const TableExampleCustom: FC = () => {
  const columns: Table.ColumnDef<(typeof exampleFeatures)[number]>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Table.ColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={row.original.owner.image}
              alt={row.original.owner.name}
              width={24}
              height={24}
              unoptimized
              className="rounded-full w-6 h-6"
            />
            <div
              className="w-2 h-2 ring-2 ring-background rounded-full absolute bottom-0 right-0"
              style={{
                backgroundColor: row.original.status.color,
              }}
            />
          </div>
          <div>
            <span className="font-medium">{row.original.name}</span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>{row.original.product.name}</span>
              <ChevronRightIcon size={12} />
              <span>{row.original.group.name}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'startAt',
      header: ({ column }) => (
        <Table.ColumnHeader column={column} title="Start At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.startAt),
    },
    {
      accessorKey: 'endAt',
      header: ({ column }) => (
        <Table.ColumnHeader column={column} title="End At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.endAt),
    },
  ];

  return (
    <Table.TableProvider columns={columns} data={exampleFeatures}>
      <Table.TableHeader />
      <Table.TableBody />
    </Table.TableProvider>
  );
};
