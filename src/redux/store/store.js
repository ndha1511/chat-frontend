import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../reducers/messageReducer';
import chatReducer from '../reducers/chatReducer';
import renderReducer from '../reducers/renderReducer';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    chat: chatReducer,
    render: renderReducer
  },
})