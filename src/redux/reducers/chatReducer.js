import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chatMessage: {},
}

export const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.chatMessage = action.payload;
    },
    sendMessage: (state, action) => { 
        state.chatMessage = [...state.chatMessage, action.payload];
    },
    pushMessage: (state, action) => {
        state.chatMessage = [...action.payload, ...state.chatMessage];
    }
  },
})

export const { setMessage, sendMessage } = chatReducer.actions

export default chatReducer.reducer