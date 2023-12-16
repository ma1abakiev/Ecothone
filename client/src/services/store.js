import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { cartReducer } from './cartSlice'
import searchSlice from './searchSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    search: searchSlice,
  },
})

export default store
