import React, { useState } from 'react'
// components
import { Box, Zoom } from '@mui/material'
import Postdeschead from './components/Postdeschead'
import Postdesccarousel from './components/Postdesccarousel'
import Fab from "@mui/material/Fab"
import CallIcon from '@mui/icons-material/Call';
import Contactdialog from "./components/Contactdialog.jsx"
// hooks
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Postdetails from './components/Postdetails'

const Postdescription = () => {

  const [showContactDialog, setShowContactDialog] = useState(false)
  const selectedPost = useSelector((state) => state.postDescriptionReducer)
  // const isLoading = useIsloading(selectedPost)
  // console.log(selectedPost, isLoading)

  function handelContactDialog(event) {
    event.preventDefault()
    setShowContactDialog(!showContactDialog)
  }

  return (
    <Box sx={{
      position: "relative"
    }}>
      {Object.keys(selectedPost).length === 0 ?
        <Navigate to="/" replace={true} /> :
        <>
          <Postdeschead data={selectedPost}></Postdeschead>
          <Postdesccarousel data={selectedPost} makeEditable={false} />
          <Postdetails data={selectedPost} makeEditable={false} />
          <Fab color="primary" size="medium" sx={{
            position: "fixed",
            right: "10px",
            bottom: "70px"
          }} onClick={(event) => {
            handelContactDialog(event)
          }}>
            <CallIcon />
          </Fab>
          <Contactdialog
            contactNumber={selectedPost.contacts}
            open={showContactDialog}
            handleDialog={handelContactDialog}
          />
        </>
      }
    </Box>
  )
}

export default Postdescription