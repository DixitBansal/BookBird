import React, { useState } from 'react'
import { Box, Typography, TextField, Switch, Slider } from "@mui/material"

const Filters = () => {
    const [value, setValue] = useState([0, 0])
    return (
        <Box sx={{
            margin : "1rem"
        }}>
            <Box>
                <Typography>Edition</Typography>
                <TextField></TextField>
            </Box>
            <Box>
                <Typography>Solded Books</Typography>
                <Switch />
            </Box>
            <Box>
                <Typography>Price</Typography>
                <Slider
                    getAriaLabel={() => 'Price Range'}
                    value={value}
                    onChange={(event, value) => {
                        console.log(value)
                        setValue(value)
                    }}
                    valueLabelDisplay="auto"
                    getAriaValueText={() => value}
                />
            </Box>
            <Box>
                <Typography>College</Typography>
                {/* <Box sx={{
              marginTop: "1rem"
            }}>
              <Autocomplete
                options={colleges}
                loading={showLoading}
                loadingText={
                  <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <CircularProgress />
                  </Box>
                }
                onChange={onChange}
                onOpen={openOptions}
                open={showOptions}
                onClose={closeOptions}
                getOptionLabel={(option) => {
                  return titleCase(option.collegeName)
                }}
                defaultValue={{ collegeName }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label={"College Names"}
                      autoComplete='false'

                    />
                  )
                }}
              />
            </Box> */}
            </Box>
        </Box>
    )
}

export default Filters