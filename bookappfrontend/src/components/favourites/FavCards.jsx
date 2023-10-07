import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Margin } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircleIcon from "@mui/icons-material/Circle"
import { useTheme } from '@emotion/react';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { titleCase } from '../../utils/stringUtils';


const Img = {
    margin: 'auto',
    display: 'block',
    maxWidth: '7rem',
    maxHeight: '7rem',
    borderRadius: "50%",

};


export default function FavCards({ data, showBookMark }) {
    const { img_urls, bookName, subject, bookEdition, sellingPrice } = data
    const theme = useTheme()
    return (
        <Paper
            sx={{
                p: 2,
                marginX: 'auto',
                maxWidth: "95%",
                marginY: "0.5rem",

                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>

                        <img src={img_urls.split(",")[0]} style={{ ...Img, objectFit: "cover" }} alt="photo" />
                        <Typography sx={{
                            fontSize: "0.75rem",
                            marginTop: "1rem",
                            color: theme.palette.secondary.text
                        }}>

                            {/* {calculateAgoTime()} */}
                            2hr ago
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                        <Typography className='font-bold text-3xl  mt-3 text-slate-900' style={{
                            color: theme.palette.secondary.darkHeading,
                            fontWeight: theme.typography.bookHeading,
                            fontSize: theme.typography.bookHeadingSize
                        }}>
                            {/* {data.bookName.toUpperCase()} */}
                            {titleCase(bookName)}
                        </Typography>
                        <Typography style={{
                            color: theme.palette.secondary.text,
                            fontSize: theme.typography.subHeadingSize
                        }}>
                            {/* {data.subject} */}
                            {titleCase(subject)}
                        </Typography>
                        <Box display={"flex"}>
                            <Typography variant='subtitle2' style={{
                                color: theme.palette.secondary.darkHeading
                            }}>Edition</Typography>
                            <Typography variant='subtitle2'><CircleIcon sx={{
                                marginRight: "10px",
                                marginLeft: "10px",
                                fontSize: "7px"
                            }} /></Typography>
                            <Typography variant='subtitle2' sx={{
                                color: theme.palette.secondary.text
                            }}>
                                {/* {data.bookEdition} */}
                                {bookEdition}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>

                        <p className='mt-3 text-slate-900  flex items-center justify-end'>
                            <CurrencyRupeeIcon sx={{
                                "fontSize": "18px"
                            }} />
                            <span className='font-bold text-[24px]'>
                                {/* {data.sellingPrice} */}
                                {sellingPrice}
                            </span>
                        </p>
                    </Box>
                </Grid>
                {
                    showBookMark ?
                        <Grid item xs={1}>
                            <IconButton sx={{ color: theme.palette.primary.main }}  >
                                <BookmarkRemoveIcon />
                            </IconButton>
                        </Grid>
                        :
                        null
                }

            </Grid>
        </Paper>
    );
}