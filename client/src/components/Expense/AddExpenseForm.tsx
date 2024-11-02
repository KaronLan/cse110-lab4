import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  const {expenses, setExpenses} = useContext(AppContext);
  
  // Exercise: Create name and cost to state variables
  const [name, setName]:[string, any] = useState("");
  const [cost, setCost]:[number, any]= useState(0);
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const initialexpense:Expense = {
      id: Date.now().toString(36),
      // name: name,
      description: name,
      cost: Number(cost)
    }
    createExpense(initialexpense);
    setExpenses([initialexpense,...expenses])
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            data-testid="name-input"
            // HINT: onChange={}
            onChange={(event) => 
              setName(event.target.value)
            }
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            // value={0}
            data-testid="cost-input"
            // HINT: onChange={}
            onChange={(event) => 
              setCost(event.target.value)
            }
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
