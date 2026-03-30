import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/YearFilterPopup.css";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import {
  setUserYearExpenseList,
  setYearExpenseFlag,
} from "../feature/slice/Slice";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - i);

const YearFilterPopup = ({ show, handleClose }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  async function yearExpense() {
    setErrorMsg(null);
    try {
      const response = await axiosInstance.post(
        "http://userexpense-production.up.railway.app/userexpensebyyear",
        {
          year: selectedYear,
        },
      );

      if (response.status === 200) {
        dispatch(setUserYearExpenseList(response.data));
        dispatch(setYearExpenseFlag(1));
        handleClose();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMsg(`No expenses recorded for ${selectedYear}.`);
      } else {
        console.error("Error in fetching the expense for selected year");
      }
    }
  }

  const handleCancel = () => {
    setSelectedYear(null);
    setErrorMsg(null);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      centered
      className="year-filter-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter by Year</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMsg && (
          <div className="yf-error-banner">
            <span className="yf-error-icon">&#9888;</span>
            {errorMsg}
          </div>
        )}

        <div className="yf-year-grid">
          {YEARS.map((yr) => (
            <button
              key={yr}
              className={`yf-year-chip ${selectedYear === yr ? "selected" : ""}`}
              onClick={() => setSelectedYear(yr)}
            >
              {selectedYear === yr && <span className="yf-year-dot" />}
              {yr}
            </button>
          ))}
        </div>

        {selectedYear && (
          <p className="yf-selection-hint">
            Showing expenses for <strong>{selectedYear}</strong>
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="yf-cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="yf-apply-btn"
          onClick={() => yearExpense()}
          disabled={!selectedYear}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default YearFilterPopup;
