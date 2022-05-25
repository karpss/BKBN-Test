/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { myTodo } from './interface';
import AddTodo from './components/AddTodo/AddTodo';
import EditTodo from './components/EditTodo/EditTodo';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<myTodo[]>([]);
  const [todo, setTodo] = useState('');



  const todosUrl = 'http://localhost:3333/todos'

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get(todosUrl)
    .then((todos) => setTodos(todos.data));

  }, []);

  const handleSubmission = async (e:React.FormEvent, todo:string) =>{
    e.preventDefault()
    if (!todo){
      return("Todo is empty");
    }
    await axios.post(
      todosUrl,{
        text: todo,
        complete:false,
        timestampDue:(new Date()),
      }
    )

    .then((response) => setTodos([...todos, response.data]));

    setTodo('');
    inputRef.current?.focus();

  }

  const handleInputChange =(e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);

  }

  console.log(todos);


  return (
    <div className="Container">
      <AddTodo
      todo={todo}
      handleSubmission={handleSubmission}
      handleInputChange={handleInputChange}
      
      
      />
      <EditTodo/>
      <TodoList/>
      
    </div>
  );
};

export default App;
