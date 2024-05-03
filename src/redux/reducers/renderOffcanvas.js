import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  members: [],
  reRender: false
}

export const renderMember = createSlice({
  name: 'member ',
  initialState,
  reducers: {
    createMember: (state, action) => {
        state.members = [...action.payload];
      },
    deleteMember: (state, action) => {
        state.members = state.members.filter(member => member.email !== action.payload);
    },
    reRenderMember: (state) => {
        state.reRender = !state.reRender;
      }
  },
})

export const {createMember, deleteMember,reRenderMember} = renderMember.actions

export default renderMember.reducer