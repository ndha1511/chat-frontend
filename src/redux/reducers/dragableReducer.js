import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dragableQuestion: false,
}

export const dragableReducer = createSlice({
  name: 'dragable',
  initialState,
  reducers: {
    setDragableQuestion: (state, action) => {
      state.dragableQuestion = action.payload;
    },
  },
})

export const { setDragableQuestion } = dragableReducer.actions

export default dragableReducer.reducer