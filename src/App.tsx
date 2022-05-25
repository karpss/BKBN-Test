/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { myTodo } from './interface';
import AddTodo from './components/AddTodo/AddTodo';
import EditTodo from './components/EditTodo/EditTodo';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<myTodo[]>([]);


  const todosUrl = 'http://localhost:3333/todos'

  useEffect(() => {
    axios.get(todosUrl)
    .then((todos) => setTodos(todos.data));

  }, []);

  console.log(todos);


  return (
    <div className="App">
      <AddTodo/>
      <EditTodo/>
      <TodoList/>
      
    </div>
  );
};

export default App;
