/* eslint-disable */
import React from 'react';
import './TodoItem.css';


type Props = {
  todo: myTodo;
  handleTaskCompletion:(todo: myTodo) => void;
  handleEdit: (todo: myTodo) => void;
  handleDelete: (id: number | string) => void;
}

const TodoItem: React.FC<Props> = ({todo, handleTaskCompletion, handleEdit, handleDelete}) => {

  return (
    <div className='todoItem'>
      <div onClick={() => handleTaskCompletion(todo)}
         style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
      {todo.text}<br/>
      {todo.timestampDue}
      </div>
      <div>
      <button className='itemButton' onClick={() => handleEdit(todo)}>Edit</button>
      </div>
      <div>
      <button className='itemButton' onClick={() => handleDelete(todo.id)} >Delete</button>
      </div>
      </div>
      
  )
}

export default TodoItem;