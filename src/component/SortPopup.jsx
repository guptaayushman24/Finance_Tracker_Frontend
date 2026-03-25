import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserExpenseSortedList } from "../feature/slice/Slice";
import "../css/SortPopup.css";
import axiosInstance from "../util/AxiosInstance";

const SORT_OPTIONS = [
  {
    value: "asc",
    title: "Lowest Expense First",
    subtitle: "Sort by amount: ₹ Low → High",
    icon: "↑",
    key: "asc",
  },
  {
    value: "desc",
    title: "Highest Expense First",
    subtitle: "Sort by amount: ₹ High → Low",
    icon: "↓",
    key: "desc",
  },
];

const SortPopup = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const userExpenseList = useSelector((state) => state.profile.userExpenseList);
  const [selected, setSelected] = useState(null);

  const handleApply = async () => {
    // Call the sort API
    try {
      if (selected === "asc") {
        sortOrder = "asc";
      } else if (selected === "desc") {
        sortOrder = "desc";
      }
      const response = await axiosInstance.post(
        "http://localhost:8081/sortexpense",
        {
          sortOrder: sortOrder,
        },
      );

      if (response.status === 200) {
        // dispatch(setUserExpenseList(sorted));
        dispatch(setUserExpenseSortedList(response.data));
        handleClose();
      }
    } catch (error) {
      console.log("Error in sorting the expense", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="sort-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sort by Amount</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {SORT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`sort-option-label ${selected === opt.value ? "selected" : ""}`}
            onClick={() => setSelected(opt.value)}
          >
            <input
              type="radio"
              name="sort"
              value={opt.value}
              readOnly
              checked={selected === opt.value}
            />
            <div className="sort-radio-custom">
              <div className="sort-radio-dot" />
            </div>
            <div className="sort-option-text">
              <div className="sort-option-title">{opt.title}</div>
              <div className="sort-option-subtitle">{opt.subtitle}</div>
            </div>
            <span className="sort-option-icon">{opt.icon}</span>
          </label>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="sort-cancel-btn"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="sort-apply-btn"
          onClick={handleApply}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SortPopup;
