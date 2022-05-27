/* eslint-disable */
import { render, screen } from "@testing-library/react";
import { mockData } from "../../../mockData";
import TodoItem from "../TodoItem";

describe("Todo Item", () => {
    test("renders Todo Text", () => {
      render(<TodoItem 
      
        handleTaskCompletion={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
        todo={mockData.tod}
        

      
      />);
      const todoText = screen.getByText(/^Check on Tim/i); 
      expect(todoText).toBeInTheDocument();

    });
  });