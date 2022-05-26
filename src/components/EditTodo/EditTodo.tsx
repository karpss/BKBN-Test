/* eslint-disable */
import React from 'react';
import './EditTodo.css';

type Props = {
  currentTodo: myTodo;
  handleCancelEditTodo: () => void;
  handleEditTodoInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleUpdateTodo: (id: number | string, todo: myTodo) => void;
};

const EditTodo: React.FC<Props> = ({
  currentTodo,
  handleCancelEditTodo,
  handleUpdateTodo,
  handleEditTodoInputChange,
}) => {
  return (
    <div className="editFormContainer">
      <form>
        <input
          className="editFormInput"
          placeholder="Edit Your Todo"
          value={currentTodo.text}
          onChange={handleEditTodoInputChange}
        />
        <button
          type="button"
          className="updateButton"
          onClick={() => handleUpdateTodo(currentTodo.id, currentTodo)}
        >
          Update
        </button>
        <button
          type="button"
          className="updateButton"
          onClick={handleCancelEditTodo}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
