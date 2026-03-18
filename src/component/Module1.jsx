import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpenseModal from "./AddModal";
import Setting from "./Setting";
import AllExpenseByUser from "./AllExpenseByUser";
import FilterTotal from "./FilterTotal";
import TotalExpenseMonthYear from "./TotalExpenseMonthYear";
import axiosInstance from "../util/AxiosInstance";
import { setTotalExpenseByCurrentYear, setTotalExpenseByCurrentYearByPaymentModeUPI,setTotalExpenseByCurrentYearByPaymentModeCASH, setTotalExpenseByMonth, setTotalExpenseByCurrentMonthPaymentModeUPI,setTotalExpenseByCurrentMonthPaymentModeCASH } from "../feature/slice/Slice";
import { useDispatch } from "react-redux";
const Module1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [totalExpensePopUp,setTotalExpensePopUp] = useState(false);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const addExpense = () => {
    setShowModal(true);
  }
  const showTotalExpense = async()=>{
    setTotalExpensePopUp(true);
    // Call the API of Total Expense
    const response = await axiosInstance.post("http://localhost:8081/totalexpensebyyear",{
       year:currentDate.getFullYear() // Current Year
    })

    if (response.status==200){
      dispatch(setTotalExpenseByCurrentYear(response.data.sum));
    }

    // Call the API of Total Expense By Month
    const responseByMonth = await axiosInstance.post("http://localhost:8081/totalexpensebymonth",{
      month:currentDate.toLocaleString('en-US', { month: 'long' }),
      year:currentDate.getFullYear()
    })
    if (responseByMonth.status==200){
      dispatch(setTotalExpenseByMonth(responseByMonth.data.sum));
    }

    // Call the API of Current Year By Payment Method for UPI
    const responseByCurrentYearByUPI = await axiosInstance.post("http://localhost:8081/totalexpensebyyearpaymentmode",{
      year:currentDate.getFullYear(),
      paymentMode:"UPI"
    })

    if (responseByCurrentYearByUPI.status==200){
      dispatch(setTotalExpenseByCurrentYearByPaymentModeUPI(responseByCurrentYearByUPI.data.sum));
    }

    // Call the API of Current Year By Payment Method for CASH
    const responseByCurrentYearByCash = await axiosInstance.post("http://localhost:8081/totalexpensebyyearpaymentmode",{
      year:currentDate.getFullYear(),
      paymentMode:"CASH"
    })

    if (responseByCurrentYearByCash.status==200){
      console.log("Response",responseByCurrentYearByCash.data);
      dispatch(setTotalExpenseByCurrentYearByPaymentModeCASH(responseByCurrentYearByCash.data.sum));
    }

    // Call the API of Current Month By Payment Method for UPI
    const responseInCurrentMonthByUPI = await axiosInstance.post("http://localhost:8081/totalexpensebyyearpaymentmode",{
      month:currentDate.toLocaleString('en-US', { month: 'long' }),
      paymentMode:"UPI",
      year:currentDate.getFullYear()
    })
    
    if (responseInCurrentMonthByUPI.status==200){
      console.log ("Month Payment Mode",responseInCurrentMonthByUPI.data.sum);
      dispatch(setTotalExpenseByCurrentMonthPaymentModeUPI(responseInCurrentMonthByUPI.data.sum));
    }

    // Call the API of Current Month By Payment Mode for CASH
    const responseInCurrentMonthByCASH = await axiosInstance.post("http://localhost:8081/totalexpensebyyearpaymentmode",{
       month:currentDate.toLocaleString('en-US', { month: 'long' }),
      paymentMode:"CASH",
      year:currentDate.getFullYear()
    })

    if (responseInCurrentMonthByCASH.status==200){
      console.log("Month Payment Mode",responseInCurrentMonthByCASH.data.sum);
      dispatch(setTotalExpenseByCurrentMonthPaymentModeCASH(responseInCurrentMonthByCASH.data.sum));
    }
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