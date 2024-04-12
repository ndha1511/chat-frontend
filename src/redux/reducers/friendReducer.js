import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  friends: [],
  friendsAccepted: []
}

export const friendReducer = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriend: (state, action) => {
      state.friends = action.payload;
    },
    destroy: (state) => {
        state.friends = [];
        state.friendsAccepted = [];
    },
    deleteFriend: (state, action) => {
        const index = state.friends.findIndex(friend => friend.user.email === action.payload.user.email);
        if (index !== -1) {
            state.friends.splice(index, 1);
        }
    },
  },
})

export const { setFriend, destroy, deleteFriend } = friendReducer.actions

export default friendReducer.reducer