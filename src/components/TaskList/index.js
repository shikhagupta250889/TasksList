import React, { Fragment } from 'react';
import TaskItem from '../Task/';

export default function TaskList({ items, onStatusChange, onRemove }) {
  return(
    <ul>
      {items.map(
        item => <TaskItem key={item.id} item={item} onStatusChange={onStatusChange} onRemove={onRemove} />
      )}
    </ul>
  );
}
