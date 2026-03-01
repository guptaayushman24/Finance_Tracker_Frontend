import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaWallet,
  FaTag,
} from "react-icons/fa";
import "../css/AddModal.css";
import axiosInstance from "../util/AxiosInstance";
import { useEffect, useState } from "react";
const AddExpenseModal = ({ show, handleClose }) => {
  const [userRegisteredExpense, setUserRegisteredExpense] = useState([]);
  const [paymentMode, setpaymentMode] = useState("");
  const [amoumt, setamount] = useState(0);
  const [description, setdesciption] = useState("");
  const [expenseDate, setexpenseDate] = useState("");
  const [userregisterexpense, setuserregisterexpense] = useState("");
  const [loadingSaveExpense, setLoadingSaveExpense] = useState(false);

  const [storeId, setStoreId] = useState(-1);
  const saveExpense = async () => {
    setLoadingSaveExpense(true);
    try{
      const response = await axiosInstance.post(
      "http://localhost:8081/userexpense",
      {
        expenseType: userregisterexpense,
        value: parseInt(amoumt),
        description: description,
        paymentMode: paymentMode,
        expenseDate: expenseDate
      },
    );
    if (response.status == 200) {
      alert("User Expense saved successfully");
      setLoadingSaveExpense(false);
    }
    }
    catch(error){
      console.log("Date is"+" "+expenseDate);
      console.log("Error"+" "+error);
    }
  };


  const showUserExpense = async () => {
    const response = await axiosInstance.get(
      "http://localhost:8080/auth/registeredexpensebyuser",
    );
    if (response.status == 200) {
      setUserRegisteredExpense(response.data);
    }
  };
  useEffect(() => {
    showUserExpense();
  }, []);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop="static"
      className="expense-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add New Expense</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="g-4">
            {/* Expense Type */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expense Type</Form.Label>
                <div className="input-icon" onClick={showUserExpense}>
                  <FaTag />
                  <Form.Select
                    value={userregisterexpense}
                    onChange={(e) => setuserregisterexpense(e.target.value)}
                  >
                    <option>Select Expense Type</option>
                    {userRegisteredExpense.length > 0 &&
                      userRegisteredExpense.map((item, index) => {
                        return (
                          <option key={index} value={item.userRegisterdExpense}>
                            {item.userRegisterdExpense}
                          </option>
                        );
                      })}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

            {/* Value */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <div className="input-icon">
                  <FaMoneyBillWave />
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    onChange={(e) => setamount(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>

            {/* Payment Mode */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Payment Mode</Form.Label>
                <div className="input-icon">
                  <FaWallet />
                  <Form.Select
                    value={paymentMode}
                    onChange={(e)=>setpaymentMode(e.target.value)}
                  >
                    <option>
                      Cash
                    </option>
                    <option>
                      UPI
                    </option>
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

            {/* Expense Date */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expense Date</Form.Label>
                <div className="input-icon">
                  <FaCalendarAlt />
                  <Form.Control
                    type="date"
                    onChange={(e) => setexpenseDate(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>

            {/* Description */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Description (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add a short description..."
                  onChange={(e) => setdesciption(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        {loadingSaveExpense ? (
          <Button variant="primary">Saving Expense</Button>
        ) : (
          <Button variant="primary" onClick={saveExpense}>
            Save Expense
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddExpenseModal;
