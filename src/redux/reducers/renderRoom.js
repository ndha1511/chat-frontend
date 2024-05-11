import { createSlice, current } from '@reduxjs/toolkit'
import { arrayToDateTime } from '../../utils/DateTimeHandle';

const initialState = {
  rooms: [],
  reRender: false
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
    updateRoom: (state, action) => {
      console.log(action.payload)
      const temp = [...current(state.rooms)];
      let index = temp.findIndex(room => {
        return room.objectId === action.payload.id});
      if(index !== -1) {
        const roomTemp = temp[index];
        const newRoom = {
          ...action.payload,
          avatar: roomTemp.avatar,
          name: roomTemp.name,
          objectId: action.payload.id
        }
        temp[index] = newRoom;
        temp.sort((a, b) => {
          const timeA = arrayToDateTime(a.time).getTime();
          const timeB = arrayToDateTime(b.time).getTime();
          return timeB - timeA;
        })
      
        state.rooms = temp;
      }
      else {
        const roomTemp = {
          ...action.payload,
          objectId: action.payload.id
        }
        state.rooms = [roomTemp, ...state.rooms];
      }
    },
    reRenderRoom: (state) => {
      state.reRender = !state.reRender;
    }
  },
})

export const { createRooms, deleteRooms, updateRoom, reRenderRoom } = renderRoom.actions

export default renderRoom.reducer