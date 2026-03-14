import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpenseModal from "./AddModal";
import Setting from "./Setting";
import AllExpenseByUser from "./AllExpenseByUser";
import FilterTotal from "./FilterTotal";
import TotalExpenseMonthYear from "./TotalExpenseMonthYear";
const Module1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [totalExpensePopUp,setTotalExpensePopUp] = useState(false);
  const addExpense = () => {
    setShowModal(true);
  }
  const showTotalExpense = ()=>{
    setTotalExpensePopUp(true);
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
          <Button variant="outline-success"
            onClick={showTotalExpense}
          >Total Expense</Button>

          {
            totalExpensePopUp ?(
              <TotalExpenseMonthYear
                show={setTotalExpensePopUp}
                handleClose={()=>setTotalExpensePopUp(false)}
              ></TotalExpenseMonthYear>
            ):null
          }
          
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