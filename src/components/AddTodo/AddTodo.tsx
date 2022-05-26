/* eslint-disable */
import React, {FormEvent} from 'react';
import './AddTodo.css';


type Props = {
  handleSubmission: (e: FormEvent, todo: string) => void ;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  todo: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

const AddTodo: React.FC<Props> = ({handleSubmission, handleInputChange,todo, inputRef }) => {
  return (
     <div className='formContainer'>
      <form>
        <input
        className='formInput'
        value={todo}
        onChange={handleInputChange}
        placeholder="Enter Your Todo"
        ref={inputRef}
        
        
        />
        
        <button disabled={!todo} onClick={(e) => handleSubmission(e, todo)} className='formButton'>Add</button>



        </form>
      </div>
  )
}

export default AddTodo;