import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  members: [],
  reRender: false,
  admins: []
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
    },
    createAdmin: (state, action) => {
      state.admins = [...action.payload];
    },
    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter(admin => admin !== action.payload);
    },
  },
})

export const { createMember, deleteMember, reRenderMember,createAdmin,deleteAdmin } = renderMember.actions

export default renderMember.reducer