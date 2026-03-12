import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpenseModal from "./AddModal";
import Setting from "./Setting";
import AllExpenseByUser from "./AllExpenseByUser";
import FilterTotal from "./FilterTotal";
const Module1 = () => {
  const [showModal, setShowModal] = useState(false);
  const addExpense = () => {
    setShowModal(true);
  }
  return (
    <div className="module-card">
      {/* Setting icon */}
        <Setting></Setting>
      {/* HEADER */}  
      <div className="module-header-parent">
        <div>
          <h5>Expense Managment</h5>
        </div>
        <div className="module-header">
          <Button variant="primary" onClick={addExpense}>Add Expense</Button>
          {
            showModal ? (
              <AddExpenseModal
                show={showModal}
                handleClose={() => setShowModal(false)}
              />
            ) : null
          }
          <Button variant="outline-danger">Report</Button>
          <Button variant="outline-success">Total Expense</Button>
        </div>

      </div>

      {/* FILTER ROW */}
          <FilterTotal></FilterTotal>

      {/* ADVANCE DETAIL */}
          <AllExpenseByUser></AllExpenseByUser>

    </div>
  );
};

export default Module1;