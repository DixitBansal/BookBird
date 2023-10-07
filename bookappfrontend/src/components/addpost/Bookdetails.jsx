import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Searchfield from "../Searchfield";
import {
  getBookNameList,
  getBookByISBN,
  getSubjects,
  getPublication,
  getEdition,
  getAuthor,
} from "../../api/addpost.api";
import BookISBNoption from "./BookISBNoption";
import BookNameoption from "./BookNameoption";
import Subjectoption from "./Subjectoption";
import Authoroption from "./Authoroption";
import Publicationoption from "./Publicationoption";
import { Box, Switch, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { setNegotioable } from "../../reducer/addpost.reducers";

const Bookdetails = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  let bookDetailsData = useSelector((state) => state.addPost_bookDetails);
  const { negotiable } = useSelector(
    (state) => state.addPost_additionalDetails
  );

  console.log("bookdata=", bookDetailsData);
  const handleChange = (e) => {
    setChecked(!checked);
    dispatch(setNegotioable(!checked));
  };

  const theme = useTheme();
  return (
    <>
      <Searchfield
        id="ISBN"
        label="ISBN"
        apifunction={getBookByISBN}
        searchParams={"ISBN"}
        Optionrendercomp={BookISBNoption}
        classname="my-2"
        searchFieldInputValue={bookDetailsData}
      />
      <Searchfield
        id="Name"
        label="Name"
        apifunction={getBookNameList}
        searchParams={"bookName"}
        Optionrendercomp={BookNameoption}
        classname="my-2"
        searchFieldInputValue={bookDetailsData}
      />
      <Searchfield
        id="Subject"
        label="Subject"
        apifunction={getSubjects}
        searchParams={"subject"}
        Optionrendercomp={Subjectoption}
        classname="my-2"
        searchFieldInputValue={bookDetailsData}
      />
      <Searchfield
        id="Publication"
        label="Publication"
        apifunction={getPublication}
        searchParams={"publication"}
        Optionrendercomp={Publicationoption}
        classname="my-2"
        searchFieldInputValue={bookDetailsData}
      />
      <Searchfield
        id="edition"
        label="Edition"
        apifunction={getEdition}
        searchParams={"bookEdition"}
        Optionrendercomp={Publicationoption}
        classname="my-2"
        searchFieldInputValue={bookDetailsData}
      />
      <Searchfield
        id="authors"
        label="Author"
        apifunction={getAuthor}
        searchParams={"bookAuthor"}
        Optionrendercomp={Authoroption}
        classname="my-2"
        multiple={true}
        searchFieldInputValue={bookDetailsData}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="my-3"
      >
        <Box
          sx={{
            color: theme.palette.secondary.text,
          }}
        >
          <Typography>Negotiable</Typography>
          <Typography
            sx={{ fontSize: "0.55rem", color: theme.palette.danger.main }}
          >
            *is book price is Negotiable or not for customer
          </Typography>
        </Box>
        <Box>
          <Switch onChange={handleChange} checked={negotiable}></Switch>
        </Box>
      </Box>
    </>
  );
};

export default Bookdetails;
