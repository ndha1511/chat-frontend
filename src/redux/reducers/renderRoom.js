import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  renderResult: {
    roomId: "",
    bool: false
  },
}

export const renderRoom = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reRenderRoom: (state, action) => {
      state.renderResult.roomId = action.payload;
      state.renderResult.bool = !state.renderResult.bool;
    }
  },
})

export const { reRenderRoom } = renderRoom.actions

export default renderRoom.reducer 