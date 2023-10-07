import React, { useReducer } from 'react'
// components
import { Typography, Box, TextField } from '@mui/material';

const Postdetails = ({ data, makeEditable }) => {
    /**
     * @props : data :- the data of the post select by the user to show description
     * @props : makeEditable :- if the user is the creater of the post then we have to make the component editable
     *          this prop will tell about that
     */

    return (
        <Box>
            <Box>
                <Typography>Authors</Typography>
                <Typography>
                    {data.bookAuthor.map((element, index) => {
                        if (makeEditable) {
                            return <TextField key={index} value={element} />
                        }
                        return <span key={index}>{element}{index !== data.bookAuthor.length - 1 ? ", " : ""}</span>
                    })}
                </Typography>
            </Box>
            <Box>
                {
                    makeEditable ?
                        <TextField label={"Edition"} value={data.bookEdition} />
                        :
                        <>
                            <Typography>
                                Edition
                            </Typography>
                            <Typography>
                                {data.bookEdition} edition
                            </Typography>
                        </>
                }
            </Box>
            <Box>
                <Typography>Prefered Location</Typography>
                <Typography></Typography>
            </Box>
            {
                makeEditable ?
                    <>
                        <Typography>Description</Typography>
                        <TextField value={data.postDescription ? data.postDescription : ""} multiline={true} />
                    </>
                    :
                    data.postDescription ?
                        <Box>
                            <>
                                <Typography>Description</Typography>
                                <Typography>{data.postDescription}</Typography>
                            </>
                        </Box>
                        :
                        null
            }
        </Box>
    )
}

export default Postdetails