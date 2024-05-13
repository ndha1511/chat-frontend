import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  viewIndex: 0,
  contactIndex:0,
  viewContent: {},
  showSearchMessage: false
}

export const renderLayoutReducer = createSlice({
  name: 'renderView',
  initialState,
  reducers: {
    setViewIndedx: (state, action) => {
      state.viewIndex = action.payload;
    },
    setContactIndex:(state,action)=>{
      state.contactIndex=action.payload
    },
    setViewContent: (state, action) => {
      state.viewContent = action.payload;
    },
    setShowSearchMessage: (state, action) => {
      state.showSearchMessage = action.payload;
    }

  },
})

export const { setViewIndedx,setContactIndex, setViewContent, setShowSearchMessage } = renderLayoutReducer.actions

export default renderLayoutReducer.reducer