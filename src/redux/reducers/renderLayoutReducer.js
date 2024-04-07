import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  viewIndex: 0,
}

export const renderLayoutReducer = createSlice({
  name: 'renderView',
  initialState,
  reducers: {
    setViewIndedx: (state, action) => {
      state.viewIndex = action.payload;
    },
  },
})

export const { setViewIndedx } = renderLayoutReducer.actions

export default renderLayoutReducer.reducer