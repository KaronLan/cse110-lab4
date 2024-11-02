import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  // let budget = 1000;
  const budget = useContext(AppContext).budget;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost); 
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  if(totalExpenses > budget){
    alert("You have exceeded your budget!")
  }
  return (
    <div className={`alert ${alertType}`}>
      <span  data-testid="remaining">Remaining: ${budget - totalExpenses}</span>
      
    </div>
  );
};

export default Remaining;