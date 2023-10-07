import React from 'react'
import { Box } from "@mui/material"
import Appbar from '../components/home/Appbar/Appbar'
import { Outlet } from 'react-router-dom'

export default function Home() {

  return (
    <>
      <Appbar />
      <Box sx={{
        marginY : "3.5rem",
        width : "100%",
        height : "100%"
      }}>
        <Outlet />
      </Box>
    </>
  )
}

