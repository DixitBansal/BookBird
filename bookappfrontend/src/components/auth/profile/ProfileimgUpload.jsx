import React from 'react'
import { useTheme } from '@emotion/react'
// components
import { Box, IconButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
// images
import profileAvatar from "../../../images/signupprofileimgavatar.png"
import { titleCase } from '../../../utils/stringUtils';

const ProfileimgUpload = ({ data, showImageModel }) => {

    const theme = useTheme()

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            paddingTop: "1rem",
            backgroundColor: theme.palette.bg.main,
            height: "42%"
        }}>
            <Box sx={{
                borderRadius: "100%",
                height: "150px",
                width: "150px",
                position: "relative",
                borderWidth: "5px",
                borderColor: theme.palette.primary.main
            }}>
                {data.profileImgUrl ?
                    <img src={data.profileImgUrl} className='w-full h-full object-cover rounded-full' />
                    :
                    <Avatar src={profileAvatar} sx={{
                        width: "100%",
                        height: "100%"
                    }} />
                }
                <Box
                    sx={{
                        position: "absolute",
                        right: "-10%",
                        bottom: "10%",
                        borderRadius: "100%",
                        backgroundColor: "white",
                    }}
                >
                    <input type='file' onChange={showImageModel} className='hidden' id={"profileImgUploadInput"} />
                    <IconButton
                        size='large'
                        color="primary"
                        onClick={(event) => {
                            document.getElementById("profileImgUploadInput").click()
                        }}
                    >
                        <CameraAltOutlinedIcon fontSize='2rem' />
                    </IconButton>
                </Box>
            </Box>
            <Typography sx={{ fontSize: "1.25rem", marginTop: "0.5rem", fontWeight: "700" }}>{titleCase(data.userNames)}</Typography>
        </Box>
    )
}

export default ProfileimgUpload