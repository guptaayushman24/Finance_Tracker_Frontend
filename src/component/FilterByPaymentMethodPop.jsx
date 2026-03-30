import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import { setPaymentMethodFlag, setUserExpenseList } from "../feature/slice/Slice";
import AllExpenseByUser from "../component/AllExpenseByUser"
const PaymentModePopup = ({ show, handleClose }) => {
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentMethodFilterTrigger,setPaymentMethodFilterTrigger] = useState(false);
  const dispatch = useDispatch();
  const paymentMethod = new Map();
  paymentMethod.set("UPI",1);
  paymentMethod.set("CASH",0);

  
  const filterByPaymentMethod = async() =>{
    try{
      dispatch(setPaymentMethodFlag(1));
      if (paymentMethod.get(paymentMode)==1){
       // CALL the UPI
       setPaymentMode("UPI");
    }
    else if (paymentMethod.get(paymentMode)==0){
      // CALL the CASH
      setPaymentMode("CASH");
    }
    const response = await axiosInstance.post("http://userexpense-production.up.railway.app/filterbypaymentmode",{
           paymentMode:paymentMode
        })
        if (response.status===200){
          dispatch(setUserExpenseList(response.data));
          setPaymentMethodFilterTrigger(true);
        }
    }
    catch(error){
      console.error(error);
      console.error("Something went wrong !!!!");
    }
  }
  return (
    <Modal show={show} onHide={handleClose} centered>
      
      <Modal.Header closeButton>
        <Modal.Title>Select Payment Mode</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="payment-container">

          {/* UPI */}
          <div className="payment-option">
            <Form.Check
              type="radio"
              name="paymentMode"
              label="UPI"
              value="UPI"
              onChange={(e) => setPaymentMode(e.target.value)}
            />
          </div>

          {/* CASH */}
          <div className="payment-option">
            <Form.Check
              type="radio"
              name="paymentMode"
              label="CASH"
              value="CASH"
              onChange={(e) => setPaymentMode(e.target.value)}
            />
          </div>

        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
           Close
        </Button>

        <Button variant="primary"
          onClick={filterByPaymentMethod}
        >
          Apply Filter
        
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModePopup;