import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { FaTable, FaCalendarDay, FaCalendarAlt, FaCalendar } from "react-icons/fa";
import axiosInstance from "../util/AxiosInstance";
import ShowExpense from "./ShowExpense";
import MonthFilterPopup from "./MonthFilterPopup";
import { useSelector } from "react-redux";
import YearFilterPopup from "./YearFilterPopup";
import CurrentDayFilterPopup from "./CurrentDayFilterPopup";

const AllExpenseByUser = () => {
  const [allUserExpense, setAllUserExpense] = useState([]);
  const [showMonthFilter, setShowMonthFilter] = useState(false);
  const [showYearFilter,setShowYearFilter] = useState(false);
  const [showCurrentDayFilter, setShowCurrentDayFilter] = useState(false);
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
  );

  const userDateFlag = useSelector(
    (state) => state.profile.userDateFlag,
  )

  const userExpenseList = useSelector((state) => state.profile.userExpenseList);
  const sortUserExpenseList = useSelector((state) => state.profile.userExpenseSortList);
  const userMonthExpnse = useSelector((state)=>state.profile.userMonthExpnse);
  const userYearExpense = useSelector((state)=>state.profile.userYearExpense);
  const userDateExpense = useSelector((state)=>state.profile.userDateExpense);
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
    if (userDateFlag===1) return {list:userDateExpense,skipReverse:true}
    return { list: allUserExpense, skipReverse: false };
  };

  const { list, skipReverse } = resolveExpenseList();

  return (
    <>
      <div className="et-section-card">
        <div className="et-section-header">
          <div className="et-section-icon et-section-icon--green">
            <FaTable />
          </div>
          <div>
            <p className="et-section-title">Transaction History</p>
            <p className="et-section-desc">Browse and filter all recorded expenses</p>
          </div>
        </div>

        <div className="et-btn-grid">
          <button
            className="et-action-btn et-action-btn--primary"
            onClick={() => setShowCurrentDayFilter(true)}
          >
            <FaCalendarDay /> Sum Of Expense By Date
          </button>

          <button
            className={`et-action-btn ${activeMonthLabel ? "et-action-btn--active-month" : "et-action-btn--danger"}`}
            onClick={() => setShowMonthFilter(true)}
          >
            <FaCalendarAlt /> {activeMonthLabel ? `${activeMonthLabel} ✕` : "Month"}
          </button>

          <button
            className={`et-action-btn ${activeYearLabel ? "et-action-btn--active-month" : "et-action-btn--violet"}`}
            onClick={() => setShowYearFilter(true)}
          >
            <FaCalendar /> Year
          </button>
        </div>
      </div>

      <CurrentDayFilterPopup
        show={showCurrentDayFilter}
        handleClose={() => setShowCurrentDayFilter(false)}
      />

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
