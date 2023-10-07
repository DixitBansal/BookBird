import React from 'react'
import { useTheme } from '@emotion/react'
// components
import { Box, FormControlLabel, Radio, RadioGroup, Switch } from "@mui/material"
import Postsectionhead from './components/Postsectionhead'

const Postsoldstatus = ({ value, onChange }) => {

    const theme = useTheme()

    return (
        <Box sx={{
            marginTop: "1rem"
        }}>
            <Postsectionhead title={"Sold Status"} description={"Sold status will decide the visibility of your post"}></Postsectionhead>
            <RadioGroup sx={{
                color : theme.palette.fontcolor.subheading
            }}
            value={value}
            onChange={onChange}
            >
                <FormControlLabel value={1} control={<Radio />} label={"Yes, Book is Sold out"} />
                <FormControlLabel value={0} control={<Radio />} label={"No, Book is Available for selling"} />
            </RadioGroup>
        </Box>
    )
}

export default Postsoldstatus