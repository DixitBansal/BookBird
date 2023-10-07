import { createSlice } from "@reduxjs/toolkit";

const initialBookDetails = {
  value: 0,
};

export const bookDetailsSlice = createSlice({
  name: "BOOK_DETAILS_SLICE",
  initialState: initialBookDetails,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
