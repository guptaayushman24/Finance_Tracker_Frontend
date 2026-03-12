import { Button } from "react-bootstrap";
import React, { useState } from "react";
import PaymentModePopup from "./FilterByPaymentMethodPop";
function FilterTotal() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // open the payment modal
  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  // close the payment modal
  const handleClosePayment = () => {
    setShowPaymentModal(false);
  };
  return (
    <div className="module-header-parent">
      <div>
        <h5>Filter and Total</h5>
      </div>
      <div className="module-header">
        <Button variant="primary" className="expensemanagmentbtn">Filter By Date</Button>
        <Button
          variant="outline-danger"
          className="expensemanagmentbtn"
          onClick={handleShowPayment}
        >
          Payment Method
        </Button>
        <Button variant="outline-success" className="expensemanagmentbtn">Sum of Expense</Button>
        <Button variant="outline-dark" className="expensemanagmentbtn">Sort</Button>
      </div>

      {/* render the popup when the flag is true */}
      <PaymentModePopup
        show={showPaymentModal}
        handleClose={handleClosePayment}
      />
    </div>
  )
}

export default FilterTotal;