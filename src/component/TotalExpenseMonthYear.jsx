import { useSelector } from "react-redux";
import "../css/TotalExpenseMonthYear.css";
import { current } from "@reduxjs/toolkit";
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
    (state) => state.profile.totalExpenseByCurrentYearPaymentModeUPI,
  );

  const totalExpenseCurrentYearByCASH = useSelector(
    (state) => state.profile.totalExpenseByCurrentYearPaymentModeCASH,
  );

  const totalExpenseCurrentMonthByUPI = useSelector(
    (state) => state.profile.totalExpenseByCurrentMonthPaymentModeUPI
  )

  const totalExpenseCurrentMonthByCASH = useSelector(
    (state) => state.profile.totalExpenseByCurrentMonthPaymentModeCASH
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
            <p>Expense By UPI in {currentDate.getFullYear()}</p>
            <p>₹{totalExpenseCurrentYearByUPI}</p>
          </div>
          <div className="payment-mode">
            <p>Expense by CASH in {currentDate.getFullYear()}</p>
            <p>₹{totalExpenseCurrentYearByCASH}</p>
          </div>
        </div>
      </div>

      <div className="expense-main">
        <p className="label">Total Expense in {currentDate.getFullYear()}</p>
        <h1 className="amount">₹ {totalExpenseByCurrentYear}</h1>
      </div>

      <div className="expense-divider"></div>

      <div className="expense-month-parent">
        <div className="expense-month">
        <p>{currentDate.toLocaleString("default", { month: "long" })} Month</p>
        <h4 className="amount">₹ {totalExpenseByMonthCurrentYear}</h4>
      </div>

      <p>Expense by UPI in {currentDate.toLocaleString('en-US', { month: 'long' })}₹{totalExpenseCurrentMonthByUPI}</p>
      <p>Expense by CASH in {currentDate.toLocaleString('en-US', { month: 'long' })}₹{totalExpenseCurrentMonthByCASH}</p>
      </div>
    </div>
  );
}

export default TotalExpenseMonthYear;
