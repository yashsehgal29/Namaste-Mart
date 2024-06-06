import { configureStore } from '@reduxjs/toolkit' 
import cartreducer from './CartSlice'

export const store = configureStore({
  reducer: {
    cart : cartreducer
  },
})