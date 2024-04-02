import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms: [],
}

export const renderRoom = createSlice({
  name: 'room',
  initialState,
  reducers: {
    createRooms: (state, action) => {
      state.rooms = [...action.payload];
    },
    deleteRooms: (state, action) => {
      const index = action.payload;
      state.rooms.splice(index, 1);
    },
    updateRooms: (state, action) => {
      const index = action.payload.index;
      const newRoom = action.payload.room;
      state.rooms[index] = newRoom;
    }
  },
})

export const { createRooms, deleteRooms, updateRooms } = renderRoom.actions

export default renderRoom.reducer 