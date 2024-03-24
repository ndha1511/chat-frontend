import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../reducers/messageReducer';
import chatReducer from '../reducers/chatReducer';
import renderReducer from '../reducers/renderReducer';
import renderRoom from '../reducers/renderRoom';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    chat: chatReducer,
    render: renderReducer,
    room: renderRoom
  },
})