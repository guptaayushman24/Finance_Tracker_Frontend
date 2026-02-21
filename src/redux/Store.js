import { configureStore } from '@reduxjs/toolkit'
import profileSliceReducer from '../feature/slice/Slice'
export const store = configureStore({
  reducer: {
    profile:profileSliceReducer
  },
})

export default store;