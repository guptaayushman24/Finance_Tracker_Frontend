import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { FaFilter, FaCreditCard, FaCalculator, FaSortAmountDown, FaCalendarAlt } from "react-icons/fa";
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
        "http://userexpense-production.up.railway.app/totalexpensebyyear",
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
        "http://userexpense-production.up.railway.app/totalexpensebyyearpaymentmode",
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
      const response = await axiosInstance.post("http://userexpense-production.up.railway.app/totalexpensebymonth",{
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
    <div className="et-section-card">
      <div className="et-section-header">
        <div className="et-section-icon et-section-icon--purple">
          <FaFilter />
        </div>
        <div>
          <p className="et-section-title">Filter &amp; Analytics</p>
          <p className="et-section-desc">Narrow down expenses by date, payment mode or amount</p>
        </div>
      </div>

      <div className="et-btn-grid">

        <button className="et-action-btn et-action-btn--primary" onClick={() => setShowFilterDateModal(true)}>
          <FaCalendarAlt /> Filter By Date
        </button>

        <button className="et-action-btn et-action-btn--danger" onClick={handleShowPayment}>
          <FaCreditCard /> Payment Method
        </button>

        <button className="et-action-btn et-action-btn--success" onClick={() => setShowExpenseAndCalculateCurrentYearExpense()}>
          <FaCalculator /> Sum of Expense
        </button>

        <button className="et-action-btn et-action-btn--dark" onClick={() => setShowModalandSortFlag()}>
          <FaSortAmountDown /> Sort
        </button>
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

      <PaymentModePopup
        show={showPaymentModal}
        handleClose={handleClosePayment}
      />

      <Modal show={showSumOfExpense} onHide={() => setShowSumOfExpense(false)} centered>
        <Modal.Header closeButton style={{ background: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
          <Modal.Title style={{ fontSize: "16px", fontWeight: 600 }}>Sum of Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <SumOfExpense />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FilterTotal;
