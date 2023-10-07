import { createSlice } from "@reduxjs/toolkit";

const IsReset = false;

export const resetInputFieldSlice = createSlice({
  name: "resetInputField",
  initialState: IsReset,
  reducers: {
    resetBookDetails: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { resetBookDetails } = resetInputFieldSlice.actions;

export default resetInputFieldSlice.reducer;
