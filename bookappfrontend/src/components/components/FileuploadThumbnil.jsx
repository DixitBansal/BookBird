import React, { useState, useRef } from 'react'
import { useTheme } from '@emotion/react';
// components
import { Box, Card, CardContent, Typography } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileuploadThumbnil = ({ onFileChangeHandel, reducerSize, imgurl = null }) => {
    const theme = useTheme()

    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileBlobURl, setFileBlobUrl] = useState(null)
    const inputref = useRef(null)

    return (
        <Box>
            <Card>
                {
                    !selectedFile ?
                        <Box sx={{
                            height: "200px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            flexDirection: "column",
                            color: theme.palette.fontcolor.subheading
                        }}
                            onClick={(event) => {
                                inputref.current.click()
                            }}
                        >
                            {
                                imgurl ?
                                    <Box>
                                        <img src={imgurl} />
                                    </Box>
                                    :
                                    <>
                                        <UploadFileIcon sx={{
                                            fontSize: "2.5rem"
                                        }} />
                                        <Typography fontSize={"1rem"}>Upload Image</Typography>
                                    </>
                            }
                            <input ref={inputref} type={"file"} className='absolute invisible' onChange={(event) => {
                                const file = event.target.files[0]
                                if (reducerSize.enable) {
                                    // reducer the size of the image
                                }
                                const imgurl = URL.createObjectURL(file)
                                setFileBlobUrl(imgurl)
                                setSelectedFile(file)
                                onFileChangeHandel(file)
                            }
                            } />
                        </Box>
                        :
                        <CardContent sx={{
                            height: "250px",
                            width: "100%",
                            position: "relative"
                        }}>
                            <img src={selectedFileBlobURl} />
                        </CardContent>
                }
            </Card>
        </Box>
    )
}

export default FileuploadThumbnil