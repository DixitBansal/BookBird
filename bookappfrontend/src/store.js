import { combineReducers, configureStore } from "@reduxjs/toolkit";
// reducers
import {
  addPost_AdditionalDetailSlice,
  addPost_UploadDetailSlice,
  addPost_bookDetailSlice,
} from "./reducer/addpost.reducers.js";
import { resetInputFieldSlice } from "./reducer/inputFieldReset.reducer.js";
import homePostReducer from "./reducer/home.reducer.js";
import searchResultReducer from "./reducer/searchresult.reducer.js"
import userdataReducer from "./reducer/userdata.reducer.js";
import postDescriptionReducer from "./reducer/postdescription.reducer.js";
import { mypostreducer } from "./reducer/mypost.reducer.js";

const store = configureStore({
  reducer: {
    homePostReducer,
    searchResultReducer,
    userdataReducer,
    addPost_bookDetails: addPost_bookDetailSlice.reducer,
    addPost_additionalDetails: addPost_AdditionalDetailSlice.reducer,
    resetInputField: resetInputFieldSlice.reducer,
    addPost_uploadDetails: addPost_UploadDetailSlice.reducer,
    postDescriptionReducer,
    mypostreducer
  }
})

export default store;
