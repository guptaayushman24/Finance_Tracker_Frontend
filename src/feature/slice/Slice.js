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
    sortExpenseFlag:0 // These flag will get activated when the SortExpense button will trigger
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
    }
  }
})


// Action creators are generated for each reducer function

export const {setProfileEmailAddress,setFirstName,setLastName,setPaymentMethodFlag,setUserExpenseList,setTotalExpenseByCurrentYear,setTotalExpenseByMonth,setTotalExpenseByCurrentYearByPaymentModeUPI,setTotalExpenseByCurrentYearByPaymentModeCASH,setTotalExpenseByCurrentMonthPaymentModeCASH,setTotalExpenseByCurrentMonthPaymentModeUPI,setTotalExpenseToady,setTotalExpenseByUPI,setTotalExpensebyCASH,setUserExpenseSortedList,setSortExpenseFlag} = profileSlice.actions;

export default profileSlice.reducer;