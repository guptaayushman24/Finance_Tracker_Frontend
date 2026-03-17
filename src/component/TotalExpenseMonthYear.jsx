import { useSelector } from "react-redux";
import "../css/TotalExpenseMonthYear.css";
function TotalExpenseMonthYear({ show, handleClose }) {
  const currentDate = new Date();
  const firstName = useSelector((state) => state.profile.firstName);
  const lastName = useSelector((state) => state.profile.lastName);
  const totalExpenseByCurrentYear = useSelector(
    (state) => state.profile.totalExpenseByCurrentYear,
  );
  const totalExpenseByMonthCurrentYear = useSelector(
    (state) => state.profile.totalExpenseByMonth,
  );

  const totalExpenseCurrentYearByUPI = useSelector(
    (state)=>state.profile.totalExpenseByCurrentYearPaymentModeUPI
  )

  const totalExpenseCurrentYearByCASH = useSelector(
    (state)=>state.profile.totalExpenseByCurrentYearPaymentModeCASH
  )

  
  return (
    <div className="expense-summary-card">
      <button className="close-btn" onClick={handleClose}>
        ✕
      </button>
      <div className="expense-header">
        <h4>Hi {firstName + " " + lastName}👋</h4>

        <div className="expense-header-payment-mode">
          <div className="payment-mode">
            <p>Expense by UPI</p>
            <p>₹{totalExpenseCurrentYearByUPI}</p>
          </div>
          <div className="payment-mode">
            <p>Expense by CASH</p>
            <p>₹{totalExpenseCurrentYearByCASH}</p>
          </div>
        </div>
      </div>

      <div className="expense-main">
        <p className="label">Total Expense in {currentDate.getFullYear()}</p>
        <h1 className="amount">₹ {totalExpenseByCurrentYear}</h1>
      </div>

      <div className="expense-divider"></div>

      <div className="expense-month">
        <p>
          {currentDate.toLocaleString("default", { month: "long" })} Month
        </p>
        <h4 className="amount">₹ {totalExpenseByMonthCurrentYear}</h4>
      </div>
    </div>
  );
}

export default TotalExpenseMonthYear;
