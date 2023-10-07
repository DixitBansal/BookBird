import React from 'react'
// components
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'

const Contactdialog = ({ open, handleDialog, contactNumber, countryCode = "+91" }) => {

    const theme = useTheme()

    return (
        <Dialog open={open} onClose={(event) => {
            handleDialog(event)
        }}>
            <DialogTitle>Contact Information</DialogTitle>
            <DialogContent>
                <p className='font-bold'>Contact No.:</p>
                <Typography sx={{ color: theme.palette.primary.main }} onClick={(event) => {
                    window.open(`tel:${contactNumber}`)
                }}> {countryCode} {contactNumber}</Typography>
            </DialogContent>
        </Dialog>
    )
}

export default Contactdialog