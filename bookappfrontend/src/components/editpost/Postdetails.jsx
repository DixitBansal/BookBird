import { useTheme } from '@emotion/react'
import { TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import React from 'react'

const PostDetails = ({ description, onChange, accessiblity, accessiblityOnChange }) => {
    const theme = useTheme()
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: '1rem'
        }}>
            <TextField autoComplete={"false"} sx={{
                marginBottom: "10px"
            }}
                onChange={onChange}
                value={description} InputLabelProps={{ shrink: true }} label="Description" multiline fullWidth={true} rows={6}
            />
            <FormControl fullWidth sx={{
                marginY: "0.5rem"
            }}>
                <InputLabel>Accessibility</InputLabel>
                <Select
                    label="Accessibility"
                    value={accessiblity}
                    onChange={accessiblityOnChange}
                >
                    <MenuItem value={"public"}>Public</MenuItem>
                    <MenuItem value={"private"}>Private</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default PostDetails