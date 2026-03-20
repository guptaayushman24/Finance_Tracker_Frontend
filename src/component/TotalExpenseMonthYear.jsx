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
    (state) => state.profile.totalExpenseByCurrentMonthPaymentModeUPI,
  );

  const totalExpenseCurrentMonthByCASH = useSelector(
    (state) => state.profile.totalExpenseByCurrentMonthPaymentModeCASH,
  );

  return (
    <div className="expense-summary-card">
      <button className="close-btn" onClick={handleClose}>
        ✕
      </button>
      <div className="expense-header">
        <h4>Hi {firstName + " " + lastName}👋</h4>

        <div className="expense-main">
          <div className="expense-row">
              <p>Total Expense in  {currentDate.getFullYear()}</p>
              <b>₹ {totalExpenseByCurrentYear}</b>
            </div>
        </div>

        {/* Year Expense */}
        <div className="expense-header-payment-mode">
            <div className="expense-row">
              <p>Expense By UPI in {currentDate.getFullYear()}</p>
              <b>₹ {totalExpenseCurrentYearByUPI}</b>
            </div>
          

          <div className="expense-month">
            <div className="expense-row">
              <p>Expense By CASH in {currentDate.getFullYear()}</p>
              <b>₹ {totalExpenseCurrentYearByCASH}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="expense-divider"></div>

      {/* Month Expense */}
      <div className="expense-month-parent">
       
          <div className="expense-row">
            <p>Total Expense in {currentDate.toLocaleString("en-US", { month: "long" })}</p>
            <b>₹ {totalExpenseByMonthCurrentYear}</b>
          </div>

        <div className="expense-row">
          <p>
            Expense by UPI in {currentDate.toLocaleString("en-US", { month: "long" })}
          </p>
          <b>₹ {totalExpenseCurrentMonthByUPI}</b>
        </div>

        <div className="expense-row">
          <p>
            Expense by CASH in {currentDate.toLocaleString("en-US", { month: "long" })}
          </p>
          <b>₹ {totalExpenseCurrentMonthByCASH}</b>
        </div>
      </div>
    </div>
  );
}

export default TotalExpenseMonthYear;
