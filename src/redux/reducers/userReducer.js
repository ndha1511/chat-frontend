import { createSlice } from '@reduxjs/toolkit'
import { getDataFromLocalStorage } from '../../utils/LocalStorageHandle';

const user = getDataFromLocalStorage("user");

const initialState = {
  user: user ? user : null,
  blockUsers: []
}

export const userReducer = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setBlockUsers: (state, action) => {
      state.blockUsers = action.payload;
    }
  },
})

export const { setUserInfo, removeUser, setBlockUsers } = userReducer.actions

export default userReducer.reducer