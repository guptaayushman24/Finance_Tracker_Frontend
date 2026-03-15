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
    totalExpenseByMonth:0 // These will store the totalExpense of current month
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
    }
  }
})


// Action creators are generated for each reducer function

export const {setProfileEmailAddress,setFirstName,setLastName,setPaymentMethodFlag,setUserExpenseList,setTotalExpenseByCurrentYear,setTotalExpenseByMonth} = profileSlice.actions;

export default profileSlice.reducer;