import * as Kanban from '@repo/kanban';
import type { FC } from 'react';

export const KanbanExample: FC = () => (
  <Kanban.KanbanProvider>
    <Kanban.KanbanBoard id="1" name="Board" color="red">
      <p>hello</p>
    </Kanban.KanbanBoard>
  </Kanban.KanbanProvider>
);
