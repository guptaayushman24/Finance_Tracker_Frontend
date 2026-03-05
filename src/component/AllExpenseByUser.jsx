import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";

const AllExpenseByUser = () => {
  const [allUserExpense, setAllUserExpense] = useState([]);
  const fetchAllUserExpense = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8081/allexpense",
      );
      if (response.status == 200) {
        console.table(response.data);
        console.log("Status", response.status);
        setAllUserExpense(response.data);
      }
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };
  useEffect(() => {
    fetchAllUserExpense();
  }, []);
  return (
    <>
      <div className="module-header-parent">
        <div>
          <h5>Advance Detail</h5>
        </div>
        <div className="module-header">
          <Button variant="primary" className="expensemanagmentbtn">
            Current Day
          </Button>
          <Button variant="outline-danger" className="expensemanagmentbtn">
            Month
          </Button>
          <Button variant="outline-success" className="expensemanagmentbtn">
            Year
          </Button>
        </div>
      </div>

      <div className="table-section">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping Expense which is fetched from API */}

            {allUserExpense.length > 0 &&
              allUserExpense.map((value, index) => {
                return(
                  <tr key={index}>
                  <td>{value.expenseType}</td>
                  <td>{value.description}</td>
                  <td>{value.expense_date}</td>
                  <td>{value.value}</td>
                  <td>{value.paymentMode}</td>
                  <td>
                    <Button size="sm" variant="danger">
                      Delete
                    </Button>
                  </td>
                  
                </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllExpenseByUser;
