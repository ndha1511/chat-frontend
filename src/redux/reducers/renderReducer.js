import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  renderResult: false,
}

export const renderReducer = createSlice({
  name: 'render',
  initialState,
  reducers: {
    reRender: (state, action) => {
      state.renderResult = !state.renderResult;
    }
  },
})

export const { reRender } = renderReducer.actions

export default renderReducer.reducer 