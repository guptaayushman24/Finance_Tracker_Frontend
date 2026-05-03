import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/CurrentDayFilterPopup.css";
import axiosInstance from "../util/AxiosInstance";

const PAYMENT_OPTIONS = [
  { value: "UPI", label: "UPI", subtitle: "Online payments" },
  { value: "CASH", label: "Cash", subtitle: "Physical payments" },
  { value: "ALL", label: "All Methods", subtitle: "UPI + Cash combined" },
];

const today = new Date().toISOString().split("T")[0];

const CurrentDayFilterPopup = ({ show, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleApply = async () => {
    if (!selectedDate || !selectedMethod) return;
    setLoading(true);
    setErrorMsg(null);
    setTotalExpense(null);

    try {
      // TODO: Replace with your actual API endpoint and payload shape
      const response = await axiosInstance.post(
        "http://localhost:8081/toalexpenseondate",
        {
          expenseDate: selectedDate,
          paymentMode: selectedMethod,
        },
      );

      if (response.status === 200) {
        setTotalExpense(response.data.sum ?? response.data);
      }
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        setErrorMsg(`No expenses found for ${selectedDate} via ${selectedMethod}.`);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedDate(today);
    setSelectedMethod(null);
    setTotalExpense(null);
    setErrorMsg(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered className="cd-modal">
      <Modal.Header closeButton>
        <Modal.Title>Expense by Date &amp; Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Date picker */}
        <div className="cd-date-section">
          <label className="cd-section-label">Select Date</label>
          <input
            type="date"
            className="cd-date-input"
            value={selectedDate}
            max={today}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setTotalExpense(null);
              setErrorMsg(null);
            }}
          />
        </div>

        <div className="cd-divider" />

        {/* Payment method radio options */}
        <label className="cd-section-label">Payment Method</label>
        <div className="cd-options">
          {PAYMENT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`cd-option-label ${selectedMethod === opt.value ? "selected" : ""}`}
              onClick={() => {
                setSelectedMethod(opt.value);
                setTotalExpense(null);
                setErrorMsg(null);
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={opt.value}
                readOnly
                checked={selectedMethod === opt.value}
              />
              <div className="cd-radio-custom">
                <div className="cd-radio-dot" />
              </div>
              <div className="cd-option-text">
                <div className="cd-option-title">{opt.label}</div>
                <div className="cd-option-subtitle">{opt.subtitle}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Result area */}
        {errorMsg && (
          <div className="cd-error-banner">
            <span className="cd-error-icon">&#9888;</span>
            {errorMsg}
          </div>
        )}

        {totalExpense !== null && !errorMsg && (
          <div className="cd-result-card">
            <div className="cd-result-label">Total Expense</div>
            <div className="cd-result-amount">₹ {Number(totalExpense).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
            <div className="cd-result-meta">
              {selectedDate} &bull; {selectedMethod}
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="cd-cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="cd-apply-btn"
          onClick={handleApply}
          disabled={!selectedDate || !selectedMethod || loading}
        >
          {loading ? "Fetching…" : "Apply"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CurrentDayFilterPopup;
