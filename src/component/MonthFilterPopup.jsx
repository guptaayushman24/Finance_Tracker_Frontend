import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/MonthFilterPopup.css";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import {
  setUserMonthExpenseList,
  setMonthExpenseFlag,
} from "../feature/slice/Slice";
const MONTHS = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

const MonthFilterPopup = ({ show, handleClose }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  async function monthExpense() {
    setErrorMsg(null);
    try {
      const response = await axiosInstance.post(
        "http://localhost:8081/userexpensebymonth",
        {
          monthName: selectedMonth,
          year: selectedYear,
        },
      );

      if (response.status == 200) {
        dispatch(setUserMonthExpenseList(response.data));
        dispatch(setMonthExpenseFlag(1));
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMsg(`No expenses recorded for ${selectedMonth} ${selectedYear}.`);
      } else {
        console.error("Error in fetching the expense on selected month and year");
      }
    }
  }

  const handleCancel = () => {
    setSelectedMonth(null);
    setSelectedYear(currentYear);
    setErrorMsg(null);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      centered
      className="month-filter-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter by Month</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMsg && (
          <div className="mf-error-banner">
            <span className="mf-error-icon">&#9888;</span>
            {errorMsg}
          </div>
        )}

        {/* Year selector */}
        <div className="mf-year-row">
          {YEARS.map((yr) => (
            <button
              key={yr}
              className={`mf-year-chip ${selectedYear === yr ? "selected" : ""}`}
              onClick={() => setSelectedYear(yr)}
            >
              {yr}
            </button>
          ))}
        </div>

        <div className="mf-divider" />

        {/* Month grid */}
        <div className="mf-month-grid">
          {MONTHS.map((m) => (
            <button
              key={m.value}
              className={`mf-month-chip ${selectedMonth === m.label ? "selected" : ""}`}
              onClick={() => setSelectedMonth(m.label)}
            >
              {selectedMonth === m.label && <span className="mf-month-dot" />}
              {m.label}
            </button>
          ))}
        </div>

        {selectedMonth && (
          <p className="mf-selection-hint">
            Showing expenses for{" "}
            <strong>
              {MONTHS.find((m) => m.value === selectedMonth)?.label}{" "}
              {selectedYear}
            </strong>
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="mf-cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="mf-apply-btn"
          onClick={() => monthExpense()}
          disabled={!selectedMonth}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MonthFilterPopup;
