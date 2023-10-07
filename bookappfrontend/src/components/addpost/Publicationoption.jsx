import { Box, Typography } from '@mui/material'
import React from 'react'

const Publicationoption = ({ optionProps, option }) => {
  return (
    <>
    <Box {...optionProps}>
        <Typography>
            {option.publication}
        </Typography>
    </Box>
    </>
  )
}

export default Publicationoption