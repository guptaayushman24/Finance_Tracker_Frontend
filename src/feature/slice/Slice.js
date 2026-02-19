import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name:'profile',
  initialState:{
    emailAddress:""
  },
  // Inside the reducer we have written the action
  reducers:{
    // In these we are setting the name
    setProfileEmailAddress:(state,action)=>{
      state.emailAddress = action.payload;
    }
  }
})


// Action creators are generated for each reducer function

export const {setProfileEmailAddress} = profileSlice.actions;

export default profileSlice.reducer;