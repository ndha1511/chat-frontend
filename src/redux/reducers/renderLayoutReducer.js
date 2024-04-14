import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  viewIndex: 0,
  contactIndex:0,
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
    }
  },
})

export const { setViewIndedx,setContactIndex } = renderLayoutReducer.actions

export default renderLayoutReducer.reducer