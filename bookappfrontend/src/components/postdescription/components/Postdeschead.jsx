import React from 'react'
// components
import { Typography, Box } from '@mui/material'

const Postdeschead = ({ data }) => {

    return (
        <Box sx={{
            display : "flex",
            justifyContent : "space-between",
            paddingX: "0.5rem"
        }}>
            <Box>
                <Typography>{data.bookName}</Typography>
                <Typography>{data.publication} publication</Typography>
                <Typography>{data.subject}</Typography>
            </Box>
            <Box>
                <Typography>
                    <span>&#8377;</span>
                    {data.sellingPrice}
                </Typography>
                {
                    data.isNegotiable ?
                        <Typography>*Negotiable</Typography> : null
                }
            </Box>
        </Box>
    )
}

export default Postdeschead