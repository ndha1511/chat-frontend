import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  groups: [],
  renderGroup: false
}

export const groupReducer = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.groups = action.payload;
    },
    reRenderGroup: (state) => {
        state.renderGroup = !state.renderGroup
    }
  },
})

export const {setGroup, reRenderGroup } = groupReducer.actions

export default groupReducer.reducer