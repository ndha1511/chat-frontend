import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  members: [],
  reRender: false,
  admins: [],
  showOffcanvas:false,
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
    setShowOffcanvas: (state, action) => {
      state.showOffcanvas = !state.showOffcanvas;
    
    }
  },
})

export const { createMember, deleteMember, reRenderMember,createAdmin,deleteAdmin ,setShowOffcanvas} = renderMember.actions

export default renderMember.reducer