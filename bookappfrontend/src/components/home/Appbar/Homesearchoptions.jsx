import React from 'react'
import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
// utils
import { titleCase } from '../../../utils/stringUtils'


const Homesearchoptions = ({ option, onClick }) => {

    const theme = useTheme()

    return (
        <Box data-bookid={option.id} data-bookname={option.bookName} sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            ":hover": {
                backgroundColor: theme.palette.secondary.lightDark
            }
        }} onClick={(event) => {
            onClick(event, event.currentTarget.dataset.bookname)
        }}>
            <Typography sx={{
                fontWeight: "700",
                fontSize: "14px"
            }}>
                {option.bookName.length > 15 ? option.bookName.slice(0, Math.floor(option.bookName.length / 2)).toUpperCase() + "..." : option.bookName.toUpperCase()}
            </Typography>
            <Typography sx={{
                color: theme.palette.secondary.text,
                fontSize: "12px",
                wordWrap: "normal"
            }}>
                {`${titleCase(option.publication)} - ${option.bookAuthor[0]}${option.bookAuthor.length > 1 ? "..." : ""}`}
            </Typography>
        </Box>
    )
}

export default Homesearchoptions