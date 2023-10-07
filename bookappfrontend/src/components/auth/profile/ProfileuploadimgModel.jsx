import React from 'react'
// components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{
            m: 0, p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}
            {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: "0",
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const ProfileuploadimgModel = ({ imgUrl, showImgModel, changeProfileImg, toggelImgModel, uploadBtnLod }) => {
    return (
        <>
            <BootstrapDialog open={showImgModel} onClose={toggelImgModel}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={toggelImgModel}>
                    <Typography
                        sx={{
                            color: (theme) => theme.palette.grey[700]
                        }}>
                        Upload Profile Image
                    </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers >
                    <Box>
                        <img src={imgUrl} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={uploadBtnLod} variant='contained' onClick={changeProfileImg}>
                        Upload
                    </LoadingButton>
                </DialogActions>
            </BootstrapDialog>
        </>
    )
}

export default ProfileuploadimgModel