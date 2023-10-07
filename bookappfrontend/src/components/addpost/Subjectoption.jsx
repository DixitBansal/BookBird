import { Box, Typography } from '@mui/material'
import React from 'react'

const Subjectoption = ({ optionProps, option }) => {
    return (
        <>
            <Box {...optionProps}>
                <Typography>{option.subject}</Typography>
            </Box>
        </>
    )
}

export default Subjectoption