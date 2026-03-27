import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name:'profile',
  initialState:{
    emailAddress:"",
    firstName:"",
    lastName:"",
    paymentMethodFlag:0, // These flag will decide that we have to render which expense list,
    userExpenseList:[], // These will store the list of the user expense,
    totalExpenseByCurrentYear:0, //  These will store the totalExpense of current year
    totalExpenseByMonth:0, // These will store the totalExpense of current month
    totalExpenseByCurrentYearPaymentModeUPI:0, // These will store the totalExpense in current year with the payment mode UPI
    totalExpenseByCurrentYearPaymentModeCASH:0,// These will store the totalExpense in current year with the payment mode CASH
    totalExpenseByCurrentMonthPaymentModeUPI:0, // These will store the total Expense in current month with payment mode UPI
    totalExpenseByCurrentMonthPaymentModeCASH:0, // These will store the total Expense in current month with payment mode CASH
    totalExpenseToday:0, // These will store the total Expense of today
    totalExpenseTodayByUPI:0, // These will store the total Expense of today by UPI
    totalExpenseTodayByCASH:0, // These will store the total Expense of today by CASH
    userExpenseSortList:[], // These will store the expense in the sorted manner
    sortExpenseFlag:0, // These flag will get activated when the SortExpense button will trigger
    userMonthExpnse:[], // These list will store the monthly expense of the user
    monthExpenseFlag:0, // These flag will get activated when user needs to the see the expense detail in the particular month
    userYearExpense:[], // These list will store the yearly expense of the user
    yearExpenseFlag:0, // These flag will get activated when user needs to see the expense detail in the particular year
    userDateExpense:[], // These will store the expense of the particulat user on the specific date
    userDateFlag:0 // These flag will get activated when user clicks on the FilterByDate
  },
  // Inside the reducer we have written the action
  reducers:{
    // In these we are setting the name
    setProfileEmailAddress:(state,action)=>{
      state.emailAddress = action.payload;
    },
    setFirstName:(state,action)=>{
      state.firstName = action.payload;
    },
    setLastName:(state,action)=>{
      state.lastName = action.payload;
    },
    setPaymentMethodFlag:(state,action)=>{
      state.paymentMethodFlag = action.payload;
    },
    setUserExpenseList:(state,action)=>{
      state.userExpenseList = action.payload;
    },
    setTotalExpenseByCurrentYear:(state,action)=>{
      state.totalExpenseByCurrentYear = action.payload;
    },
    setTotalExpenseByMonth:(state,action)=>{
      state.totalExpenseByMonth = action.payload;
    },
    setTotalExpenseByCurrentYearByPaymentModeUPI:(state,action)=>{
      state.totalExpenseByCurrentYearPaymentModeUPI = action.payload;
    },
    setTotalExpenseByCurrentYearByPaymentModeCASH:(state,action)=>{
      state.totalExpenseByCurrentYearPaymentModeCASH = action.payload;
    },
    setTotalExpenseByCurrentMonthPaymentModeCASH:(state,action)=>{
      state.totalExpenseByCurrentMonthPaymentModeCASH = action.payload;
    },
    setTotalExpenseByCurrentMonthPaymentModeUPI:(state,action)=>{
      state.totalExpenseByCurrentMonthPaymentModeUPI = action.payload;
    },
    setTotalExpenseToady:(state,action)=>{
      state.totalExpenseToday = action.payload;
    },
    setTotalExpenseByUPI:(state,action)=>{
      state.totalExpenseTodayByUPI = action.payload;
    },
    setTotalExpensebyCASH:(state,action)=>{
      state.totalExpenseTodayByCASH = action.payload;
    },
    setUserExpenseSortedList:(state,action)=>{
      state.userExpenseSortList = action.payload;
    },
    setSortExpenseFlag:(state,action)=>{
      state.sortExpenseFlag = action.payload;
    },
    setUserMonthExpenseList:(state,action)=>{
      state.userMonthExpnse = action.payload;
    },
    setMonthExpenseFlag:(state,action)=>{
      state.monthExpenseFlag = action.payload;
    },
    setUserYearExpenseList:(state,action)=>{
      state.userYearExpense = action.payload;
    },
    setYearExpenseFlag:(state,action)=>{
      state.yearExpenseFlag = action.payload;
    },
    setuserDateExpense:(state,action)=>{
      state.userDateExpense = action.payload;
    },
    setuserDateFlag:(state,action)=>{
      state.userDateFlag = action.payload;
    }
  }
})


// Action creators are generated for each reducer function

export const {setProfileEmailAddress,setFirstName,setLastName,setPaymentMethodFlag,setUserExpenseList,setTotalExpenseByCurrentYear,setTotalExpenseByMonth,setTotalExpenseByCurrentYearByPaymentModeUPI,setTotalExpenseByCurrentYearByPaymentModeCASH,setTotalExpenseByCurrentMonthPaymentModeCASH,setTotalExpenseByCurrentMonthPaymentModeUPI,setTotalExpenseToady,setTotalExpenseByUPI,setTotalExpensebyCASH,setUserExpenseSortedList,setSortExpenseFlag,setUserMonthExpenseList,setMonthExpenseFlag,setUserYearExpenseList,setYearExpenseFlag,setuserDateExpense,setuserDateFlag} = profileSlice.actions;

export default profileSlice.reducer;