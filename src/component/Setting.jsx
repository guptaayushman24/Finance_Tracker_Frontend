import { FaCog } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import "../css/Setting.css"
import axios from "axios";
import axiosInstance from "../util/AxiosInstance";
import { setTotalExpensebyCASH, setTotalExpenseByUPI, setTotalExpenseToady } from "../feature/slice/Slice";
import { useDispatch, useSelector } from "react-redux";
const ModuleHeader = () => {
  const [showSettings, setShowSettings] = useState(false);

  const [allExpense, setAllExpense] = useState([]);
  const [userRegisteredExpense,setUserRegisteredExpense] = useState([]);

  const [newExpenseCategory,setNewExpenseCategory] = useState('');
  const [deleteExpenseCategory,setDeleteExpenseCategory] = useState('');

  const handleClose = () => setShowSettings(false);
  const handleShow = () => setShowSettings(true);

  const dispatch = useDispatch();

  const currentDayExpense = useSelector((state) => state.profile.totalExpenseToday);
  const currentDayExpenseUPI = useSelector((state)=>state.profile.totalExpenseTodayByUPI);
  const currentDayExpenseCASH = useSelector((state)=>state.profile.totalExpenseTodayByCASH);

  const allAvailableExpense = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8081/availableexpense");
      if (response.status == 200) {
        setAllExpense(response.data);
      }
    }
    catch (error) {
      console.error("Error in fetching data" + " " + error);
    }
  }

  const userExpense = async() =>{
    try{
      const response = await axiosInstance.get("http://localhost:8080/auth/registeredexpensebyuser");
    
    if (response.status==200){
      setUserRegisteredExpense(response.data);
    }
    }
    catch(error){
       console.error("Error in fetching data" + " " + error);
    }
  }

  const addNewExpenseCategory = async () =>{
    try{
      const response = await axiosInstance.post("http://localhost:8081/addnewexpense",{
         newUserExpense:newExpenseCategory
      })
      if (response.status==200){
        console.error("New Expense Category"+" "+newExpenseCategory);
        alert("New Expense Category added successfully");
      }
    }
    catch(error){
      console.error("Error in adding data"+" "+error);
    }
  }

  const deleteUserExpenseCategory = async() => {
    try{
      const response = await axiosInstance.post("http://localhost:8081/deleteexpense",{
        expenseTobeDeleted:deleteExpenseCategory
      })
      if (response.status==200){
        alert("Expense Category removed from user");
      }
    }
    catch(error){
      console.error("Error in removing data"+" "+error);
    }
  }

  const todayExpense = async()=>{
    try{
      const response = await axiosInstance.get("http://localhost:8081/totalexpennseoncurrentdate")
      if (response.status==200){
          console.log("Response is",response.data);
          dispatch(setTotalExpenseToady(response.data.sum));
      }
    }
    catch(error){
      console.error("Error in fetching the current day expense"+" "+error);
    }

    try{
      const response = await axiosInstance.post("http://localhost:8081/totalexpennseoncurrentdatepaymentmode",{
        "paymentMode":"UPI"
      })
      if (response.status==200){
        dispatch(setTotalExpenseByUPI(response.data.sum));
      }

    }
    catch(error){
       console.error("Error in fetching the current day expense by UPI"+" "+error);
    }

    try{
      const response = await axiosInstance.post("http://localhost:8081/totalexpennseoncurrentdatepaymentmode",{
        "paymentMode":"CASH"
      })
      if (response.status==200){
        dispatch(setTotalExpensebyCASH(response.data.sum));
      }
    }
    catch(error){
      console.error("Error in fetching the current day expense by CASH"+" "+error);
    }
  }

  useEffect(()=>{
    todayExpense();
  })
  return (
    <>

      <div className="today-expense">
        <div className="today-expense-child">
           <div className="today-expense-detail">Today's Expense:- ₹{currentDayExpense}</div>
        <div className="today-expense-detail">Today's Expense By UPI:- ₹{currentDayExpenseUPI}</div>
        <div className="today-expense-detail">Today's Expense By CASH ₹{currentDayExpenseCASH}</div>
        </div>
        <div className="module-card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Expense Setting</h5>

        <FaCog
          className="settings-icon"
          onClick={handleShow}
        />
      </div>
      </div>

      {/* Right Side Panel */}
      <Offcanvas show={showSettings} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Expense Settings</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>

          {/* Add Category */}
          <div className="mb-4">
            <Form.Select className="mb-2"
              onClick={allAvailableExpense}
              value={newExpenseCategory}
              onChange={(e)=>setNewExpenseCategory(e.target.value)}
            >
              <option>Select Expense Category</option>
              
              {
                allExpense.length>0 && allExpense.map((value,index)=>{
                  return <option key={index} value={value}>{value}</option>
                })
              }
            </Form.Select>
            <Button variant="primary" className="w-100"
              onClick={addNewExpenseCategory}
            >
              Add Expense Category
            </Button>
          </div>

          <hr />

          {/* Delete Category */}
          <div>
            <h6>Delete Expense Category</h6>
            <Form.Select className="mb-2"
             onClick={userExpense}
              value={deleteExpenseCategory}
              onChange={(e)=>setDeleteExpenseCategory(e.target.value)}
            >
              <option>Select Expense Category</option>
              {
                userRegisteredExpense.length>0 && (
                  userRegisteredExpense.map((value,index)=>{
                    return <option index={index} value={value.userRegisterdExpense}>{value.userRegisterdExpense}</option>
                  })
                )
              }
            </Form.Select>

            <Button variant="danger" className="w-100"
              onClick={deleteUserExpenseCategory}
            >
              Delete Expense Category
            </Button>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModuleHeader;