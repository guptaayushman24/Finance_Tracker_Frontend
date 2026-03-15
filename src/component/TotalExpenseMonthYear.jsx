import { useSelector } from "react-redux";
import "../css/TotalExpenseMonthYear.css"
function TotalExpenseMonthYear({ show, handleClose }) {
  const currentDate = new Date();
  const firstName = useSelector((state) => state.profile.firstName);
  const lastName = useSelector((state) => state.profile.lastName);
  const totalExpenseByCurrentYear = useSelector((state) => state.profile.totalExpenseByCurrentYear);
  const totalExpenseByMonthCurrentYear = useSelector((state) => state.profile.totalExpenseByMonth);

  return (
    <div className="expense-summary-card">
      <button className="close-btn" onClick={handleClose}>✕</button>
      <div className="expense-header">
        <h4>Hi {firstName + " " + lastName}👋</h4>
      </div>

      <div className="expense-main">
        <p className="label">Total Expense in {currentDate.getFullYear()}</p>
        <h1 className="amount">₹ {totalExpenseByCurrentYear}</h1>
      </div>

      <div className="expense-divider"></div>

      <div className="expense-month">
        <p>Total Expense in {currentDate.toLocaleString('default',{month:'long'})} Month</p>
        <h4>₹ {totalExpenseByMonthCurrentYear}</h4>
      </div>

    </div>
  )
}

export default TotalExpenseMonthYear;