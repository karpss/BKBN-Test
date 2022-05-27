/* eslint-disable */
import React from 'react';
import { screen, render, fireEvent } from "@testing-library/react";
import AddTodo from '../AddTodo';

describe("Add Todo", () => {
it('should render input element', () => {
    render(
        <AddTodo 
            todo=''
            handleSubmission={() => {}}
            handleInputChange={() => {}}
        />
    );
    const inputElement = screen.getByPlaceholderText(/Enter Your Todo/i);
    expect(inputElement).toBeInTheDocument();
});


it('will not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(
        <AddTodo 
            todo=''
            handleSubmission={() => {}}
            handleInputChange={() => {}}
        />
    );
    const buttonElement = screen.getByText('Add');
    fireEvent.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
  });
});

  
  