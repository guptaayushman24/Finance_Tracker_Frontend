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
const mockYearData = {
  2023: { total: 84200, UPI: 51000, CASH: 33200 },
  2024: { total: 97500, UPI: 63000, CASH: 34500 },
  2025: { total: 112300, UPI: 74800, CASH: 37500 },
  2026: { total: 38900, UPI: 26100, CASH: 12800 },
};

const mockMonthData = {
  2025: {
    January: { total: 9200, UPI: 6100, CASH: 3100 },
    February: { total: 8400, UPI: 5500, CASH: 2900 },
    March: { total: 10100, UPI: 7000, CASH: 3100 },
    April: { total: 9700, UPI: 6400, CASH: 3300 },
    May: { total: 11200, UPI: 7800, CASH: 3400 },
    June: { total: 9800, UPI: 6300, CASH: 3500 },
    July: { total: 10500, UPI: 7100, CASH: 3400 },
    August: { total: 8900, UPI: 5800, CASH: 3100 },
    September: { total: 9300, UPI: 6000, CASH: 3300 },
    October: { total: 10800, UPI: 7200, CASH: 3600 },
    November: { total: 11600, UPI: 7900, CASH: 3700 },
    December: { total: 12800, UPI: 8700, CASH: 4100 },
  },
};

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

  const totalExpenseByCurrentYear = useSelector(
    (state) => state.profile.totalExpenseByCurrentYear,
  );

  const totalExpenseByCurrentYearPaymentModeUPI = useSelector(
    (state) => state.profile.totalExpenseByCurrentYearPaymentModeUPI,
  );
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.toLocaleString("en-US", { month: "long" }),
  );
  const [payMode, setPayMode] = useState(null);

  const [yearExpense, setYearExpense] = useState(0);
  const [yearExpenseByPaymentMode, setYearExpenseByPaymentMode] = useState(0);
  // Data lookup (swap these lines for your API responses)
  const yearData = mockYearData[selectedYear] || {};
  const monthData = (mockMonthData[selectedYear] || {})[selectedMonth] || {};

  const yearTotal = yearData.total || 0;
  const yearByMode = payMode ? yearData[payMode] || 0 : 0;
  const monthTotal = monthData.total || 0;
  const monthByMode = payMode ? monthData[payMode] || 0 : 0;

  const sharePercent =
    payMode && yearTotal ? Math.round((yearByMode / yearTotal) * 100) : 0;

  const m = payMode ? payMode.toLowerCase() : ""; // "upi" | "cash"

  // Fetching the Selected Year Expense
  async function getSelectedYearExpense(year) {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8081/totalexpensebyyear",
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
    console.log("Default Payment Mode is",paymentMode);
    setPayMode(paymentMode);
    if (paymentMode === "UPI") {
      // Pass the payment mode as UPI with year
      const response = await axiosInstance.post(
        "http://localhost:8081/totalexpensebyyearpaymentmode",
        {
          paymentMode: paymentMode,
          year: year,
        },
      );
      if (response.status == 200) {
        setYearExpenseByPaymentMode(response.data.sum);
      }
    } else if (paymentMode === "CASH") {
      // Pass the payment mode as CASH with year
      const response = await axiosInstance.post(
        "http://localhost:8081/totalexpensebyyearpaymentmode",
        {
          paymentMode: paymentMode,
          year: year,
        },
      );
      if (response.status == 200) {
        setYearExpenseByPaymentMode(response.data.sum);
      }
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
                onChange={(e) => setSelectedMonth(e.target.value)}
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
                  getSelectedYearExpense(year);
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
                  yearExpense === 0 ? totalExpenseByCurrentYear : yearExpense
                }
              />

              {payMode && (
                <ModeRow
                  label="Total Expense in"
                  highlight={selectedYear}
                  mode={payMode}
                  amount={
                    yearExpenseByPaymentMode === 0
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
                amount={monthTotal}
              />

              {payMode && (
                <ModeRow
                  label="Total Expense in"
                  highlight={selectedMonth}
                  mode={payMode}
                  amount={monthByMode}
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
