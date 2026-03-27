import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";
import ShowExpense from "./ShowExpense";
import MonthFilterPopup from "./MonthFilterPopup";
import { useSelector } from "react-redux";

const AllExpenseByUser = () => {
  const [allUserExpense, setAllUserExpense] = useState([]);
  const [showMonthFilter, setShowMonthFilter] = useState(false);
  const [monthFilteredExpense, setMonthFilteredExpense] = useState(null);
  const [activeMonthLabel, setActiveMonthLabel] = useState(null);

  const paymentMethodFlag = useSelector(
    (state) => state.profile.paymentMethodFlag,
  );

  const sortExpenseMethodFlag = useSelector(
    (state) => state.profile.sortExpenseFlag,
  );

  const monthExpenseFlag = useSelector(
    (state) => state.profile.monthExpenseFlag,
  );

  const userExpenseList = useSelector((state) => state.profile.userExpenseList);
  const sortUserExpenseList = useSelector((state) => state.profile.userExpenseSortList);
  const userMonthExpnse = useSelector((state)=>state.profile.userMonthExpnse);
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

  const handleMonthApply = async ({ month, year }) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8081/expensebymonth?month=${month}&year=${year}`,
      );
      if (response.status === 200) {
        setMonthFilteredExpense(response.data.message || response.data || []);
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        setActiveMonthLabel(`${monthNames[month - 1]} ${year}`);
      }
    } catch (error) {
      console.log("Error in filtering by month", error);
    }
  };

  useEffect(() => {
    fetchAllUserExpense();
  }, []);

  const resolveExpenseList = () => {
    if (monthFilteredExpense !== null) return { list: monthFilteredExpense, skipReverse: false };
    if (paymentMethodFlag === 1) return { list: userExpenseList, skipReverse: false };
    if (sortExpenseMethodFlag === 1) return { list: sortUserExpenseList, skipReverse: true };
    if (monthExpenseFlag ===1) return {list:userMonthExpnse,skipReverse: true}
    return { list: allUserExpense, skipReverse: false };
  };

  const { list, skipReverse } = resolveExpenseList();

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

          <Button
            variant={activeMonthLabel ? "danger" : "outline-danger"}
            className="expensemanagmentbtn"
            onClick={() => setShowMonthFilter(true)}
          >
            {activeMonthLabel ? `${activeMonthLabel} ✕` : "Month"}
          </Button>

          <Button variant="outline-success" className="expensemanagmentbtn">
            Year
          </Button>
        </div>
      </div>

      <MonthFilterPopup
        show={showMonthFilter}
        handleClose={() => setShowMonthFilter(false)}
      />

      <ShowExpense userExpense={list} skipReverse={skipReverse} />
    </>
  );
};

export default AllExpenseByUser;
