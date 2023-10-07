import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material"
import Postsectionhead from './components/Postsectionhead'
// utils
import { titleCase } from "../../utils/stringUtils.js"
// apis
import { getColleges } from "../../api/addpost.api.js"

const Postcollege = ({ collegeName, onChange }) => {

    const [showOptions, setShowOptions] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const [colleges, setColleges] = useState([])

    const openOptions = async () => {
        setShowOptions(true)
        setShowLoading(true)
        if (colleges.length === 0) {
            const response = await getColleges()
            setColleges(response.data.result)
        }
        setShowLoading(false)
    }

    const closeOptions = async () => {
        setShowLoading(false)
        setShowOptions(false)
    }

    return (
        <Box sx={{
            marginTop : "1rem"
        }}>
            <Postsectionhead title={"College Details"} description={"Select College where it is easy to contact you"} />
            <Box sx={{
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
            </Box>
        </Box>
    )
}

export default Postcollege