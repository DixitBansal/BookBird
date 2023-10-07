import React from "react";
import { Box, Typography } from "@mui/material";

const BookNameoption = ({ optionProps, option }) => {
  console.log("options=", option);
  return (
    <Box {...optionProps}>
      <Typography variant="h5" sx={{ fontSize: "0.8rem", fontSmooth: "auto" }}>
        {option.bookName}
      </Typography>
    </Box>
  );
};

export default BookNameoption;
