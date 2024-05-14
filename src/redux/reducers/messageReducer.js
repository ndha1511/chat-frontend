import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  chatInfo: {},
  renderChatInfor: false,
  messages: [],
  renderMessage: false,
  scrollEnd: false,
  messageCall: {},
  messageSearch: {
    messages: [],
    loading: false,
    show: false,
    totalPage: 0,
  }
}

// cấu trúc khi dispatch 
/**  
 * @param {chatInfo}
     const chatInfo = {
        user: {...response},
        roomId: props.room.roomId,
        room: props.room,
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
      const index = state.messages.findIndex(msg => msg.id === action.payload.id);
      if(index !== -1) {
        state.messages[index] = action.payload;
      } else {
        state.messages = [ action.payload, ...state.messages ];
      }
    },
    updateMessage: (state, action) => {
      let newMessage = action.payload;
      for(let i = 0; i < newMessage.length; i++) {
        const index = state.messages.findIndex(msg => msg.id === newMessage[i].id);
        if(index!== -1) {
          state.messages[index] = newMessage[i];
        } else {
          state.messages = [...state.messages, newMessage[i]];
        }
      }
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
    }, 
    reRenderChatInfor: (state, action) => {
      state.renderChatInfor = action.payload;
    },
    setMessageSearch: (state, action) => {
      state.messageSearch = action.payload;
    },
    updateMessageSearch: (state, action) => {
      let newMessage = action.payload;
      for(let i = 0; i < newMessage.length; i++) {
        const index = state.messageSearch.messages.findIndex(msg => msg.id === newMessage[i].id);
        if(index!== -1) {
          state.messageSearch.messages[index] = newMessage[i];
        } else {
          state.messageSearch.messages = [...state.messageSearch.messages, newMessage[i]];
        }
      }
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
  setMessageCall,
  reRenderChatInfor,
  setMessageSearch,
  updateMessageSearch 
} = messageReducer.actions

export default messageReducer.reducer