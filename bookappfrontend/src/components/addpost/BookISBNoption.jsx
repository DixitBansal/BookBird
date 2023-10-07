import React from "react";
import { Box, Typography } from "@mui/material";

const BookISBNoption = ({ optionProps, option }) => {
  return (
    <Box
      {...optionProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontSize: "1rem", fontWeight: "700", fontSmooth: "auto" }}
      >
        {option.ISBN}
      </Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "0.8rem", fontSmooth: "auto", marginRight: "8px" }}
        >
          {option.bookName}
        </Typography>
        <Typography variant="p" sx={{ fontSize: "0.8rem", fontSmooth: "auto" }}>
          {option.subject}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookISBNoption;
