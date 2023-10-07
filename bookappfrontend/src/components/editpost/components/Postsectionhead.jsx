import React from 'react'
import { useTheme } from '@emotion/react'
// components
import { Box, Typography } from '@mui/material'

const Postsectionhead = ({ title, description }) => {

    const theme = useTheme()

    return (
        <Box sx={{
            color: theme.palette.fontcolor.heading
        }}>
            <Typography variant='h5' fontWeight={600}>{title}</Typography>
            <Typography variant='p' fontSize={"1rem"}>{description}</Typography>
        </Box>
    )
}

export default Postsectionhead