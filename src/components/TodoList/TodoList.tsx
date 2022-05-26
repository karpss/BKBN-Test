/* eslint-disable */
import React from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

type Props = {
  todos: myTodo[];
  handleTaskCompletion: (todo: myTodo) => void;
  handleEdit: (todo: myTodo) => void;
  handleDelete: (id: number | string) => void;
};

const TodoList: React.FC<Props> = ({
  todos,
  handleTaskCompletion,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleTaskCompletion={handleTaskCompletion}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
