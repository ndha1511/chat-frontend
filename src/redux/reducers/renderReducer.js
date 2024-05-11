import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  renderResult: false,
  renderMessageLayout: false,
  renderFriendReques: false,
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  
}

export const renderReducer = createSlice({
  name: 'render',
  initialState,
  reducers: {
    reRender: (state, action) => {
      state.renderResult = !state.renderResult;
    },
    reRenderMessageLayout: (state, action) => {
      state.renderMessageLayout = !state.renderMessageLayout;
    },
    reRenderFriendReques: (state, action) => {
      state.renderFriendReques = !state.renderFriendReques;
    },
    setWindowSize: (state, action) => {
      state.windowSize = action.payload;
    }
  },
})

export const { reRender,reRenderMessageLayout,reRenderFriendReques, setWindowSize} = renderReducer.actions

export default renderReducer.reducer 