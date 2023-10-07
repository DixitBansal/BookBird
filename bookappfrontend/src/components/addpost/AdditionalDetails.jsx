import { Box, TextField, TextareaAutosize } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookPrice,
  setPostDescription,
} from "../../reducer/addpost.reducers";

export default function AdditionalDetails() {
  const dispatch = useDispatch();
  const additinalDetails = useSelector(
    (state) => state.addPost_additionalDetails
  );
  console.log("additional=", additinalDetails);

  const setAdditionalDetails = (value, option) => {
    console.log(value);
    switch (option) {
      case "price":
        dispatch(setBookPrice(value));
        break;
      case "postDescription":
        dispatch(setPostDescription(value));
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="standard-basic"
          label="Price"
          variant="standard"
          type="number"
          onChange={(e) => setAdditionalDetails(e.target.value, "price")}
          value={additinalDetails.bookPrice}
        />
        <TextareaAutosize
          color="light-gray"
          aria-label="minimum height"
          minRows={3}
          placeholder="Post Description"
          style={{ width: 250 }}
          onChange={(e) =>
            setAdditionalDetails(e.target.value, "postDescription")
          }
          value={additinalDetails.postDescription}
        />
      </Box>
    </>
  );
}
