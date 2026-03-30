import { useState } from "react";
import { useSelector } from "react-redux";
import "../css/SumOfExpense.css";
import axiosInstance from "../util/AxiosInstance";
import axios from "axios";

// ─── Constants ───────────────────────────────────────────────
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = [2023, 2024, 2025, 2026];

const currentDate = new Date();

// ─── Mock Data (replace with your API calls) ─────────────────




// ─── Helpers ─────────────────────────────────────────────────
function formatINR(n) {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "K";
  return "₹" + n;
}

// ─── Sub-components ──────────────────────────────────────────

/** Plain stat row: label on left, amount on right */
function StatRow({ label, highlight, amount }) {
  return (
    <div className="ec-row">
      <span className="ec-row__desc">
        {label} <strong>{highlight}</strong>
      </span>
      <span className="ec-row__amount">{formatINR(amount)}</span>
    </div>
  );
}

/** Highlighted row with payment-mode badge */
function ModeRow({ label, highlight, mode, amount }) {
  const m = mode.toLowerCase(); // "upi" | "cash"
  return (
    <div className={`ec-highlight-row ec-highlight-row--${m}`}>
      <div className="ec-highlight-row__left">
        <div className={`ec-highlight-row__icon ec-highlight-row__icon--${m}`}>
          {mode === "UPI" ? "UPI" : "₹"}
        </div>
        <span className="ec-highlight-row__desc">
          {label} <strong>{highlight}</strong> by{" "}
          <span className={`ec-highlight-row__mode--${m}`}>{mode}</span>
        </span>
      </div>
      <span className={`ec-highlight-row__amount--${m}`}>
        {formatINR(amount)}
      </span>
    </div>
  );
}

/** Section header with coloured accent bar */
function SectionHeading({ accent, label }) {
  return (
    <div className="ec-section__heading">
      <div className={`ec-section__accent ec-section__accent--${accent}`} />
      <span className="ec-section__label">{label}</span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
function SumOfExpense() {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.toLocaleString('en-US', { month: 'long' }));

  const totalExpenseByCurrentYear = useSelector(
    (state) => state.profile.totalExpenseByCurrentYear,
  );

  const totalExpenseByCurrentYearPaymentModeUPI = useSelector(
    (state) => state.profile.totalExpenseByCurrentYearPaymentModeUPI,
  );

  const totalExpenseByCurrentMonth = useSelector(
    (state) => state.profile.totalExpenseByMonth,
  );
  const [payMode, setPayMode] = useState(null);

  const [yearExpense, setYearExpense] = useState(null);
  const [yearExpenseByPaymentMode, setYearExpenseByPaymentMode] = useState(null);
  const [monthExpense, setMonthExpense] = useState(null);
  const [monthExpenseByMode, setMonthExpenseByMode] = useState(null);
  // Data lookup (swap these lines for your API responses)
  
 

  
  

  const sharePercent =
    payMode && yearExpense ? Math.round((yearExpenseByPaymentMode / yearExpense) * 100) : 0;

    

  const m = payMode ? payMode.toLowerCase() : ""; // "upi" | "cash"

  // Fetching the Selected Year Expense
  async function getSelectedYearExpense(year) {
    try {
      const response = await axiosInstance.post(
        "https://userexpense-production.up.railway.app/totalexpensebyyear",
        {
          year: year,
        },
      );
      if (response.status == 200) {
        setYearExpense(response.data.sum);
      }
    } catch (error) {
      console.error("Error in total expense for the year", error);
    }
  }

  // Fetching the selected year expense with the payment mode
  async function yearlyExpenseByPaymentMode(paymentMode, year) {
    setPayMode(paymentMode);
    setYearExpenseByPaymentMode(null); // clear stale value immediately
    try {
      const response = await axiosInstance.post(
        "https://userexpense-production.up.railway.app/totalexpensebyyearpaymentmode",
        { paymentMode, year },
      );
      if (response.status == 200) {
        setYearExpenseByPaymentMode(response.data.sum);
      }
    } catch (error) {
      console.error("Error in total expense by year and payment mode", error);
    }
    // Also refresh monthly expense for the selected month with the new mode
    await getMonthExpenseByMode(selectedMonth, paymentMode, year);
  }

  // Fetching the selected month expense filtered by payment mode
  async function getMonthExpenseByMode(monthName, mode, year) {
    try {
      const response = await axiosInstance.post(
        "https://userexpense-production.up.railway.app/totalexpensebymonthpaymentmode",
        { month: monthName, paymentMode: mode, year },
      );
      if (response.status == 200) {
        setMonthExpenseByMode(response.data.sum);
      }
    } catch (error) {
      console.error("Error in fetching month expense by payment mode", error);
    }
  }

  async function getMonthExpense(monthName, year) {
    try {
      console.log("Month Name is",monthName);
      console.log("Year is",year);
      const response = await axiosInstance.post(
        "https://userexpense-production.up.railway.app/totalexpensebymonth",
        {
          month: monthName,
          year: year,
        },
      );
      if (response.status == 200) {
        setMonthExpense(response.data.sum);
      }
    } catch (error) {
      console.error("Error in fetching month expense", error);
    }
  }

  return (
    <div className="ec-popup-body">
      <div className="ec-wrapper">
        {/* ── Page Header ── */}
        <div className="ec-header">
          <div className="ec-header__label">Expense Tracker</div>
          <div className="ec-header__title">My Spending</div>
        </div>

        {/* ── Card ── */}
        <div className="ec-card">
          {/* Controls Row */}
          <div className="ec-controls">
            {/* Month Selector */}
            <div className="ec-select-wrap">
              <select
                className="ec-select"
                value={selectedMonth}
                onChange={(e) => {
                  const month = e.target.value;
                  setSelectedMonth(month);
                  getMonthExpense(month, selectedYear);
                }}
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="ec-select-arrow">▼</span>
            </div>

            {/* UPI / CASH Toggle */}
            <div className="ec-toggle">
              {["UPI", "CASH"].map((mode) => (
                <button
                  key={mode}
                  className={[
                    "ec-toggle__btn",
                    payMode === mode
                      ? `ec-toggle__btn--active-${mode.toLowerCase()}`
                      : "",
                  ].join(" ")}
                  onClick={() => yearlyExpenseByPaymentMode(mode, selectedYear)}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="ec-select-wrap">
              <select
                className="ec-select"
                value={selectedYear}
                onChange={(e) => {
                  const year = e.target.value;
                  setSelectedYear(year);
                  setYearExpenseByPaymentMode(null);
                  setMonthExpenseByMode(null);
                  getSelectedYearExpense(year);
                  getMonthExpense(selectedMonth, year);
                  if (payMode) yearlyExpenseByPaymentMode(payMode, year);
                }}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <span className="ec-select-arrow">▼</span>
            </div>
          </div>

          {/* Stats Body */}
          <div className="ec-stats">
            {/* ── Yearly Section ── */}
            <div className="ec-section">
              <SectionHeading accent="year" label={`Year ${selectedYear}`} />

              <StatRow
                label="Total Expense in"
                highlight={selectedYear}
                amount={
                  yearExpense === null ? totalExpenseByCurrentYear : yearExpense
                }
              />

              {payMode && (
                <ModeRow
                  label="Total Expense in"
                  highlight={selectedYear}
                  mode={payMode}
                  amount={
                    yearExpenseByPaymentMode === null
                      ? totalExpenseByCurrentYearPaymentModeUPI
                      : yearExpenseByPaymentMode
                  }
                />
              )}
            </div>

            {/* Divider */}
            <div className="ec-divider" />

            {/* ── Monthly Section ── */}
            <div className="ec-section ec-section--month">
              <SectionHeading
                accent="month"
                label={`${selectedMonth} ${selectedYear}`}
              />

              <StatRow
                label="Total Expense in"
                highlight={selectedMonth}
                amount={
                  monthExpense === null ? totalExpenseByCurrentMonth : monthExpense
                }
              />

              {payMode && (
                <ModeRow
                  label="Total Expense in"
                  highlight={selectedMonth}
                  mode={payMode}
                  amount={
                    monthExpenseByMode === null
                      ? totalExpenseByCurrentMonth
                      : monthExpenseByMode
                  }
                />
              )}
            </div>
          </div>

          {/* Footer Progress Bar */}
          {payMode && (
            <div className="ec-footer">
              <span className="ec-footer__label">
                {payMode} share of yearly: <span>{sharePercent}%</span>
              </span>
              <div className="ec-progress-track">
                <div
                  className={`ec-progress-fill ec-progress-fill--${m}`}
                  style={{ width: `${sharePercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <p className="ec-hint">Replace mock data with your API calls</p>
      </div>
    </div>
  );
}

export default SumOfExpense;
