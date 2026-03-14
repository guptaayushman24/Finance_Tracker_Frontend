import { useSelector } from "react-redux";
import "../css/TotalExpenseMonthYear.css"
function TotalExpenseMonthYear({show,handleClose}) {
  const firstName = useSelector((state)=>state.profile.firstName);
  const lastName = useSelector((state)=>state.profile.lastName);

  
  return (
    <div className="expense-summary-card">

      <div className="expense-header">
        <h4>Hi {firstName +" "+lastName}👋</h4>
      </div>

      <div className="expense-main">
        <p className="label">Total Expense</p>
        <h1 className="amount">₹ {}</h1>
      </div>

      <div className="expense-divider"></div>

      <div className="expense-month">
        <p>This Month</p>
        <h4>₹ {}</h4>
      </div>

    </div>
  )
}

export default TotalExpenseMonthYear;