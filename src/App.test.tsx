import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const headerElement = screen.getByText(/Todo List/i);
  expect(headerElement).toBeInTheDocument();
});
