// store.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )

      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        existingItem.count += 1
      } else {
        // Если товара еще нет в корзине, добавляем его с count = 1
        state.items.push({ ...action.payload, count: 1 })
      }
    },
    removeOneItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )

      if (existingItem) {
        // Если товар уже есть в корзине, уменьшаем количество
        existingItem.count -= 1

        // Если количество достигло нуля, удаляем товар полностью из корзины
        if (existingItem.count === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          )
        }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
  },
})

export const { addItem, removeItem, removeOneItem } = cartSlice.actions
export const selectCartItems = (state) => state.cart.items
export const { reducer: cartReducer } = cartSlice
