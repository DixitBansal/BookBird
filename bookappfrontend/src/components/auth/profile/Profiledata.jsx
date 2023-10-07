import React from 'react'
// componets
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const Profiledata = ({ profileData, profileDispatch, handelLogout, handelUpdateProfile, showLogoutLoading, showPostUpdateLoading, enableEdit }) => {
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                padding: "1rem",
                flexDirection: "column"
            }}>
                <FormControl>
                    <TextField disabled={enableEdit} label={"Name"} value={profileData.userNames} sx={{
                        marginY: "0.5rem",
                        width: "100%"
                    }}
                        onChange={(event) => {
                            profileDispatch({ type: "SET_USERNAME", payload: event.target.value })
                        }}
                    />
                    <TextField disabled={enableEdit} label={"Email"} value={profileData.email} sx={{
                        marginY: "0.5rem",
                        width: "100%"
                    }}
                        onChange={(event) => {
                            profileDispatch({ type: "SET_EMAIL", payload: event.target.value })
                        }}
                    />
                    <Box sx={{
                        marginY: "0.5rem"
                    }}>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{
                            paddingLeft: "1rem"
                        }}>Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={profileData.gender ? profileData.gender : ""}
                            name="radio-buttons-group"
                            onChange={(event) => {
                                profileDispatch({ type: "SET_GENDER", payload: event.target.value })
                            }}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >
                            <FormControlLabel value="f" control={<Radio disabled={enableEdit} />} label="Female" />
                            <FormControlLabel value="m" control={<Radio disabled={enableEdit} />} label="Male" />
                            <FormControlLabel value="o" control={<Radio disabled={enableEdit} />} label="Other" />
                        </RadioGroup>
                    </Box>
                    <TextField disabled={enableEdit} label={"Contact"} value={profileData.contacts} sx={{
                        marginY: "0.5rem",
                        width: "100%"
                    }}
                        autoComplete='off'
                        onChange={(event) => {
                            profileDispatch({ type: "SET_CONTACT", payload: event.target.value })
                        }}
                    />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1rem"
                    }}>
                        <LoadingButton loading={showLogoutLoading} variant='outlined' color='error' onClick={handelLogout}>
                            Logout
                        </LoadingButton>
                        <LoadingButton disabled={enableEdit } loading={showPostUpdateLoading} onClick={handelUpdateProfile} variant='contained' color='success'>
                            Update Profile
                        </LoadingButton>
                    </Box>
                </FormControl>
            </Box >
        </>
    )
}

export default Profiledata