import AddExpenseForm from "../components/Expense/AddExpenseForm";
import Budget from "../components/Budget/Budget";
import ExpenseList from "../components/Expense/ExpenseList";
import ExpenseTotal from "../components/Expense/ExpenseTotal";
import Remaining from "../components/Remaining";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export const MyBudgetTracker = () => {
  const { budget,setBudget } = useContext(AppContext);
  const [budgetfiller, setBudgetFiller] = useState(0);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(budgetfiller);
  };
  return (
    <div className="container">
      <h1 className="mt-3">My Budget Planner</h1>
      <div className="row mt-3">
        <div className="col-sm">
          <Budget />
        </div>
        <div className="col-sm">
          <Remaining />
        </div>
        <div className="col-sm">
          <ExpenseTotal />
        </div>
      </div>
      <h3 className="mt-3">Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <ExpenseList />
        </div>
      </div>
      <h3 className="mt-3">Add Expense</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <AddExpenseForm />
        </div>
      </div>
      <h3 className="mt-3" >Update Budget</h3>
      <form onSubmit={(event) => onSubmit(event)}>
      <div className="col-sm"><input
        onChange={(event) => 
          setBudgetFiller(Number(event.target.value))
        }
        ></input></div>
        <button type="submit" className="btn btn-primary mt-3">Update Budget</button>
      </form>
        
    </div>
  );
};


