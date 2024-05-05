import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dragableAudioCall: false,
}

export const dragableReducer = createSlice({
  name: 'dragable',
  initialState,
  reducers: {
    setDragableAudioCall: (state, action) => {
      state.dragableAudioCall = action.payload;
    },
  },
})

export const { setDragableAudioCall } = dragableReducer.actions

export default dragableReducer.reducer