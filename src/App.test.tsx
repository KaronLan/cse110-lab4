import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Create expenses', () => {
  test('create an expense', () =>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    expect(createExpenseButton).toBeInTheDocument;
    const expenseNameInput = screen.getByTestId("name-input");
    expect(expenseNameInput).toBeInTheDocument;
    const expenseCostInput = screen.getByTestId("cost-input");
    expect(expenseCostInput).toBeInTheDocument;
    fireEvent.change(expenseNameInput,{target:{value:"Food"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    const newexpense = screen.getByText("Spent so far: $50");
    expect(newexpense).toBeInTheDocument;
  })

  test('create several expenses', () =>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food1"}});
    fireEvent.change(expenseCostInput, {target:{value: 25}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Food2"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    const newexpense1 = screen.getByText("Spent so far: $75");
    expect(newexpense1).toBeInTheDocument;
    fireEvent.change(expenseNameInput,{target:{value:"Food3"}});
    fireEvent.change(expenseCostInput, {target:{value: 75}});
    fireEvent.click(createExpenseButton);
    const newexpense2 = screen.getByText("Spent so far: $150");
    expect(newexpense2).toBeInTheDocument;
    
  })
})

describe('Delete expenses', () => {
  test('Delete an expense', () =>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    const newexpense1 = screen.getByText("Spent so far: $50");
    expect(newexpense1).toBeInTheDocument;
    const deleteNoteButton = screen.getAllByText("x");
    deleteNoteButton.forEach(button => {
      fireEvent.click(button);
    });
    const newexpense2 = screen.getByText("Spent so far: $0");
    expect(newexpense2).toBeInTheDocument;
  })

  test('Clear all expenses', () =>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food1"}});
    fireEvent.change(expenseCostInput, {target:{value: 25}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Food2"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Food3"}});
    fireEvent.change(expenseCostInput, {target:{value: 75}});
    fireEvent.click(createExpenseButton);
    const newexpense1 = screen.getByText("Spent so far: $150");
    expect(newexpense1).toBeInTheDocument;
    const deleteNoteButton = screen.getAllByText("x");
    fireEvent.click(deleteNoteButton[0])
    const newexpense2 = screen.getByText("Spent so far: $75");
    expect(newexpense2).toBeInTheDocument;
    fireEvent.click(deleteNoteButton[0])
    const newexpense3 = screen.getByText("Spent so far: $25");
    expect(newexpense3).toBeInTheDocument;
    fireEvent.click(deleteNoteButton[0])
    const newexpense4 = screen.getByText("Spent so far: $0");
    expect(newexpense4).toBeInTheDocument;
  })
  test('Delete and add expenses', () =>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food1"}});
    fireEvent.change(expenseCostInput, {target:{value: 25}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Food2"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    const newexpense1 = screen.getByText("Spent so far: $75");
    expect(newexpense1).toBeInTheDocument;
    const deleteNoteButton = screen.getAllByText("x");
    fireEvent.click(deleteNoteButton[0])
    const newexpense2 = screen.getByText("Spent so far: $25");
    expect(newexpense2).toBeInTheDocument;
    fireEvent.change(expenseNameInput,{target:{value:"Food3"}});
    fireEvent.change(expenseCostInput, {target:{value: 75}});
    fireEvent.click(createExpenseButton);
    const newexpense3 = screen.getByText("Spent so far: $100");
    expect(newexpense3).toBeInTheDocument;
  })

})


describe('Budget Balance Verification',() =>{
  test('Budget basic test',() => {
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    const newexpense1 = screen.getByText("Spent so far: $50");
    const newRemain1 = screen.getByText("Remaining: $950");
    expect(newRemain1).toBeInTheDocument;
    expect(newexpense1).toBeInTheDocument;
  })
  test('budget add several items', ()=>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Housing"}});
    fireEvent.change(expenseCostInput, {target:{value: 800}});
    fireEvent.click(createExpenseButton);
    const newexpense1 = screen.getByText("Spent so far: $850");
    expect(newexpense1).toBeInTheDocument;
    const newRemain1 = screen.getByText("Remaining: $150");
    expect(newRemain1).toBeInTheDocument;    
  })

  test('budget zero remain', ()=>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Food"}});
    fireEvent.change(expenseCostInput, {target:{value: 50}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Housing"}});
    fireEvent.change(expenseCostInput, {target:{value: 950}});
    fireEvent.click(createExpenseButton);
    const newexpense = screen.getByText("Spent so far: $1000");
    expect(newexpense).toBeInTheDocument;
    const newRemain = screen.getByText("Remaining: $0");
    expect(newRemain).toBeInTheDocument;
  })

  test('negative remain', ()=>{
    render(<App />);
    const createExpenseButton = screen.getByText("Save");
    const expenseNameInput = screen.getByTestId("name-input");
    const expenseCostInput = screen.getByTestId("cost-input");
    fireEvent.change(expenseNameInput,{target:{value:"Clear Budget"}});
    fireEvent.change(expenseCostInput, {target:{value: 1000}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(expenseNameInput,{target:{value:"Exceed Budget"}});
    fireEvent.change(expenseCostInput, {target:{value: 150}});
    fireEvent.click(createExpenseButton);
    const newexpense4 = screen.getByText("Spent so far: $1150");
    expect(newexpense4).toBeInTheDocument;
    const newRemain4 = screen.getByText("Remaining: $-150");
    expect(newRemain4).toBeInTheDocument;
    
  })
  
})
