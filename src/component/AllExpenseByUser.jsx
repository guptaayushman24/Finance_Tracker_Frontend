import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";
import ShowExpense from "./ShowExpense";
import { useSelector } from "react-redux";
const AllExpenseByUser = () => {
  const [allUserExpense, setAllUserExpense] = useState([]);
  const paymentMethodFlag = useSelector(
    (state) => state.profile.paymentMethodFlag,
  );

  const sortExpenseMethodFlag = useSelector(
    (state) => state.profile.sortExpenseFlag,
  )
 
  const userExpenseList = useSelector((state) => state.profile.userExpenseList);
  const sortUserExpenseList = useSelector((state) => state.profile.userExpenseSortList);
  const fetchAllUserExpense = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8081/allexpense",
      );
      if (response.status === 200) {
        console.table(response.data);
        setAllUserExpense(response.data.message || response.data || []);
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

      {/* These component will render all the user expense */}
      {/* <ShowExpense userExpense={allUserExpense}></ShowExpense> */}

      {/* If paymentMethod flag is 1 then render the compoent ShowExpense by passing the allUserExpense */}
      {paymentMethodFlag === 1 ? (
        <ShowExpense userExpense={userExpenseList} />
      ) : sortExpenseMethodFlag === 1 ? (
        <ShowExpense userExpense={sortUserExpenseList} />
      ) : (
        <ShowExpense userExpense={allUserExpense} />
      )}
    </>
  );
};

export default AllExpenseByUser;
