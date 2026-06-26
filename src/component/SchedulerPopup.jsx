import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/SchedulerPopup.css";
import axiosInstance from "../util/AxiosInstance";

const SCHEDULE_OPTIONS = [
  {
    value: "WEEKLY",
    title: "Weekly",
    subtitle: "Repeats every week",
    icon: "W",
    key:1
  },
  {
    value: "MONTHLY",
    title: "Monthly",
    subtitle: "Repeats every month",
    icon: "M",
    key:2
  },
  {
    value: "YEARLY",
    title: "Yearly",
    subtitle: "Repeats every year",
    icon: "Y",
    key:3
  },
];

const SchedulerPopup = ({ show, handleClose }) => {
  const [selected, setSelected] = useState(null);

  const handleApply = async (schedule) => {
    try {
      if (schedule==="WEEKLY"){
        schedule = 1;
      }
      else if (schedule==="MONTHLY"){
        schedule = 2;
      }
      else if (schedule==="YEARLY"){
        schedule = 3;
      }
      const response = await axiosInstance.post(
        "http://localhost:8081/registerscheduler",
        {
          schedulerTimming: schedule,
        }
      );

      if (response.status === 200) {
        alert(response.data?.message || "Scheduler configured successfully");
        handleClose();
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Error in setting the expense scheduler";
      alert(message);
      console.error("Error in setting the expense scheduler", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="scheduler-modal">
      <Modal.Header closeButton>
        <Modal.Title>Expense Scheduler</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {SCHEDULE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`scheduler-option-label ${selected === opt.value ? "selected" : ""}`}
            onClick={() => setSelected(opt.value)}
          >
            <input
              type="radio"
              name="scheduler"
              value={opt.value}
              readOnly
              checked={selected === opt.value}
            />
            <div className="scheduler-radio-custom">
              <div className="scheduler-radio-dot" />
            </div>
            <div className="scheduler-option-text">
              <div className="scheduler-option-title">{opt.title}</div>
              <div className="scheduler-option-subtitle">{opt.subtitle}</div>
            </div>
            <span className="scheduler-option-icon">{opt.icon}</span>
          </label>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="scheduler-cancel-btn"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="scheduler-apply-btn"
          disabled={!selected}
          onClick={() => handleApply(selected)}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SchedulerPopup;
