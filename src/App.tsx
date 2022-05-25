/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import AddTodo from './components/AddTodo/AddTodo';
import EditTodo from './components/EditTodo/EditTodo';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<myTodo[]>([]);
  const [todo, setTodo] = useState('');
  const [edit, setEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<myTodo>({
    id: '',
    text: '',
    complete: false,

  })


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

  const handleTaskCompletion = (todo: myTodo) => {
    setTodos(
      todos.map((task) => {
        return todo.id === task.id
          ? { ...task, complete: !task.complete }
          : task;
      })
    );
    axios.put(`${todosUrl}/${todo.id}`, {
      ...todo,
      complete: true,
    });
  }

  const handleEdit = (todo: myTodo) => { 
    setEdit(true);
    setCurrentTodo({ ...todo });

    
  }

  const handleDelete = (id:number | string) => {
    axios.delete(`${todosUrl}/${id}`);

    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filteredTodos);
    
  }

  console.log(todos);


  return (
    <div className="Container">
      {edit ? (
      <div>
      <EditTodo/>
      </div>
      ) : (
      <div>
      <AddTodo
      todo={todo}
      handleSubmission={handleSubmission}
      handleInputChange={handleInputChange}
      />
      
      <TodoList
      todos={todos}
      handleTaskCompletion={handleTaskCompletion}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
      </div>
      )}
    </div>
  );
};

export default App;
