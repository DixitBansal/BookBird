import { createSlice } from "@reduxjs/toolkit";

const homePost = {
    postData: [],
    currentPage: 0,
    loading: true
}

const homeReducerSlice = createSlice({
    name: "homeReducerSlice",
    initialState: homePost,
    reducers: {
        setHomePosts: (state, action) => {
            state.postData = [...state.postData, ...action.payload]
        },
        resetHomePost: (state, action) => {
            state = homePost
            return state
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setShowLoading: (state, action) => {
            state.showLoading = action.payload
        },
        setDataAndPage: (state, action) => {

            /*
                will set both the page and data called
                inside the call back to infinte scroll
            */

            state.postData = [...state.postData, ...action.payload.data]
            state.currentPage = action.payload.currentPage
        }
    }
})

export const { setHomePosts, resetHomePost, setCurrentPage, setShowLoading, setDataAndPage } = homeReducerSlice.actions

export default homeReducerSlice.reducer
