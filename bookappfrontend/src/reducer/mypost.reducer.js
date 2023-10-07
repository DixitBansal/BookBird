import { createSlice } from "@reduxjs/toolkit";

const initState = {
    count: 0,
    data: []
}

const mypostReducerSlice = createSlice({
    name: "mypost-reducer",
    initialState: initState,
    reducers: {
        addMypost: (state, action) => {
            state = { ...state, data: [...state.data, ...action.payload], count: action.payload.length }
            return state
        },
        resetMypost: (state, action) => {
            state = initState
            return state
        },
        deletePost: (state, action) => {
            // action payload - id
            let data = state.data.filter((element) => {
                if (element.id != action.payload) return true
            })
            state = { ...state, data: [...state.data], count: state.count - 1 }
            return state
        },
        updatePost: (state, action) => {
            // action payload - data to be updated
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id = action.payload.id) {
                    state.data[i] = action.payload
                    break;
                }
            }
            state = { ...state, data: [...state.data] }
            return state
        }
    }
})

export const mypostreducer = mypostReducerSlice.reducer
export const { addMypost, resetMypost, deletePost, updatePost } = mypostReducerSlice.actions
