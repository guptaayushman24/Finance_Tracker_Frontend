import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "../css/ReportPopup.css";
import axiosInstance from "../util/AxiosInstance";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - i);

const ReportPopup = ({ show, handleClose }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successYear, setSuccessYear] = useState(null);
  const emailAddress = useSelector((state) => state.profile.emailAddress);

  const handleSendReport = async (selectedYear) => {
    if (!selectedYear) return;
    setErrorMsg(null);
    try {
      const response = await axiosInstance.post("https://userexpense-production.up.railway.app/expenseanalyzer", {
        year: selectedYear,
      });

      if (response.status === 200) {
        setSuccessYear(selectedYear);
      }
    } catch (error) {
      console.log("Error in sending the report", error);
      setErrorMsg("Failed to send the report. Please try again.");
    }
  };

  const handleCancel = () => {
    setSelectedYear(null);
    setErrorMsg(null);
    setSuccessYear(null);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      centered
      className="report-popup-modal"
    >
      {successYear ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Report Sent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="rp-success-container">
              <div className="rp-success-icon">&#10003;</div>
              <p className="rp-success-title">
                Expense Report for the year {successYear} sent on email successfully
              </p>
              <p className="rp-success-email">{emailAddress}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className="rp-send-btn" onClick={handleCancel}>
              Done
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Send Report</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {errorMsg && (
              <div className="rp-error-banner">
                <span className="rp-error-icon">&#9888;</span>
                {errorMsg}
              </div>
            )}

            <div className="rp-year-grid">
              {YEARS.map((yr) => (
                <button
                  key={yr}
                  className={`rp-year-chip ${selectedYear === yr ? "selected" : ""}`}
                  onClick={() => setSelectedYear(yr)}
                >
                  {selectedYear === yr && <span className="rp-year-dot" />}
                  {yr}
                </button>
              ))}
            </div>

            {selectedYear && (
              <p className="rp-selection-hint">
                Report for <strong>{selectedYear}</strong>
              </p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className="rp-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="rp-send-btn"
              onClick={() => handleSendReport(selectedYear)}
              disabled={!selectedYear}
            >
              Send Report
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ReportPopup;
