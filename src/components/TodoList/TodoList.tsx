/* eslint-disable */
import React from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

type Props = {
  todos: myTodo[];
  handleTaskCompletion: (todo: myTodo) => void;
  handleEdit: (todo: myTodo) => void;
  handleDelete: (id: number | string) => void;
}

const TodoList: React.FC<Props> = ({todos, handleTaskCompletion,handleEdit,handleDelete }) => {

  console.log(todos);
  return (
      <div>
      
      <TodoItem/>
      
      </div>
  )
}

export default TodoList;