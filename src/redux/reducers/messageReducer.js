import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chatInfo: {},
  messages: [],
  renderMessage: false,
  scrollEnd: false,
  messageCall: {}
}

// cấu trúc khi dispatch 
/**  
 * @param {chatInfo}
     const chatInfo = {
        user: {...response},
        roomId: props.room.roomId
      };
  * @param {messages}
      const messages = [phần response của message khi fetch data]
*/

export const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setChatInfo: (state, action) => {
      state.chatInfo = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    pushMessage: (state, action) => {
      state.messages = [action.payload, ...state.messages];
    },
    updateMessage: (state, action) => {
      state.messages = state.messages.map((message) => {
        if(message.id === action.payload.id) return action.payload;
        return message;
      });
    },
    deleteMessage: (state, action) => {
      const index = action.payload;
      state.messages.splice(index, 1);
    },
    reRenderMessge: (state) => {
      state.renderMessage = !state.renderMessage;
    },
    setScrollEnd: (state) => {
      state.scrollEnd = !state.scrollEnd;
    },
    setMessageCall: (state, action) => {
      state.messageCall = action.payload;
    }
  },
})

export const { 
  setChatInfo, 
  setMessages, 
  pushMessage, 
  updateMessage, 
  deleteMessage, 
  reRenderMessge, 
  setScrollEnd,
  setMessageCall 
} = messageReducer.actions

export default messageReducer.reducer