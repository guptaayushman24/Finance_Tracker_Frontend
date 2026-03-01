import { FaCog } from "react-icons/fa";
import { useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import "../css/Setting.css"
import axios from "axios";
import axiosInstance from "../util/AxiosInstance";
const ModuleHeader = () => {
  const [showSettings, setShowSettings] = useState(false);

  const [allExpense, setAllExpense] = useState([]);
  const [userRegisteredExpense,setUserRegisteredExpense] = useState([]);

  const handleClose = () => setShowSettings(false);
  const handleShow = () => setShowSettings(true);

  const allAvailableExpense = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8081/availableexpense");
      if (response.status == 200) {
        console.log("Expense"+" "+allExpense);
        setAllExpense(response.data);
      }
    }
    catch (error) {
      console.log("Error in fetching data" + " " + error);
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
       console.log("Error in fetching data" + " " + error);
    }
  }
  return (
    <>
      <div className="module-card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Expense Management</h5>

        <FaCog
          className="settings-icon"
          onClick={handleShow}
        />
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
            >
              <option>Select Expense Category</option>
              {
                allExpense.length>0 && allExpense.map((value,index)=>{
                  return <option key={index} value={value}>{value}</option>
                })
              }
            </Form.Select>
            <Button variant="primary" className="w-100">
              Add Expense Category
            </Button>
          </div>

          <hr />

          {/* Delete Category */}
          <div>
            <h6>Delete Expense Category</h6>
            <Form.Select className="mb-2"
              onClick={userExpense}
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

            <Button variant="danger" className="w-100">
              Delete Expense Category
            </Button>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModuleHeader;