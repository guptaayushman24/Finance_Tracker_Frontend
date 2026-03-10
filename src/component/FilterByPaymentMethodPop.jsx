import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";
import { useDispatch } from "react-redux";
import { setPaymentMethodFlag } from "../feature/slice/Slice";
const PaymentModePopup = ({ show, handleClose }) => {
  const [paymentMode, setPaymentMode] = useState("");
  const [allUserExpense, setAllUserExpense] = useState([]);
  const dispatch = useDispatch();
  const paymentMethod = new Map();
  paymentMethod.set("UPI",1);
  paymentMethod.set("CASH",0);

  const filterByPaymentMethod = async() =>{
    try{
      dispatch(setPaymentMethodFlag(1));
      if (paymentMethod.get(paymentMode)==1){
       // CALL the UPI
       paymentMode="UPI"
    }
    else if (paymentMethod.get(paymentMode)==0){
      // CALL the CASH
      paymentMode="CASH"
    }
    const response = await axiosInstance.post("http://localhost:8081/filterbypaymentmode",{
           paymentMode:paymentMode
        })
        if (response.status===200){
          dispatch(setAllUserExpense(response.data.message || response.data || []));
        }
    }
    catch(error){
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
              onClick={(e)=>filterByPaymentMethod(e.target.value)}
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
              onClick={(e)=>filterByPaymentMethod(e.target.value)}
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