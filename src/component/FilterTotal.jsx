import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import PaymentModePopup from "./FilterByPaymentMethodPop";
import SortPopup from "./SortPopup";
import FilterByDatePopup from "./FilterByDatePopup";
import SumOfExpense from "./SumOfExpense";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import {
  setTotalExpenseByCurrentYear,
  setTotalExpenseByCurrentYearByPaymentModeUPI,
  setTotalExpenseByMonth,
} from "../feature/slice/Slice";
function FilterTotal() {
  const dispatch = useDispatch();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSumOfExpense, setShowSumOfExpense] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterDateModal, setShowFilterDateModal] = useState(false);

  const currentDate = new Date();

  // open the payment modal
  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  // close the payment modal
  const handleClosePayment = () => {
    setShowPaymentModal(false);
  };

  const setShowModalandSortFlag =()=>{
    console.log("Sort Button is clicked");
    setShowSortModal(true);
  }

  async function setShowExpenseAndCalculateCurrentYearExpense() {
    setShowSumOfExpense(true);
    try {
      const response = await axiosInstance.post(
        "http://localhost:8081/totalexpensebyyear",
        {
          year: currentDate.getFullYear(),
        },
      );

      if (response.status == 200) {
        dispatch(setTotalExpenseByCurrentYear(response.data.sum));
      }
    } catch (error) {
      console.error("Error in fetching current year expense", error);
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:8081/totalexpensebyyearpaymentmode",
        {
          paymentMode: "UPI",
          year: currentDate.getFullYear(),
        },
      );

      if (response.status == 200) {
        dispatch(
          setTotalExpenseByCurrentYearByPaymentModeUPI(response.data.sum),
        );
      }
    } catch (error) {
      console.error(
        "Error in fetching current year expense with paymentmode",
        error,
      );
    }

    try{
      const response = await axiosInstance.post("http://localhost:8081/totalexpensebymonth",{
        month:currentDate.toLocaleString("en-US", { month: "long" }),
        year:currentDate.getFullYear()
      })
      if (response.status==200){
        dispatch(setTotalExpenseByMonth(response.data.sum));
      }
    }
    catch(error){
      console.error("Error in fetching total expense in month",error);
    }
  }
  return (
    <div className="module-header-parent">
      <div>
        <h5>Filter and Total</h5>
      </div>
      <div className="module-header">
        <Button variant="primary" className="expensemanagmentbtn" onClick={() => setShowFilterDateModal(true)}>
          Filter By Date
        </Button>
        <Button
          variant="outline-danger"
          className="expensemanagmentbtn"
          onClick={handleShowPayment}
        >
          Payment Method
        </Button>
        <Button
          variant="outline-success"
          className="expensemanagmentbtn"
          onClick={() => setShowExpenseAndCalculateCurrentYearExpense()}
        >
          Sum of Expense
        </Button>
        <Button variant="outline-dark" className="expensemanagmentbtn" onClick={()=>setShowModalandSortFlag()}>
          Sort
        </Button>
      </div>

      <FilterByDatePopup
        show={showFilterDateModal}
        handleClose={() => setShowFilterDateModal(false)}
        onApply={(filters) => console.log("Filter applied:", filters)}
      />

       <SortPopup
        show={showSortModal}
        handleClose={() => setShowSortModal(false)}
      /> 

      {/* render the popup when the flag is true */}
      <PaymentModePopup
        show={showPaymentModal}
        handleClose={handleClosePayment}
      />

      <Modal
        show={showSumOfExpense}
        onHide={() => setShowSumOfExpense(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ background: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}
        >
          <Modal.Title style={{ fontSize: "16px", fontWeight: 600 }}>
            Sum of Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <SumOfExpense />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FilterTotal;
