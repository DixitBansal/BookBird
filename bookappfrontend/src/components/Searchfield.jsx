import * as React from "react";
import { useDispatch } from "react-redux";
import _, { object } from "underscore";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// actions temp purpose
import {
  setBookName,
  setBookAuthor,
  setBookEdition,
  setISBN,
  setPublication,
  setSubject,
  fillBookDetails,
  // emptyBookDetails
} from "../reducer/addpost.reducers";
import { useState } from "react";

const renderOption = (props, option, state, Optionrendercomp) => {
  const { ISBN } = option;
  const key = Date.now() + Math.random();
  const optionProps = { ...props };
  console.log(optionProps);
  return (
    <Optionrendercomp optionProps={optionProps} option={option} key={key} />
  );
};

export default function Searchfield({
  label,
  id,
  apifunction,
  searchParams,
  Optionrendercomp,
  classname,
  multiple = false,
  searchFieldInputValue,
}) {
  const [open, setOpen] = React.useState(false);

  const [options, setOptions] = React.useState([]);

  const dispatch = useDispatch();

  const loading = open && options.length === 0;

  React.useEffect(() => {
    setValue(searchFieldInputValue[searchParams]);
  }, [searchFieldInputValue[searchParams]]);

  const fetchBookNameOnType = React.useCallback(
    _.debounce(async (event) => {
      const keyword = event.target.value;
      if (keyword != "") {
        const { msg, success, result } = await apifunction(keyword, 5, 1);
        console.log("result", result);

        setOptions([...result]);
      }
    }, 300),
    []
  );
  const [value, setValue] = React.useState(
    searchParams == "bookAuthor" ? [] : ""
  );

  const dispatchInputData = (value) => {
    setValue(value);

    value = value === null ? "" : value;

    switch (label) {
      case "ISBN":
        if (typeof value === "string" && value != options[0]?.ISBN) {
          dispatch(setISBN(value));
        } else if (typeof value === "string" && value == options[0]?.ISBN) {
          dispatch(fillBookDetails(options[0]));
        } else {
          dispatch(fillBookDetails(value));
        }
        break;
      case "Name":
        dispatch(
          setBookName(typeof value !== "string" ? value[searchParams] : value)
        );
        break;
      case "Publication":
        dispatch(
          setPublication(
            typeof value !== "string" ? value[searchParams] : value
          )
        );
        break;
      case "Edition":
        dispatch(
          setBookEdition(
            typeof value !== "string" ? value[searchParams] : value
          )
        );
        break;
      case "Subject":
        dispatch(
          setSubject(typeof value !== "string" ? value[searchParams] : value)
        );
        break;
      case "Author":
        dispatch(setBookAuthor(value));
        break;
    }
  };

  return (
    <Autocomplete
      freeSolo
      multiple={multiple}
      id={id}
      disabled={searchFieldInputValue.foundStatus}
      value={value}
      options={options}
      open={open}
      className={classname}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => {
        return option === value;
      }}
      onChange={(event, value) => {
        dispatchInputData(value);
      }}
      getOptionLabel={(option) => {
        // if the string is not associated to any of the option
        if (typeof option === "string") {
          return option;
        }

        return option[searchParams];
      }}
      renderOption={(props, options, state) => {
        return renderOption(props, options, state, Optionrendercomp);
      }}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            // label={params.id}
            label={label}
            onBlur={(e) => {
              searchParams !== "bookAuthor"
                ? dispatchInputData(e.target.value)
                : dispatchInputData(value);
            }}
            // variant='underline'
            onChange={(event) => {
              // fetch the book data from the backend on User hit
              setOpen(true);
              fetchBookNameOnType(event);
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
}
