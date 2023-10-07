import { createSlice } from "@reduxjs/toolkit";

const bookDetailsIS = {
  foundStatus: false,
  book_ID: null,
  bookName: "",
  bookAuthor: [],
  bookEdition: "",
  ISBN: "",
  publication: "",
  subject: "",
};

const additionalDetailsIS = {
  bookPrice: 0,
  postDescription: "",
  negotiable: false,
};

const uploadDetailsIS = {
  frontPagePresined: "",
  backPagePresigned: "",
  college: "",
};

export const addPost_bookDetailSlice = createSlice({
  name: "addPost_bookDetails",
  initialState: bookDetailsIS,
  reducers: {
    setBookName: (state, action) => {
      state.bookName = action.payload;
    },
    setBookEdition: (state, action) => {
      state.bookEdition = action.payload;
    },
    setPublication: (state, action) => {
      state.publication = action.payload;
    },
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setISBN: (state, action) => {
      state.ISBN = action.payload;
    },

    setBookAuthor: (state, action) => {
      state.bookAuthor = action.payload;
    },
    fillBookDetails: (state, action) => {
      // write selection of field logic
      console.log("DD", action.payload);
      let foundStatus = false;
      action.payload.id ? (foundStatus = true) : (foundStatus = false);
      state = { ...action.payload, foundStatus };
      return state;
    },
    emptyBookDetails: (state, action) => {
      state = bookDetailsIS;
      return state;
    },
  },
});

export const addPost_AdditionalDetailSlice = createSlice({
  name: "addPost_additionalDetails",
  initialState: additionalDetailsIS,
  reducers: {
    setNegotioable: (state, action) => {
      state.negotiable = action.payload;
    },
    setBookPrice: (state, action) => {
      state.bookPrice = action.payload;
    },
    setPostDescription: (state, action) => {
      state.postDescription = action.payload;
    },
    emptyAdditionalDetails: (state, action) => {
      state = additionalDetailsIS;
      return state;
    },
  },
});

export const addPost_UploadDetailSlice = createSlice({
  name: "addPost_uploadDetails",
  initialState: uploadDetailsIS,
  reducers: {
    setFrontPagePresigned: (state, action) => {
      state.frontPagePresined = action.payload;
    },
    setBackPagePresigned: (state, action) => {
      state.backPagePresigned = action.payload;
    },
    setCollege: (state, action) => {
      state.college = { ...action.payload, foundStatus: true };
    },

    emptyFrontPagePresigned: (state, action) => {
      state.frontPagePresined = "";

    },
    emptyBackPagePresigned: (state, action) => {
      state.backPagePresigned = "";
    },
    emptyUploadDetails: (state, action) => {
      state = uploadDetailsIS;
      return state;
    }


  },
});

export const {
  setBookName,
  setBookEdition,
  setPublication,
  setSubject,
  setISBN,

  setBookAuthor,
  fillBookDetails,
  emptyBookDetails,
} = addPost_bookDetailSlice.actions;

export const {
  setBookPrice,
  setPostDescription,
  emptyAdditionalDetails,
  setNegotioable,
} = addPost_AdditionalDetailSlice.actions;

export const { setFrontPagePresigned, setBackPagePresigned, setCollege, emptyUploadDetails, emptyFrontPagePresigned, emptyBackPagePresigned } =
  addPost_UploadDetailSlice.actions;
