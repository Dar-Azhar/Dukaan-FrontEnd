import { configureStore } from '@reduxjs/toolkit'
import cartReducer  from './features/cart/cartSlice'
import booksApi from './features/books/booksAPI'
import ordersApi from './features/orders/ordersAPI'

export const store = configureStore({
  reducer: {
    cart : cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
})

 