import React from 'react'
// components
import { TextField } from '@mui/material'

const Numbertextfield = (params) => {
    return (
        <TextField
            {...params}
            onChange={(event) => {
                params.onChange(event, /^\d+$/.test(event.target.value))
            }}
        />
    )
}

export default Numbertextfield