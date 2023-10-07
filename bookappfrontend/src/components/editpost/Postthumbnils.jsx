import React from 'react'
// components
import Postsectionhead from './components/Postsectionhead'
import FileuploadThumbnil from '../components/FileuploadThumbnil'
import { Box } from '@mui/material'

const Postthumbnils = ({ imgs, setFrontPage, setBackPage }) => {

    return (
        <Box sx={{
            marginTop: "1rem"
        }}>
            <Postsectionhead title={"Thumbnils"} description={"Select Or Upload Front Page and Back Page of Your Book."} />
            <Box sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem"
            }}>

                <FileuploadThumbnil imgurl={imgs[0]} onFileChangeHandel={(file) => {
                    setFrontPage(file)
                }}
                    reducerSize={true}
                />
                <FileuploadThumbnil imgurl={imgs[1]} onFileChangeHandel={(file) => {
                    setBackPage(file)
                }}
                    reducerSize={true}
                />
            </Box>
        </Box>
    )
}

export default Postthumbnils