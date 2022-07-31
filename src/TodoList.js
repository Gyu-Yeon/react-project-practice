import TodoListItem from './TodoListItem';
import './TodoList.scss';
import React from 'react';

const TodoList = ({ todos, onClickRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => {
        return (
          <TodoListItem
            todo={todo}
            key={todo.id}
            onClickRemove={onClickRemove}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
};

export default React.memo(TodoList);
