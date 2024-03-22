import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chatInfo: {},
}

export const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setChatInfo: (state, action) => {
      state.chatInfo = action.payload;
    },
  },
})

export const { setChatInfo } = messageReducer.actions

export default messageReducer.reducer