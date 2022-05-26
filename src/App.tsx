/* eslint-disable */
import React, {useEffect, useState, useRef, useCallback} from 'react';
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
  });

  const todosUrl = 'http://localhost:3333/todos';

  const inputRef = useRef<HTMLInputElement>(null);

  const fetchCharacterInfo = useCallback(async () => {
    await axios
      .get(todosUrl)
      .then((todos) => setTodos(todos.data))
      .catch(() => {
        throw new Error('API error');
      });
  }, []);

  useEffect(() => {
    fetchCharacterInfo();
  }, [fetchCharacterInfo]);

  const handleSubmission = async (e: React.FormEvent, todo: string) => {
    e.preventDefault();
    if (!todo) {
      return 'Todo is empty';
    }
    await axios
      .post(todosUrl, {
        text: todo,
        complete: false,
        timestampDue: new Date().toLocaleString(),
      })

      .then((response) => setTodos([...todos, response.data]));

    setTodo('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTodo(e.currentTarget.value);
  };

  const handleTaskCompletion = (todo: myTodo): void => {
    setTodos(
      todos.map((task) => {
        return todo.id === task.id ? {...task, complete: !task.complete} : task;
      })
    );
    axios.put(`${todosUrl}/${todo.id}`, {
      ...todo,
      complete: true,
    });
  };

  const handleEdit = (todo: myTodo): void => {
    setEdit(true);
    setCurrentTodo({...todo});
  };

  const handleDelete = (id: number | string): void => {
    axios.delete(`${todosUrl}/${id}`);

    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filteredTodos);
  };

  const handleCancelEditTodo = (): void => {
    setEdit(false);
  };

  const handleUpdateTodo = (id: number | string, currentTodo: myTodo): void => {
    axios.put(`${todosUrl}/${id}`, {
      ...currentTodo,
    });

    const updateTodo = todos.map((todo) => {
      return todo.id === id ? currentTodo : todo;
    });

    setEdit(false);
    setTodos(updateTodo);
  };

  const handleEditTodoInputChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setCurrentTodo({...currentTodo, text: e.currentTarget.value});
  };

  return (
    <div className="Container">
      <h1>Todo List</h1>
      {edit ? (
        <div>
          <EditTodo
            currentTodo={currentTodo}
            handleCancelEditTodo={handleCancelEditTodo}
            handleUpdateTodo={handleUpdateTodo}
            handleEditTodoInputChange={handleEditTodoInputChange}
          />
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
