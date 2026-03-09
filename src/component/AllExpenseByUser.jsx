import axios, { all } from "axios";
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
      if (response.status === 200) {
        console.table(response.data);
        setAllUserExpense(response.data.message || response.data || []);
        console.log("Status", response.status);
      }
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  const deleteUserExpense = async (id) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8081/deleteuserexpense",
        { id }
      );
      if (response.status === 200) {
        alert("Expense of user deleted successfuly");
        // refresh the list after deletion
        fetchAllUserExpense();
      }
    } catch (error) {
      console.log("Error in deleting data", error);
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
    </>
  );
};

export default AllExpenseByUser;
