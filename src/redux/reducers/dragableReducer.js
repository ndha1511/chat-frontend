import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dragableAudioCall: false,
  dragableCallQuestion: false,
  dragableCallRequest: false,
  remoteStreams: []
}

export const dragableReducer = createSlice({
  name: 'dragable',
  initialState,
  reducers: {
    setDragableAudioCall: (state, action) => {
      state.dragableAudioCall = action.payload;
    },
    setDragableCallQuestion: (state, action) => {
      state.dragableCallQuestion = action.payload;
    },
    setDragableCallRequest: (state, action) => {
      state.dragableCallRequest = action.payload;
    },
    addRemoteStream: (state, action) => {
      if (!state.remoteStreams.some(value => value.stream.id === action.payload.stream.id)) {
        state.remoteStreams = [...state.remoteStreams, action.payload];
      }

    },
    deteleRemoteStream: (state, action) => {
      const index = state.remoteStreams.findIndex(value => value.user.email === action.payload.user.email);
      if (index !== -1) {
        state.remoteStreams.splice(index, 1);
      }
    },
    revertRemoteStream: (state) => {
      state.remoteStreams = [];
    }
  },
})

export const { 
  setDragableAudioCall,
  setDragableCallQuestion,
  setDragableCallRequest,
  addRemoteStream,
  deteleRemoteStream,
  revertRemoteStream
} = dragableReducer.actions

export default dragableReducer.reducer