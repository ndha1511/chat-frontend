import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // danh sách lời mời kết bạn :))
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
    setFriendAccepted: (state,action) =>{
      state.friendsAccepted = action.payload
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

export const { setFriend, destroy, deleteFriend,setFriendAccepted } = friendReducer.actions

export default friendReducer.reducer