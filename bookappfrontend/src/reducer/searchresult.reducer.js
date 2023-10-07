import { createSlice } from "@reduxjs/toolkit";

const searchResultInitalState = {
    searchResultData: [],
    searchTopic: "",
    currentPage: 0,
}
const searchResultSlice = createSlice({
    name: "searchResultReducer",
    initialState: searchResultInitalState,
    reducers: {
        setDataAndPage: (state, action) => {
            state.searchResultData = [...state.searchResultData , ...action.payload.data]
            state.currentPage = action.payload.currentPage
        },
        setResultPosts: (state, action) => {
            state.searchResultData = [...state.searchResultData, ...action.payload]
        },
        setSearchTopic: (state, action) => {
            state.searchResultData = []
            state.searchTopic = action.payload
        },
        resetResultPosts: (state, action) => {
            state = searchResultInitalState
            return state
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export const { setDataAndPage, setResultPosts, setSearchTopic, resetResultPosts, setCurrentPage } = searchResultSlice.actions

export default searchResultSlice.reducer