import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/FilterByDatePopup.css";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import { setuserDateExpense,setuserDateFlag } from "../feature/slice/Slice";
const PAYMENT_MODES = [
  { value: "UPI", label: "UPI", icon: "📲" },
  { value: "CASH", label: "CASH", icon: "💵" },
];

const FilterByDatePopup = ({ show, handleClose, onApply }) => {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState("");
  const [paymentMode, setPaymentMode] = useState(null);

   const handleApply = async() => {
    try{
      const response = await axiosInstance.post("https://userexpense-production.up.railway.app/expenseOnday",{
        localDate:fromDate,
        paymentMode:paymentMode===null? "" :paymentMode
      })
      if (response.status==200){
        console.log("Hello from the date API expense");
        dispatch(setuserDateExpense(response.data));
        dispatch(setuserDateFlag(1));
      }
    }
    catch(error){
      console.log("No expense is present",error);
    }
    onApply({ fromDate, paymentMode });
    handleClose();
  };

  const handleCancel = () => {
    setFromDate("");
    setPaymentMode("ALL");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered className="filter-date-modal">
      <Modal.Header closeButton>
        <Modal.Title>Filter Expenses</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="filter-date-row">
          <div className="filter-date-field">
            <label className="filter-input-label">Select Date</label>
            <input
              type="date"
              className="filter-date-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>

        {/* Payment Mode Section */}
        <div className="filter-section-label" style={{ marginTop: "16px" }}>
          Payment Mode
        </div>
        {PAYMENT_MODES.map((mode) => (
          <label
            key={mode.value}
            className={`filter-option-label ${paymentMode === mode.value ? "selected" : ""}`}
            onClick={() => setPaymentMode(mode.value)}
          >
            <input
              type="radio"
              name="paymentMode"
              value={mode.value}
              readOnly
              checked={paymentMode === mode.value}
            />
            <div className="filter-radio-custom">
              <div className="filter-radio-dot" />
            </div>
            <span className="filter-option-icon">{mode.icon}</span>
            <div className="filter-option-text">{mode.label}</div>
            {paymentMode === mode.value && (
              <span className="filter-check">✓</span>
            )}
          </label>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="filter-cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="filter-apply-btn"
          onClick={handleApply}
          disabled={!fromDate && paymentMode === "ALL"}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterByDatePopup;
