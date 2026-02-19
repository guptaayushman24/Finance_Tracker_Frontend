import { configureStore } from '@reduxjs/toolkit'
import profileSliceReducer from '../feature/slice/Slice'
export const store = configureStore({
  reducer: {
    emailAddress:profileSliceReducer
  },
})

export default store;