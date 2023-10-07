// create a slice for post description
import { createSlice } from "@reduxjs/toolkit";


const postDescInitState = {}


const postDescSlice = createSlice({
    name: "postDescriptionReducer",
    initialState: postDescInitState,
    reducers: {
        setPostDesc: (state, action) => {
            state = action.payload
            return state
        },
        resetPostDesc: (state, action) => {
            state = postDescInitState
            return state
        }
    }
})

export const { setPostDesc, resetPostDesc } = postDescSlice.actions
export default postDescSlice.reducer