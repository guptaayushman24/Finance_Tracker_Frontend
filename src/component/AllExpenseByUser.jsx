import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";
import ShowExpense from "./ShowExpense";
import MonthFilterPopup from "./MonthFilterPopup";
import { useSelector } from "react-redux";
import YearFilterPopup from "./YearFilterPopup";

const AllExpenseByUser = () => {
  const [allUserExpense, setAllUserExpense] = useState([]);
  const [showMonthFilter, setShowMonthFilter] = useState(false);
  const [showYearFilter,setShowYearFilter] = useState(false);
  const [monthFilteredExpense, setMonthFilteredExpense] = useState(null);
  const [activeMonthLabel, setActiveMonthLabel] = useState(null);
  const [activeYearLabel,setActiveYearLabel] = useState(null);

  const paymentMethodFlag = useSelector(
    (state) => state.profile.paymentMethodFlag,
  );

  const sortExpenseMethodFlag = useSelector(
    (state) => state.profile.sortExpenseFlag,
  );

  const monthExpenseFlag = useSelector(
    (state) => state.profile.monthExpenseFlag,
  );

  const yearExpenseFlag = useSelector(
    (state) => state.profile.yearExpenseFlag,
  )

  const userExpenseList = useSelector((state) => state.profile.userExpenseList);
  const sortUserExpenseList = useSelector((state) => state.profile.userExpenseSortList);
  const userMonthExpnse = useSelector((state)=>state.profile.userMonthExpnse);
  const userYearExpense = useSelector((state)=>state.profile.userYearExpense);
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

  const resolveExpenseList = () => {
    if (monthFilteredExpense !== null) return { list: monthFilteredExpense, skipReverse: false };
    if (paymentMethodFlag === 1) return { list: userExpenseList, skipReverse: false };
    if (sortExpenseMethodFlag === 1) return { list: sortUserExpenseList, skipReverse: true };
    if (monthExpenseFlag ===1) return {list:userMonthExpnse,skipReverse: true}
    if (yearExpenseFlag===1) return {list:userYearExpense,skipReverse:true}
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

          <Button
           variant={activeYearLabel ? "danger" : "outline-danger"}
           className="expensemanagmentbtn"
           onClick={()=>setShowYearFilter(true)}
          >
            Year
          </Button>
        </div>
      </div>

      <MonthFilterPopup
        show={showMonthFilter}
        handleClose={() => setShowMonthFilter(false)}
      />

      <YearFilterPopup
        show={showYearFilter}
        handleClose={()=>setShowYearFilter(false)}
      ></YearFilterPopup>

      <ShowExpense userExpense={list} skipReverse={skipReverse} />
    </>
  );
};

export default AllExpenseByUser;
