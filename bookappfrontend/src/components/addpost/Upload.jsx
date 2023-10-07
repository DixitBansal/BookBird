import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColleges, getPresignedUrl } from "../../api/addpost.api";
import UploadButton from "./UploadButton";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import { setCollege } from "../../reducer/addpost.reducers";
import { setCollegeId } from "../../reducer/addpost.reducers";

export default function Upload() {
  const dispatch = useDispatch();

  const uploadDetailsData = useSelector(
    (state) => state.addPost_uploadDetails
  );

  const [colleges, setColleges] = useState([{}])
  const getAllColleges = async () => {
    const response = await getColleges();
    if (response.data.result) {
      const colleges = response.data.result.map((value, index) => {
        return { label: `${value.collegeName}, ${value.city}`, collegeInfo: value }
      })
      console.log("colleges", colleges)
      setColleges(colleges);
    }

  }

  React.useEffect(() => {
    getAllColleges();
  }, [])


  const [inputValue, setInputValue] = useState('');

  return (
    <>


      <Autocomplete
        id="college-select"
        sx={{ width: 300, marginTop: "0.9rem" }}
        options={colleges}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {

          setInputValue(newInputValue);

        }}
        onChange={(event, newValue) => {
          console.log(newValue)
          dispatch(setCollege(newValue?.collegeInfo ?? {}))

        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box   {...props} key={option.collegeInfo?.id ?? ""}>


            {option.label}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => {

          return option.label === value.label
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose College"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
      <UploadButton
        label="Front Page"
        getPresignedUrlFunction={getPresignedUrl}
        preSignedUrl={uploadDetailsData.frontPagePresined}
      />
      <UploadButton
        label="Back Page"
        getPresignedUrlFunction={getPresignedUrl}
        preSignedUrl={uploadDetailsData.backPagePresigned}
      />
    </>
  );
}
