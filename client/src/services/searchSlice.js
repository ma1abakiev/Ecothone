import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
  },
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload
    },
  },
})

export const { updateSearchText } = searchSlice.actions
export const selectSearchText = (state) => state.search.searchText

export default searchSlice.reducer
