import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  renderResult: false,
  renderMessageLayout: false,
  renderFriendReques: false,
  
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
    }
  },
})

export const { reRender,reRenderMessageLayout,reRenderFriendReques} = renderReducer.actions

export default renderReducer.reducer 