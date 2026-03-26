import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/MonthFilterPopup.css";

const MONTHS = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

const MonthFilterPopup = ({ show, handleClose, onApply }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleApply = () => {
    if (!selectedMonth) return;
    onApply({ month: selectedMonth, year: selectedYear });
    handleClose();
  };

  const handleCancel = () => {
    setSelectedMonth(null);
    setSelectedYear(currentYear);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered className="month-filter-modal">
      <Modal.Header closeButton>
        <Modal.Title>Filter by Month</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
              className={`mf-month-chip ${selectedMonth === m.value ? "selected" : ""}`}
              onClick={() => setSelectedMonth(m.value)}
            >
              {selectedMonth === m.value && (
                <span className="mf-month-dot" />
              )}
              {m.label}
            </button>
          ))}
        </div>

        {selectedMonth && (
          <p className="mf-selection-hint">
            Showing expenses for{" "}
            <strong>
              {MONTHS.find((m) => m.value === selectedMonth)?.label} {selectedYear}
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
          onClick={handleApply}
          disabled={!selectedMonth}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MonthFilterPopup;
