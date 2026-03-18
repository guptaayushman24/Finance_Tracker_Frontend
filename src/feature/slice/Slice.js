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
    totalExpenseByCurrentMonthPaymentModeCASH:0 // These will store the total Expense in current month with payment mode CASH
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
    }
  }
})


// Action creators are generated for each reducer function

export const {setProfileEmailAddress,setFirstName,setLastName,setPaymentMethodFlag,setUserExpenseList,setTotalExpenseByCurrentYear,setTotalExpenseByMonth,setTotalExpenseByCurrentYearByPaymentModeUPI,setTotalExpenseByCurrentYearByPaymentModeCASH,setTotalExpenseByCurrentMonthPaymentModeCASH,setTotalExpenseByCurrentMonthPaymentModeUPI} = profileSlice.actions;

export default profileSlice.reducer;