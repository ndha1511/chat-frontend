import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    renderMessage: false,
}

export const renderMessage = createSlice({
    name: 'renderMessage',
    initialState,
    reducers: {
        reRenderMessageHF: (state) => {
            state.renderMessage = !state.renderMessage;
        },
    },
})

export const { reRenderMessageHF} = renderMessage.actions

export default renderMessage.reducer