import React from 'react'
import { useTheme } from '@emotion/react'
// components
import { Box, Switch, FormControlLabel } from '@mui/material'
import Postsectionhead from './components/Postsectionhead'
import Numbertextfield from '../components/Numbertextfield'

const Postprice = ({ sellingPrice, isNegotiable, isNegotiableChangeHandel, priceChangeHandler }) => {

    const theme = useTheme()

    return (
        <Box sx={{
            marginTop: "1rem"
        }}>
            <Postsectionhead title={"Price"} description={"Price of the Book as per your Demand"} />
            <Box
                sx={{
                    marginY: "1rem"
                }}
            >
                <Numbertextfield
                    sx={{
                        marginBottom: "10px"
                    }}
                    autoComplete='false'
                    onChange={priceChangeHandler}
                    value={sellingPrice}
                    InputLabelProps={{ shrink: true }} label="Selling Price" fullWidth={true}
                />
                <FormControlLabel sx={{
                    color: theme.palette.fontcolor.subheading
                }}
                    control={<Switch checked={Boolean(isNegotiable)} onChange={isNegotiableChangeHandel} />}
                    label="Is Price Negotiable"
                />
            </Box>
        </Box>
    )
}

export default Postprice