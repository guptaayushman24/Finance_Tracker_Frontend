import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";
function ShowExpense (props){
  const allUserExpense = props.userExpense;
  const deleteUserExpense = async (id) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8081/deleteuserexpense",
        { id }
      );
      if (response.status === 200) {
        alert("Expense of user deleted successfuly");
        // refresh the list after deletion
        // fetchAllUserExpense();
      }
    } catch (error) {
      console.log("Error in deleting data", error);
    }
  };
  useEffect(()=>{
    <ShowExpense></ShowExpense>
  },[])
  return(
     
    <div className="table-section">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Expense Type</th>
              <th>Expense Description</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping Expense which is fetched from API */}
            {allUserExpense && allUserExpense.length > 0 &&
              [...allUserExpense]
                .reverse()
                .map((value, index) => (
                  <tr key={index}>
                    <td>{value.expenseType}</td>
                    <td>{value.description}</td>
                    <td>{value.value}</td>
                    <td>{value.paymentMode}</td>
                    <td>{value.expense_date}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteUserExpense(value.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
  )
}

export default ShowExpense;