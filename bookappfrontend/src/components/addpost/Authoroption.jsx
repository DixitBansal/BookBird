import { Box, Typography } from "@mui/material";
import React from "react";

const Authoroption = ({ optionProps, option }) => {
  return (
    <>
      <Box {...optionProps}>
        <Typography>{option.bookAuthor}</Typography>
      </Box>
    </>
  );
};

export default Authoroption;
