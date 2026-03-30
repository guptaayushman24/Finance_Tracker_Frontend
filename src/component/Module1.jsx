import React, { useState } from "react";
import { FaPlus, FaChartPie, FaWallet } from "react-icons/fa";
import AddExpenseModal from "./AddModal";
import Setting from "./Setting";
import AllExpenseByUser from "./AllExpenseByUser";
import FilterTotal from "./FilterTotal";
import TotalExpenseMonthYear from "./TotalExpenseMonthYear";
import axiosInstance from "../util/AxiosInstance";
import YearFilterPopup from "./YearFilterPopup";
import ReportPopup from "./ReportPopup";
import {
  setTotalExpenseByCurrentYear,
  setTotalExpenseByCurrentYearByPaymentModeUPI,
  setTotalExpenseByCurrentYearByPaymentModeCASH,
  setTotalExpenseByMonth,
  setTotalExpenseByCurrentMonthPaymentModeUPI,
  setTotalExpenseByCurrentMonthPaymentModeCASH,
} from "../feature/slice/Slice";
import { useDispatch } from "react-redux";
const Module1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [totalExpensePopUp, setTotalExpensePopUp] = useState(false);
  const [showYearFilter, setShowYearFilter] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [activeYearLabel,setActiveYearLabel] = useState(null);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const addExpense = () => {
    setShowModal(true);
  };
  const showTotalExpense = async () => {
    setTotalExpensePopUp(true);
    // Call the API of Total Expense
    const response = await axiosInstance.post(
      "http://localhost:8081/totalexpensebyyear",
      {
        year: currentDate.getFullYear(), // Current Year
      },
    );

    if (response.status == 200) {
      dispatch(setTotalExpenseByCurrentYear(response.data.sum));
    }

    // Call the API of Total Expense By Month
    const responseByMonth = await axiosInstance.post(
      "http://localhost:8081/totalexpensebymonth",
      {
        month: currentDate.toLocaleString("en-US", { month: "long" }),
        year: currentDate.getFullYear(),
      },
    );
    if (responseByMonth.status == 200) {
      dispatch(setTotalExpenseByMonth(responseByMonth.data.sum));
    }

    // Call the API of Current Year By Payment Method for UPI
    const responseByCurrentYearByUPI = await axiosInstance.post(
      "http://localhost:8081/totalexpensebyyearpaymentmode",
      {
        year: currentDate.getFullYear(),
        paymentMode: "UPI",
      },
    );

    if (responseByCurrentYearByUPI.status == 200) {
      dispatch(
        setTotalExpenseByCurrentYearByPaymentModeUPI(
          responseByCurrentYearByUPI.data.sum,
        ),
      );
    }

    // Call the API of Current Year By Payment Method for CASH
    const responseByCurrentYearByCash = await axiosInstance.post(
      "http://localhost:8081/totalexpensebyyearpaymentmode",
      {
        year: currentDate.getFullYear(),
        paymentMode: "CASH",
      },
    );

    if (responseByCurrentYearByCash.status == 200) {
      console.log("Response", responseByCurrentYearByCash.data);
      dispatch(
        setTotalExpenseByCurrentYearByPaymentModeCASH(
          responseByCurrentYearByCash.data.sum,
        ),
      );
    }

    // Call the API of Current Month By Payment Method for UPI
    const responseInCurrentMonthByUPI = await axiosInstance.post(
      "http://localhost:8081/totalexpensebymonthpaymentmode",
      {
        month: currentDate.toLocaleString("en-US", { month: "long" }),
        paymentMode: "UPI",
        year: currentDate.getFullYear(),
      },
    );

    if (responseInCurrentMonthByUPI.status == 200) {
      console.log("Month Payment Mode", responseInCurrentMonthByUPI.data.sum);
      dispatch(
        setTotalExpenseByCurrentMonthPaymentModeUPI(
          responseInCurrentMonthByUPI.data.sum,
        ),
      );
    }

    // Call the API of Current Month By Payment Mode for CASH
    const responseInCurrentMonthByCASH = await axiosInstance.post(
      "http://localhost:8081/totalexpensebymonthpaymentmode",
      {
        month: currentDate.toLocaleString("en-US", { month: "long" }),
        paymentMode: "CASH",
        year: currentDate.getFullYear(),
      },
    );

    if (responseInCurrentMonthByCASH.status == 200) {
      console.log("Month Payment Mode", responseInCurrentMonthByCASH.data.sum);
      dispatch(
        setTotalExpenseByCurrentMonthPaymentModeCASH(
          responseInCurrentMonthByCASH.data.sum,
        ),
      );
    }
  };
  return (
    <div className="module-card">
      {/* Today's stats + settings */}
      <div className="et-section-card">
        <Setting />
      </div>

      {/* Page Banner */}
      <div className="et-page-banner">
        <div className="et-banner-left">
          <h1 className="et-banner-title">Expense Management</h1>
          <p className="et-banner-subtitle">Track, analyse and manage all your expenses in one place</p>
        </div>

        <div className="et-banner-actions">
          <button className="et-banner-btn et-banner-btn--add" onClick={addExpense}>
            <FaPlus /> Add Expense
          </button>

          <button
            className="et-banner-btn et-banner-btn--report"
            onClick={() => setShowReportPopup(true)}
          >
            <FaChartPie /> Report
          </button>

          <button className="et-banner-btn et-banner-btn--total" onClick={showTotalExpense}>
            <FaWallet /> Total Expense
          </button>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <AddExpenseModal show={showModal} handleClose={() => setShowModal(false)} />
      )}
      <ReportPopup show={showReportPopup} handleClose={() => setShowReportPopup(false)} />
      {totalExpensePopUp && (
        <TotalExpenseMonthYear
          show={setTotalExpensePopUp}
          handleClose={() => setTotalExpensePopUp(false)}
        />
      )}

      {/* Filter & Analytics */}
      <FilterTotal />

      {/* Transaction History */}
      <AllExpenseByUser />
    </div>
  );
};

export default Module1;
