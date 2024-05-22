import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    renderMessage: false,
    typingChat: {
        user: {},
        showTyping: false
    }
}

export const renderMessage = createSlice({
    name: 'renderMessage',
    initialState,
    reducers: {
        reRenderMessageHF: (state) => {
            state.renderMessage = !state.renderMessage;
        },
        setTypingChat: (state, action) => {
            state.typingChat = action.payload;
        }
    },
})

export const { reRenderMessageHF, setTypingChat} = renderMessage.actions

export default renderMessage.reducer