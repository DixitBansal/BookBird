import { createSlice } from "@reduxjs/toolkit";

const initUserData = {
    isReady: false
}

/**
 * Slice will contain the user data after login
 * or registration
 */

const userDataSlice = createSlice({
    name: "userDataReducer",
    initialState: initUserData,
    reducers: {
        setUserData: (state, action) => {
            state = { ...action.payload, isReady: true }
            return state
        },
        updateUserData: (state, action) => {
            state = { ...state, ...action.payload }
            return state
        },
        resetUserData: (state, action) => {
            state = { ...initUserData, isReady: true }
            return state
        }
    }
})

export const { setUserData, updateUserData, resetUserData } = userDataSlice.actions

export default userDataSlice.reducer