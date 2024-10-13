import type { FC, ReactNode } from 'react';

type TableProviderProps = {
  children: ReactNode;
};

export const TableProvider: FC<TableProviderProps> = ({ children }) => {
  return children;
};
