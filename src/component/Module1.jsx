import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpenseModal from "./AddModal";
import Setting from "./Setting";
const Module1 = () => {
  const [showModal, setShowModal] = useState(false);
  const addExpense = () => {
    setShowModal(true);
  }
  return (
    <div className="module-card">
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
      <div className="module-header-parent">
        <div>
          <h5>Filter and Total</h5>
        </div>
        <div className="module-header">
          <Button variant="primary" className="expensemanagmentbtn">Filter By Date</Button>
          <Button variant="outline-danger" className="expensemanagmentbtn">Payment Method</Button>
          <Button variant="outline-success" className="expensemanagmentbtn">Sum of Expense</Button>
          <Button variant="outline-dark" className="expensemanagmentbtn">Sort</Button>
        </div>

      </div>

      {/* ADVANCE DETAIL */}

      <div className="module-header-parent">
        <div>
          <h5>Advance Detail</h5>
        </div>
        <div className="module-header">
          <Button variant="primary" className="expensemanagmentbtn">Current Day</Button>
          <Button variant="outline-danger" className="expensemanagmentbtn">Month</Button>
          <Button variant="outline-success" className="expensemanagmentbtn">Year</Button>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-section">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map your expenses here */}
            <tr>
              <td>Food</td>
              <td>₹500</td>
              <td>12-02-2026</td>
              <td>UPI</td>
              <td>
                <Button size="sm" variant="danger">
                  Delete
                </Button>
              </td>
            </tr>


          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Module1;